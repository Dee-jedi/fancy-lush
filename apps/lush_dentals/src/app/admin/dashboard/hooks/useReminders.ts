import { useState, useEffect } from 'react';
import { db } from '@lush/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy,
  where,
  limit,
  getCountFromServer
} from 'firebase/firestore';
import { sendEmailReminder } from '@/lib/emailjs';

export interface Reminder {
  id: string;
  patientName: string;
  patientEmail: string;
  phoneNumber: string;
  treatmentType: string;
  dueDate: string;
  status: 'pending' | 'sent';
  customMessage?: string;
  createdAt: string;
}

export function useReminders(user: any, role: string | null) {
  const [pendingReminders, setPendingReminders] = useState<Reminder[]>([]);
  const [sentReminders, setSentReminders] = useState<Reminder[]>([]);
  const [loadingReminders, setLoadingReminders] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  
  // Toast notifications state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Function to fetch historical counts (aggregated on server to save read costs)
  const fetchCounts = async () => {
    if (!user || role !== 'admin') return;
    try {
      const collRef = collection(db, 'dentals_reminders');
      
      const totalQuery = query(collRef);
      const sentQuery = query(collRef, where('status', '==', 'sent'));
      
      const [totalSnap, sentSnap] = await Promise.all([
        getCountFromServer(totalQuery),
        getCountFromServer(sentQuery)
      ]);
      
      setTotalCount(totalSnap.data().count);
      setSentCount(sentSnap.data().count);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  // Real-time Firestore sync
  useEffect(() => {
    if (!user || role !== 'admin') return;

    // Fetch initial counts
    fetchCounts();

    const pendingQuery = query(
      collection(db, 'dentals_reminders'), 
      where('status', '==', 'pending'),
      orderBy('dueDate', 'asc')
    );

    const sentQuery = query(
      collection(db, 'dentals_reminders'), 
      where('status', '==', 'sent'),
      orderBy('dueDate', 'desc'),
      limit(50)
    );

    let loadedCount = 0;
    const checkLoading = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        setLoadingReminders(false);
      }
    };

    const unsubPending = onSnapshot(pendingQuery, (snapshot) => {
      const reminderData: Reminder[] = [];
      snapshot.forEach((doc) => {
        reminderData.push({ id: doc.id, ...doc.data() } as Reminder);
      });
      setPendingReminders(reminderData);
      checkLoading();
    }, (error) => {
      console.error("Error syncing pending reminders: ", error);
      showToast("Error loading pending reminders from database", "error");
      setLoadingReminders(false);
    });

    const unsubSent = onSnapshot(sentQuery, (snapshot) => {
      const reminderData: Reminder[] = [];
      snapshot.forEach((doc) => {
        reminderData.push({ id: doc.id, ...doc.data() } as Reminder);
      });
      setSentReminders(reminderData);
      checkLoading();
    }, (error) => {
      console.error("Error syncing sent reminders: ", error);
      showToast("Error loading sent reminders from database", "error");
      setLoadingReminders(false);
    });

    return () => {
      unsubPending();
      unsubSent();
    };
  }, [user, role]);

  // Create Reminder Action
  const addReminder = async (formData: {
    patientName: string;
    patientEmail: string;
    phoneNumber: string;
    treatmentType: string;
    customTreatment: string;
    dueDate: string;
    customMessage: string;
  }) => {
    try {
      setActionLoadingId('adding');
      const finalTreatment = formData.treatmentType === 'Custom' 
        ? formData.customTreatment || 'Special Dental Followup'
        : formData.treatmentType;

      await addDoc(collection(db, 'dentals_reminders'), {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        phoneNumber: formData.phoneNumber,
        treatmentType: finalTreatment,
        dueDate: formData.dueDate,
        status: 'pending',
        customMessage: formData.customMessage,
        createdAt: new Date().toISOString()
      });

      // Refresh aggregate counts asynchronously
      fetchCounts();

      showToast("Reminder created successfully!", "success");
      return true;
    } catch (error) {
      console.error("Error adding reminder:", error);
      showToast("Failed to create reminder.", "error");
      return false;
    } finally {
      setActionLoadingId(null);
    }
  };

  // Edit Reminder Action
  const editReminder = async (id: string, formData: {
    patientName: string;
    patientEmail: string;
    phoneNumber: string;
    treatmentType: string;
    customTreatment: string;
    dueDate: string;
    customMessage: string;
  }) => {
    try {
      setActionLoadingId('editing');
      const finalTreatment = formData.treatmentType === 'Custom' 
        ? formData.customTreatment || 'Special Dental Followup'
        : formData.treatmentType;

      const docRef = doc(db, 'dentals_reminders', id);
      await updateDoc(docRef, {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        phoneNumber: formData.phoneNumber,
        treatmentType: finalTreatment,
        dueDate: formData.dueDate,
        customMessage: formData.customMessage
      });

      showToast("Reminder updated successfully!", "success");
      return true;
    } catch (error) {
      console.error("Error updating:", error);
      showToast("Failed to update reminder", "error");
      return false;
    } finally {
      setActionLoadingId(null);
    }
  };

  // Send Email Action
  const sendReminder = async (reminder: Reminder) => {
    try {
      setActionLoadingId(reminder.id);
      
      const result = await sendEmailReminder({
        patient_name: reminder.patientName,
        patient_email: reminder.patientEmail,
        treatment_type: reminder.treatmentType,
        next_due_date: new Date(reminder.dueDate).toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        }),
        custom_message: reminder.customMessage || ""
      });

      if (result.success) {
        const docRef = doc(db, 'dentals_reminders', reminder.id);
        await updateDoc(docRef, { status: 'sent' });

        // Refresh aggregate counts asynchronously since status changed
        fetchCounts();

        if (result.simulated) {
          showToast(`[SIMULATED] Email sent to ${reminder.patientName}! (Check console)`, "info");
        } else {
          showToast(`Email successfully delivered to ${reminder.patientName}!`, "success");
        }
        return true;
      } else {
        showToast(result.message || "Failed to trigger email.", "error");
        return false;
      }
    } catch (error) {
      console.error("Error triggering reminder:", error);
      showToast("Failed to trigger email automation", "error");
      return false;
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Reminder Action
  const deleteReminder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;

    try {
      setActionLoadingId(`delete-${id}`);
      await deleteDoc(doc(db, 'dentals_reminders', id));
      
      // Refresh aggregate counts asynchronously
      fetchCounts();

      showToast("Reminder deleted cleanly.", "success");
      return true;
    } catch (error) {
      console.error("Error deleting:", error);
      showToast("Failed to delete reminder", "error");
      return false;
    } finally {
      setActionLoadingId(null);
    }
  };

  // Combine pending reminders and recent sent reminders
  const reminders = [...pendingReminders, ...sentReminders];

  // Metrics Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const metrics = {
    total: totalCount,
    pending: totalCount - sentCount,
    sent: sentCount,
    overdue: pendingReminders.filter(r => r.dueDate < todayStr).length
  };

  return {
    reminders,
    loadingReminders,
    actionLoadingId,
    toast,
    showToast,
    addReminder,
    editReminder,
    sendReminder,
    deleteReminder,
    metrics,
    todayStr
  };
}
