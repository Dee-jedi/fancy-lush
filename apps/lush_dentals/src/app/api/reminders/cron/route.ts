import { NextResponse } from 'next/server';
import { db } from '@lush/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { sendEmailReminder } from '@/lib/emailjs';

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
    // 2. Calculate target date (3 days from today)
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    const targetDateStr = threeDaysFromNow.toISOString().split('T')[0];
    
    console.log(`[CRON AUTOMATION] Running reminder checks. Current Date: ${today.toISOString().split('T')[0]}. Target Due Date: <= ${targetDateStr}`);

    // 3. Query Firestore for 'pending' reminders due on or before 3 days from now
    const remindersRef = collection(db, 'dentals_reminders');
    const q = query(
      remindersRef, 
      where('status', '==', 'pending'),
      where('dueDate', '<=', targetDateStr)
    );

    const querySnapshot = await getDocs(q);
    const remindersToProcess: any[] = [];
    
    querySnapshot.forEach((doc) => {
      remindersToProcess.push({ id: doc.id, ...doc.data() });
    });

    console.log(`[CRON AUTOMATION] Found ${remindersToProcess.length} pending reminders to process.`);

    if (remindersToProcess.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No pending reminders due within 3 days.', 
        processed: 0 
      });
    }

    const results = {
      total: remindersToProcess.length,
      successCount: 0,
      failedCount: 0,
      details: [] as any[]
    };

    // 4. Dispatch Email Loop (processes sequentially in serverless context)
    for (const reminder of remindersToProcess) {
      try {
        const formattedDate = new Date(reminder.dueDate).toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        // Trigger EmailJS dispatch (runs live or simulation fallback)
        const sendResult = await sendEmailReminder({
          patient_name: reminder.patientName,
          patient_email: reminder.patientEmail,
          treatment_type: reminder.treatmentType,
          next_due_date: formattedDate,
          custom_message: reminder.customMessage || ""
        });

        if (sendResult.success) {
          // Update status in Firestore
          const docRef = doc(db, 'dentals_reminders', reminder.id);
          await updateDoc(docRef, { status: 'sent' });

          results.successCount++;
          results.details.push({
            id: reminder.id,
            patientName: reminder.patientName,
            status: 'sent',
            simulated: sendResult.simulated
          });
        } else {
          results.failedCount++;
          results.details.push({
            id: reminder.id,
            patientName: reminder.patientName,
            status: 'failed',
            error: sendResult.error || sendResult.message
          });
        }
      } catch (err: any) {
        results.failedCount++;
        results.details.push({
          id: reminder.id,
          patientName: reminder.patientName,
          status: 'error',
          error: err.message || String(err)
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.total} reminders. ${results.successCount} sent, ${results.failedCount} failed.`,
      metrics: {
        total: results.total,
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
