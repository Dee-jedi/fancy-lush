import { logger } from "firebase-functions/v2";
import { defineString } from "firebase-functions/params";

// Environment params — set in functions/.env file
// These are deployed alongside the function (no Secret Manager required)
export const EMAILJS_SERVICE_ID = defineString("EMAILJS_SERVICE_ID");
export const EMAILJS_TEMPLATE_ID = defineString("EMAILJS_TEMPLATE_ID");
export const EMAILJS_PUBLIC_KEY = defineString("EMAILJS_PUBLIC_KEY");
export const EMAILJS_PRIVATE_KEY = defineString("EMAILJS_PRIVATE_KEY");

export interface EmailParams {
  patient_name: string;
  patient_email: string;
  treatment_type: string;
  next_due_date: string;
  clinic_name?: string;
  custom_message?: string;
}

export interface SendResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Sends a patient dental reminder via EmailJS REST API.
 * Runs server-side in Cloud Functions with env params.
 */
export async function sendEmailReminder(params: EmailParams): Promise<SendResult> {
  const serviceId = EMAILJS_SERVICE_ID.value();
  const templateId = EMAILJS_TEMPLATE_ID.value();
  const publicKey = EMAILJS_PUBLIC_KEY.value();
  const privateKey = EMAILJS_PRIVATE_KEY.value();

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    logger.error("EmailJS env params not set. Check functions/.env file.");
    return {
      success: false,
      message: "EmailJS credentials not configured.",
      error: "MISSING_ENV_PARAMS",
    };
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          patient_name: params.patient_name,
          patient_email: params.patient_email,
          treatment_type: params.treatment_type,
          next_due_date: params.next_due_date,
          clinic_name: params.clinic_name || "Lush Dentals Clinic",
          custom_message: params.custom_message || "",
        },
      }),
    });

    if (response.ok) {
      logger.info(`✅ Email sent to ${params.patient_name} <${params.patient_email}>`);
      return {
        success: true,
        message: `Reminder email sent to ${params.patient_name} via EmailJS.`,
      };
    }

    const errorText = await response.text();
    logger.error(`EmailJS error (HTTP ${response.status}):`, errorText);
    return {
      success: false,
      message: "Failed to send reminder via EmailJS.",
      error: errorText || `HTTP ${response.status}`,
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error("EmailJS network error:", msg);
    return {
      success: false,
      message: "Network error connecting to EmailJS.",
      error: msg,
    };
  }
}
