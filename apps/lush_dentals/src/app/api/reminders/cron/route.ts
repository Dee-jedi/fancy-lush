import { NextResponse } from 'next/server';
import { db } from '@lush/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { sendEmailReminder } from '@/lib/emailjs';

export const dynamic = 'force-dynamic';

// SECURE CRON ENDPOINT
export async function GET(request: Request) {
  // 1. Verify Authorization Header
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  const isDev = process.env.NODE_ENV === 'development';
  const expectedAuth = `Bearer ${cronSecret}`;

  // Allow trigger without authorization ONLY in local development for testing
  if (!isDev && cronSecret && authHeader !== expectedAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Helper to calculate date string offset from today
    const getOffsetDateStr = (daysOffset: number): string => {
      const d = new Date();
      d.setDate(today.getDate() + daysOffset);
      return d.toISOString().split('T')[0];
    };

    const targetDate3DaysStr = getOffsetDateStr(3);
    const targetDate1DayStr = getOffsetDateStr(1);

    console.log(`[CRON AUTOMATION] Starting multi-stage reminder run.`);
    console.log(`- Current Date (Today): ${todayStr}`);
    console.log(`- 3-Day Reminder Range: > ${targetDate1DayStr} and <= ${targetDate3DaysStr}`);
    console.log(`- Due-Day / Overdue Threshold: <= ${todayStr}`);

    // Fetch all pending reminders
    const remindersRef = collection(db, 'dentals_reminders');
    const pendingQuery = query(remindersRef, where('status', '==', 'pending'));
    const querySnapshot = await getDocs(pendingQuery);
    
    const allPending: any[] = [];
    querySnapshot.forEach((doc) => {
      allPending.push({ id: doc.id, ...doc.data() });
    });

    console.log(`[CRON AUTOMATION] Fetched ${allPending.length} pending records from database.`);

    const toProcess3Day: any[] = [];
    const toProcessDueDay: any[] = [];

    // Filter reminders in-memory to ensure backward compatibility for records missing flags
    for (const r of allPending) {
      const is3DayDue = !r.sent3DayReminder && (r.dueDate <= targetDate3DaysStr && r.dueDate > targetDate1DayStr);
      const isDueDayDue = !r.sentDueDayReminder && (r.dueDate <= todayStr);

      if (isDueDayDue) {
        toProcessDueDay.push(r);
      } else if (is3DayDue) {
        toProcess3Day.push(r);
      }
    }

    console.log(`[CRON AUTOMATION] Queue: ${toProcess3Day.length} pending 3-day reminders, ${toProcessDueDay.length} pending due-day reminders.`);

    const results = {
      totalProcessed: 0,
      successCount: 0,
      failedCount: 0,
      details: [] as any[]
    };

    // 1. Process Due-Day / Overdue Reminders
    for (const reminder of toProcessDueDay) {
      try {
        const formattedDate = new Date(reminder.dueDate).toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        console.log(`[CRON AUTOMATION] Dispatching Due-Day reminder for ${reminder.patientName} (Due: ${reminder.dueDate})`);
        
        const sendResult = await sendEmailReminder({
          patient_name: reminder.patientName,
          patient_email: reminder.patientEmail,
          treatment_type: reminder.treatmentType,
          next_due_date: formattedDate,
          custom_message: reminder.customMessage || ""
        });

        if (sendResult.success) {
          const docRef = doc(db, 'dentals_reminders', reminder.id);
          // Mark both sent3DayReminder & sentDueDayReminder as true since they are now fully processed
          await updateDoc(docRef, { 
            status: 'sent',
            sent3DayReminder: true,
            sentDueDayReminder: true
          });

          results.successCount++;
          results.details.push({
            id: reminder.id,
            patientName: reminder.patientName,
            type: 'due-day',
            status: 'sent',
            simulated: sendResult.simulated
          });
        } else {
          results.failedCount++;
          results.details.push({
            id: reminder.id,
            patientName: reminder.patientName,
            type: 'due-day',
            status: 'failed',
            error: sendResult.error || sendResult.message
          });
        }
      } catch (err: any) {
        results.failedCount++;
        results.details.push({
          id: reminder.id,
          patientName: reminder.patientName,
          type: 'due-day',
          status: 'error',
          error: err.message || String(err)
        });
      }
      results.totalProcessed++;
    }

    // 2. Process 3-Day Reminders
    for (const reminder of toProcess3Day) {
      try {
        const formattedDate = new Date(reminder.dueDate).toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        console.log(`[CRON AUTOMATION] Dispatching 3-Day reminder for ${reminder.patientName} (Due: ${reminder.dueDate})`);

        const sendResult = await sendEmailReminder({
          patient_name: reminder.patientName,
          patient_email: reminder.patientEmail,
          treatment_type: reminder.treatmentType,
          next_due_date: formattedDate,
          custom_message: reminder.customMessage || `Friendly reminder: Your ${reminder.treatmentType} appointment is coming up in 3 days!`
        });

        if (sendResult.success) {
          const docRef = doc(db, 'dentals_reminders', reminder.id);
          // Mark sent3DayReminder as true, status remains pending
          await updateDoc(docRef, { 
            sent3DayReminder: true
          });

          results.successCount++;
          results.details.push({
            id: reminder.id,
            patientName: reminder.patientName,
            type: '3-day',
            status: 'sent',
            simulated: sendResult.simulated
          });
        } else {
          results.failedCount++;
          results.details.push({
            id: reminder.id,
            patientName: reminder.patientName,
            type: '3-day',
            status: 'failed',
            error: sendResult.error || sendResult.message
          });
        }
      } catch (err: any) {
        results.failedCount++;
        results.details.push({
          id: reminder.id,
          patientName: reminder.patientName,
          type: '3-day',
          status: 'error',
          error: err.message || String(err)
        });
      }
      results.totalProcessed++;
    }

    console.log(`[CRON AUTOMATION] Completed run. Processed: ${results.totalProcessed}, Sent: ${results.successCount}, Failed: ${results.failedCount}`);

    return NextResponse.json({
      success: true,
      message: `Processed ${results.totalProcessed} reminders. ${results.successCount} sent successfully.`,
      metrics: {
        total: results.totalProcessed,
        sent: results.successCount,
        failed: results.failedCount
      },
      results: results.details
    });

  } catch (error: any) {
    console.error('[CRON AUTOMATION ERROR]:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal Server Error', 
      message: error.message || String(error) 
    }, { status: 500 });
  }
}

