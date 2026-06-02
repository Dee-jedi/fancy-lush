import { onSchedule } from "firebase-functions/v2/scheduler";
import { logger } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  sendEmailReminder,
} from "./emailSender";

// Initialize Firebase Admin (uses default service account in Cloud Functions)
initializeApp();
const db = getFirestore();

/**
 * Scheduled Cloud Function — runs daily at 7:00 AM UTC.
 *
 * Logic:
 *  1. Fetch all "pending" reminders from dentals_reminders collection
 *  2. For each reminder, check if due-day or 3-day email should be sent
 *  3. Send via EmailJS and update Firestore accordingly
 *
 * Retry: enabled (Cloud Scheduler will retry on failure)
 */
export const processReminders = onSchedule(
  {
    schedule: "0 7 * * *",           // Every day at 7:00 AM UTC
    timeZone: "UTC",
    retryCount: 3,                   // Retry up to 3 times on failure
    memory: "256MiB",
    timeoutSeconds: 120,
  },
  async () => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const getOffsetDateStr = (days: number): string => {
      const d = new Date();
      d.setDate(today.getDate() + days);
      return d.toISOString().split("T")[0];
    };

    const target3Day = getOffsetDateStr(3);
    const target1Day = getOffsetDateStr(1);

    logger.info("🦷 Reminder cron started", { todayStr, target3Day, target1Day });

    // Fetch all pending reminders in one read
    const snapshot = await db
      .collection("dentals_reminders")
      .where("status", "==", "pending")
      .get();

    if (snapshot.empty) {
      logger.info("No pending reminders found. Exiting.");
      return;
    }

    logger.info(`Found ${snapshot.size} pending reminders`);

    const results = { sent: 0, failed: 0, skipped: 0 };

    // Process all reminders concurrently (bounded)
    const tasks = snapshot.docs.map(async (docSnap) => {
      const r = docSnap.data();
      const id = docSnap.id;
      const dueDate: string = r.dueDate;

      // Determine which email(s) to send
      const isDueDayDue = !r.sentDueDayReminder && dueDate <= todayStr;
      const is3DayDue = !r.sent3DayReminder && dueDate <= target3Day && dueDate > target1Day;

      if (!isDueDayDue && !is3DayDue) {
        results.skipped++;
        return;
      }

      const formattedDate = formatDate(dueDate);
      const reminderType = isDueDayDue ? "due-day" : "3-day";

      const customMessage = isDueDayDue
        ? r.customMessage || ""
        : r.customMessage || `Friendly reminder: Your ${r.treatmentType} appointment is coming up in 3 days!`;

      logger.info(`Sending ${reminderType} reminder`, {
        id,
        patient: r.patientName,
        dueDate,
      });

      const result = await sendEmailReminder({
        patient_name: r.patientName,
        patient_email: r.patientEmail,
        treatment_type: r.treatmentType,
        next_due_date: formattedDate,
        custom_message: customMessage,
      });

      if (result.success) {
        // Update Firestore based on reminder type
        const update: Record<string, unknown> = isDueDayDue
          ? { status: "sent", sent3DayReminder: true, sentDueDayReminder: true }
          : { sent3DayReminder: true };

        await db.collection("dentals_reminders").doc(id).update(update);

        results.sent++;
        logger.info(`✅ ${reminderType} reminder sent for ${r.patientName}`);
      } else {
        results.failed++;
        logger.error(`❌ Failed ${reminderType} for ${r.patientName}:`, result.error);
      }
    });

    // Wait for all emails to finish (processes in parallel for speed)
    await Promise.all(tasks);

    logger.info("🦷 Reminder cron completed", results);

    // If any failures occurred, throw so Cloud Scheduler retries
    if (results.failed > 0 && results.sent === 0) {
      throw new Error(
        `All ${results.failed} reminder(s) failed. Triggering retry.`
      );
    }
  }
);

/** Format a YYYY-MM-DD string into a human-readable date */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
