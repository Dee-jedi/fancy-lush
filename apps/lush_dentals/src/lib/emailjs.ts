export interface EmailParams {
  patient_name: string;
  patient_email: string;
  treatment_type: string;
  next_due_date: string;
  clinic_name?: string;
  custom_message?: string;
  [key: string]: any;
}

export interface SendResult {
  success: boolean;
  simulated: boolean;
  message: string;
  error?: string;
}

/**
 * Sends a patient dental reminder via EmailJS REST API
 * Or simulates the send in development when keys are missing
 */
export async function sendEmailReminder(params: EmailParams): Promise<SendResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const isConfigured = serviceId && templateId && publicKey;

  // Fallback to Simulation mode if not fully configured
  if (!isConfigured) {
    console.log(
      `%c[LUSH DENTALS EMAIL AUTOMATION]%c SIMULATOR IN PROGRESS...`,
      "color: #16a07a; font-weight: bold; background: #e8f5f0; padding: 2px 5px; border-radius: 4px;",
      "color: #c9a84c; font-weight: bold;"
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(
      `%c[REMINDER EMAIL SIMULATED PAYLOAD]%c\n` +
      `-------------------------------------------------\n` +
      `To: ${params.patient_name} <${params.patient_email}>\n` +
      `Treatment Type: ${params.treatment_type}\n` +
      `Next Appointment / Due Date: ${params.next_due_date}\n` +
      `Clinic Name: ${params.clinic_name || "Lush Dentals Clinic"}\n` +
      `Custom Note: ${params.custom_message || "None"}\n` +
      `-------------------------------------------------`,
      "color: #16a07a; font-weight: bold; font-size: 11px;",
      "color: #374151; font-family: monospace;"
    );

    return {
      success: true,
      simulated: true,
      message: `Simulated reminder email successfully sent to ${params.patient_name} (${params.patient_email}).`
    };
  }

  // Live EmailJS send
  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
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
      return {
        success: true,
        simulated: false,
        message: `Reminder email successfully sent to ${params.patient_name} via EmailJS.`
      };
    } else {
      const errorText = await response.text();
      console.error("EmailJS sending error response:", errorText);
      return {
        success: false,
        simulated: false,
        message: "Failed to send reminder via EmailJS.",
        error: errorText || `HTTP error! Status: ${response.status}`
      };
    }
  } catch (error: any) {
    console.error("Error connecting to EmailJS API:", error);
    return {
      success: false,
      simulated: false,
      message: "An error occurred while connecting to EmailJS.",
      error: error.message || String(error)
    };
  }
}
