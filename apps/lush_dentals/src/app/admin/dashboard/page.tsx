"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { db } from '@lush/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { sendEmailReminder } from '@/lib/emailjs';

interface Reminder {
  id: string;
  patientName: string;
  patientEmail: string;
  phoneNumber: string;
  treatmentType: string;
  customTreatment?: string;
  dueDate: string;
  status: 'pending' | 'sent';
  customMessage?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loadingReminders, setLoadingReminders] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'sent'>('all');
  const [treatmentFilter, setTreatmentFilter] = useState('all');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  // Loader state for actions
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  
  // Toast notifications state
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Form States
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    phoneNumber: '',
    treatmentType: 'Braces Checkup',
    customTreatment: '',
    dueDate: '',
    customMessage: ''
  });

  // Access Shield: Redirect if not admin
  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        router.push('/');
      }
    }
  }, [user, role, loading, router]);

  // Real-time Firestore sync
  useEffect(() => {
    if (!user || role !== 'admin') return;

    const remindersQuery = query(
      collection(db, 'dentals_reminders'), 
      orderBy('dueDate', 'asc')
    );

    const unsubscribe = onSnapshot(remindersQuery, (snapshot) => {
      const reminderData: Reminder[] = [];
      snapshot.forEach((doc) => {
        reminderData.push({ id: doc.id, ...doc.data() } as Reminder);
      });
      setReminders(reminderData);
      setLoadingReminders(false);
    }, (error) => {
      console.error("Error syncing reminders: ", error);
      showToast("Error loading reminders from database", "error");
      setLoadingReminders(false);
    });

    return () => unsubscribe();
  }, [user, role]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Preset Date Setter helper
  const setPresetDate = (daysAhead: number) => {
    const today = new Date();
    today.setDate(today.getDate() + daysAhead);
    const dateString = today.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, dueDate: dateString }));
  };

  // Add Reminder Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientEmail || !formData.dueDate) {
      showToast("Please fill in Name, Email and Due Date.", "error");
      return;
    }

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

      showToast("Reminder created successfully!", "success");
      setIsAddModalOpen(false);
      // Reset form
      setFormData({
        patientName: '',
        patientEmail: '',
        phoneNumber: '',
        treatmentType: 'Braces Checkup',
        customTreatment: '',
        dueDate: '',
        customMessage: ''
      });
    } catch (error) {
      console.error("Error adding reminder:", error);
      showToast("Failed to create reminder.", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Send Email Automation Handler
  const handleSendReminder = async (reminder: Reminder) => {
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
        // Update status in Firestore
        const docRef = doc(db, 'dentals_reminders', reminder.id);
        await updateDoc(docRef, { status: 'sent' });

        if (result.simulated) {
          showToast(`[SIMULATED] Email sent successfully to ${reminder.patientName}! (Check browser dev console)`, "info");
        } else {
          showToast(`Email successfully delivered to ${reminder.patientName}!`, "success");
        }
      } else {
        showToast(result.message || "Failed to trigger email.", "error");
      }
    } catch (error) {
      console.error("Error trigger reminder:", error);
      showToast("Failed to trigger email automation", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Reminder Handler
  const handleDeleteReminder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reminder?")) return;

    try {
      setActionLoadingId(`delete-${id}`);
      await deleteDoc(doc(db, 'dentals_reminders', id));
      showToast("Reminder deleted cleanly.", "success");
    } catch (error) {
      console.error("Error deleting:", error);
      showToast("Failed to delete reminder", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Open Edit Modal Helper
  const openEditModal = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setFormData({
      patientName: reminder.patientName,
      patientEmail: reminder.patientEmail,
      phoneNumber: reminder.phoneNumber || '',
      treatmentType: ['Braces Checkup', 'Teeth Whitening', 'Routine Hygiene & Clean', 'Root Canal Followup'].includes(reminder.treatmentType) 
        ? reminder.treatmentType 
        : 'Custom',
      customTreatment: ['Braces Checkup', 'Teeth Whitening', 'Routine Hygiene & Clean', 'Root Canal Followup'].includes(reminder.treatmentType) 
        ? '' 
        : reminder.treatmentType,
      dueDate: reminder.dueDate,
      customMessage: reminder.customMessage || ''
    });
    setIsEditModalOpen(true);
  };

  // Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReminder) return;

    try {
      setActionLoadingId('editing');
      const finalTreatment = formData.treatmentType === 'Custom' 
        ? formData.customTreatment || 'Special Dental Followup'
        : formData.treatmentType;

      const docRef = doc(db, 'dentals_reminders', selectedReminder.id);
      await updateDoc(docRef, {
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        phoneNumber: formData.phoneNumber,
        treatmentType: finalTreatment,
        dueDate: formData.dueDate,
        customMessage: formData.customMessage
      });

      showToast("Reminder updated successfully!", "success");
      setIsEditModalOpen(false);
      setSelectedReminder(null);
    } catch (error) {
      console.error("Error updating:", error);
      showToast("Failed to update reminder", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filter Logic
  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = 
      reminder.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (reminder.phoneNumber && reminder.phoneNumber.includes(searchQuery)) ||
      reminder.treatmentType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
    
    let matchesTreatment = true;
    if (treatmentFilter !== 'all') {
      matchesTreatment = reminder.treatmentType.toLowerCase().includes(treatmentFilter.toLowerCase());
    }

    return matchesSearch && matchesStatus && matchesTreatment;
  });

  // Calculate Metrics
  const todayStr = new Date().toISOString().split('T')[0];
  const totalCount = reminders.length;
  const pendingCount = reminders.filter(r => r.status === 'pending').length;
  const sentCount = reminders.filter(r => r.status === 'sent').length;
  const overdueCount = reminders.filter(r => r.status === 'pending' && r.dueDate < todayStr).length;

  if (loading || !user || role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f1f8f6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-emerald-950/40 font-serif tracking-widest text-xs uppercase font-medium">Securing Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f8f6] text-[#1a2e2a] font-sans pb-24 selection:bg-emerald-200">
      <Header />

      {/* Floating Alert/Toast notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-28 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-3xl shadow-xl backdrop-blur-2xl border text-xs tracking-wider uppercase font-bold flex items-center gap-3 ${
              toast.type === 'success' 
                ? 'bg-emerald-900/90 text-emerald-100 border-emerald-700/30' 
                : toast.type === 'error' 
                ? 'bg-rose-900/90 text-rose-100 border-rose-700/30' 
                : 'bg-amber-950/90 text-amber-100 border-amber-700/30'
            }`}
          >
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              toast.type === 'success' ? 'bg-emerald-400' : toast.type === 'error' ? 'bg-rose-400' : 'bg-amber-400'
            }`} />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 pt-36 space-y-16">
        
        {/* Title bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="text-[var(--secondary)] text-[10px] tracking-[0.4em] font-black uppercase block">
              Automated Operations Center
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--primary)] leading-none">
              Dental <span className="font-light italic text-[var(--secondary)]">Reminders</span>
            </h1>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[var(--primary)] text-white px-6 py-4 rounded-2xl text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-emerald-800 shadow-md transition-all flex items-center gap-3 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            SCHEDULE PATIENT
          </motion.button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Total Scheduled', value: totalCount, color: 'border-emerald-600/10' },
            { label: 'Pending Reminders', value: pendingCount, color: 'border-amber-600/10' },
            { label: 'Sent / Completed', value: sentCount, color: 'border-blue-600/10' },
            { label: 'Overdue Patients', value: overdueCount, color: 'border-rose-600/10', textCls: overdueCount > 0 ? 'text-rose-600 font-bold' : '' }
          ].map((card, idx) => (
            <motion.div 
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white/60 backdrop-blur-md p-6 rounded-[32px] border ${card.color} shadow-sm flex flex-col justify-between h-36`}
            >
              <span className="text-[9px] tracking-widest font-black uppercase text-emerald-900/40">
                {card.label}
              </span>
              <span className={`text-4xl font-serif text-[var(--primary)] ${card.textCls || ''}`}>
                {card.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Content Panel */}
        <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-emerald-900/5 p-6 md:p-8 shadow-sm space-y-8">
          
          {/* Controls: Search, filter, status toggles */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="Search patient, email, treatment..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/75 border border-emerald-900/5 rounded-2xl px-6 py-4 pl-12 text-sm focus:outline-none focus:border-emerald-600/30 transition-all font-medium"
              />
              <svg 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/30" 
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {/* Filter Group */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Treatment Filter */}
              <select 
                value={treatmentFilter}
                onChange={(e) => setTreatmentFilter(e.target.value)}
                className="bg-white/75 border border-emerald-900/5 rounded-2xl px-4 py-3.5 text-xs tracking-wider uppercase font-bold focus:outline-none focus:border-emerald-600/30 text-emerald-900/70"
              >
                <option value="all">ALL TREATMENTS</option>
                <option value="braces">BRACES</option>
                <option value="whitening">WHITENING</option>
                <option value="hygiene">HYGIENE & CLEAN</option>
                <option value="canal">ROOT CANAL</option>
              </select>

              {/* Status Toggles */}
              <div className="bg-white/75 border border-emerald-900/5 rounded-2xl p-1 flex gap-1">
                {(['all', 'pending', 'sent'] as const).map((stat) => (
                  <button
                    key={stat}
                    onClick={() => setStatusFilter(stat)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] tracking-wider uppercase font-bold transition-all focus:outline-none cursor-pointer ${
                      statusFilter === stat 
                        ? 'bg-[var(--primary)] text-white shadow-sm' 
                        : 'text-emerald-900/50 hover:text-emerald-900'
                    }`}
                  >
                    {stat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reminders Table */}
          <div className="overflow-x-auto -mx-6 md:-mx-8">
            <div className="inline-block min-w-full align-middle px-6 md:px-8">
              <table className="min-w-full divide-y divide-emerald-900/5">
                <thead>
                  <tr className="text-left text-[9px] tracking-widest uppercase font-black text-emerald-900/40">
                    <th scope="col" className="py-4 font-black">Patient Details</th>
                    <th scope="col" className="py-4 font-black">Treatment</th>
                    <th scope="col" className="py-4 font-black">Schedule / Next Due</th>
                    <th scope="col" className="py-4 font-black">Status</th>
                    <th scope="col" className="py-4 text-right font-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/5 text-sm">
                  {loadingReminders ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-emerald-950/40 font-medium">
                        Syncing database...
                      </td>
                    </tr>
                  ) : filteredReminders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-emerald-950/40 font-medium">
                        No scheduled reminders found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredReminders.map((reminder) => {
                      const isOverdue = reminder.status === 'pending' && reminder.dueDate < todayStr;
                      const formattedDate = new Date(reminder.dueDate).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      });

                      return (
                        <tr key={reminder.id} className="group hover:bg-white/30 transition-colors rounded-2xl">
                          {/* Name & Email */}
                          <td className="py-5 pr-4">
                            <div className="flex flex-col">
                              <span className="font-serif font-bold text-base text-[var(--primary)]">{reminder.patientName}</span>
                              <span className="text-[11px] text-emerald-950/40">{reminder.patientEmail}</span>
                              {reminder.phoneNumber && (
                                <span className="text-[10px] text-emerald-950/30 font-medium mt-0.5">{reminder.phoneNumber}</span>
                              )}
                            </div>
                          </td>

                          {/* Treatment */}
                          <td className="py-5 pr-4">
                            <span className="bg-emerald-950/5 text-[var(--primary)] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              {reminder.treatmentType}
                            </span>
                          </td>

                          {/* Due date */}
                          <td className="py-5 pr-4">
                            <div className="flex flex-col">
                              <span className={`font-semibold ${isOverdue ? 'text-rose-600 font-bold' : ''}`}>
                                {formattedDate}
                              </span>
                              {isOverdue && (
                                <span className="text-[9px] tracking-wide uppercase font-bold text-rose-500 mt-0.5">
                                  OVERDUE
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-5 pr-4">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                              reminder.status === 'sent' ? 'bg-emerald-500' : 'bg-amber-400'
                            }`} title={reminder.status === 'sent' ? 'Sent' : 'Pending'} />
                            <span className="text-[10px] tracking-widest font-black uppercase text-emerald-900/40 ml-2">
                              {reminder.status}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-5 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleSendReminder(reminder)}
                              disabled={actionLoadingId === reminder.id}
                              className={`px-4 py-2.5 rounded-xl text-[9px] tracking-widest font-black uppercase transition-all focus:outline-none cursor-pointer ${
                                reminder.status === 'sent'
                                  ? 'bg-emerald-950/5 text-[var(--primary)] hover:bg-emerald-950/10'
                                  : 'bg-[var(--secondary)] text-[var(--primary)] hover:bg-[#b0913c] shadow-sm'
                              }`}
                            >
                              {actionLoadingId === reminder.id ? (
                                <div className="w-3.5 h-3.5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : reminder.status === 'sent' ? (
                                'RESEND'
                              ) : (
                                'SEND REMINDER'
                              )}
                            </button>

                            <button
                              onClick={() => openEditModal(reminder)}
                              className="p-2.5 rounded-xl bg-white/70 text-emerald-900/50 hover:text-[var(--primary)] hover:bg-white transition-all cursor-pointer inline-flex items-center justify-center focus:outline-none"
                              title="Edit schedule"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>

                            <button
                              onClick={() => handleDeleteReminder(reminder.id)}
                              disabled={actionLoadingId === `delete-${reminder.id}`}
                              className="p-2.5 rounded-xl bg-white/70 text-rose-500/50 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer inline-flex items-center justify-center focus:outline-none"
                              title="Delete record"
                            >
                              {actionLoadingId === `delete-${reminder.id}` ? (
                                <div className="w-3 h-3 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-emerald-950/20 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[40px] border border-emerald-900/5 p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-[var(--primary)]">Schedule Patient Reminder</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-10 h-10 rounded-full hover:bg-emerald-950/5 flex items-center justify-center text-emerald-950/40 cursor-pointer focus:outline-none"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Patient Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={formData.patientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Patient Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. email@example.com"
                      value={formData.patientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. +234 810 123 4567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Treatment Plan</label>
                    <select
                      value={formData.treatmentType}
                      onChange={(e) => setFormData(prev => ({ ...prev, treatmentType: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold text-emerald-950/80"
                    >
                      <option value="Braces Checkup">Braces Checkup</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Routine Hygiene & Clean">Routine Hygiene & Clean</option>
                      <option value="Root Canal Followup">Root Canal Followup</option>
                      <option value="Custom">Custom / Special treatment</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Appointment Due Date *</label>
                    <input 
                      type="date" 
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold text-emerald-950/80"
                    />
                  </div>
                </div>

                {/* Custom Treatment input if 'Custom' is selected */}
                {formData.treatmentType === 'Custom' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Custom Treatment Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Tooth Extraction Follow-up"
                      value={formData.customTreatment}
                      onChange={(e) => setFormData(prev => ({ ...prev, customTreatment: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                    />
                  </motion.div>
                )}

                {/* Intelligent presets for dates */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Calculate Due Date Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '+1 Week', days: 7 },
                      { label: '+3 Weeks (Braces)', days: 21 },
                      { label: '+6 Months (Hygiene)', days: 180 },
                      { label: '+1 Year', days: 365 }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setPresetDate(preset.days)}
                        className="bg-emerald-950/5 text-emerald-900/60 hover:bg-emerald-950/10 hover:text-emerald-900 px-3.5 py-2.5 rounded-xl text-[10px] tracking-wider uppercase font-bold transition-all focus:outline-none cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Custom Note in Email (Optional)</label>
                  <textarea 
                    placeholder="This message will be appended to the reminder email."
                    value={formData.customMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
                    rows={3}
                    className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-emerald-950/5">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-3.5 rounded-2xl text-[10px] tracking-wider uppercase font-bold text-emerald-950/40 hover:bg-emerald-950/5 transition-all focus:outline-none cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoadingId === 'adding'}
                    className="bg-[var(--primary)] text-white px-6 py-3.5 rounded-2xl text-[10px] tracking-wider uppercase font-bold hover:bg-emerald-800 transition-all shadow-sm focus:outline-none cursor-pointer min-w-[120px]"
                  >
                    {actionLoadingId === 'adding' ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      'CREATE REMINDER'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Reminder Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedReminder && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedReminder(null);
              }}
              className="absolute inset-0 bg-emerald-950/20 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[40px] border border-emerald-900/5 p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-[var(--primary)]">Edit Scheduled Reminder</h3>
                <button 
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedReminder(null);
                  }}
                  className="w-10 h-10 rounded-full hover:bg-emerald-950/5 flex items-center justify-center text-emerald-950/40 cursor-pointer focus:outline-none"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Patient Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.patientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Patient Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.patientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, patientEmail: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Treatment Plan</label>
                    <select
                      value={formData.treatmentType}
                      onChange={(e) => setFormData(prev => ({ ...prev, treatmentType: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold text-emerald-950/80"
                    >
                      <option value="Braces Checkup">Braces Checkup</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Routine Hygiene & Clean">Routine Hygiene & Clean</option>
                      <option value="Root Canal Followup">Root Canal Followup</option>
                      <option value="Custom">Custom / Special treatment</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Appointment Due Date *</label>
                    <input 
                      type="date" 
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold text-emerald-950/80"
                    />
                  </div>
                </div>

                {formData.treatmentType === 'Custom' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Custom Treatment Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.customTreatment}
                      onChange={(e) => setFormData(prev => ({ ...prev, customTreatment: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold"
                    />
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Calculate Due Date Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '+1 Week', days: 7 },
                      { label: '+3 Weeks (Braces)', days: 21 },
                      { label: '+6 Months (Hygiene)', days: 180 },
                      { label: '+1 Year', days: 365 }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setPresetDate(preset.days)}
                        className="bg-emerald-950/5 text-emerald-900/60 hover:bg-emerald-950/10 hover:text-emerald-900 px-3.5 py-2.5 rounded-xl text-[10px] tracking-wider uppercase font-bold transition-all focus:outline-none cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Custom Note in Email (Optional)</label>
                  <textarea 
                    value={formData.customMessage}
                    onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
                    rows={3}
                    className="w-full bg-emerald-950/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-emerald-950/5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedReminder(null);
                    }}
                    className="px-5 py-3.5 rounded-2xl text-[10px] tracking-wider uppercase font-bold text-emerald-950/40 hover:bg-emerald-950/5 transition-all focus:outline-none cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoadingId === 'editing'}
                    className="bg-[var(--primary)] text-white px-6 py-3.5 rounded-2xl text-[10px] tracking-wider uppercase font-bold hover:bg-emerald-800 transition-all shadow-sm focus:outline-none cursor-pointer min-w-[120px]"
                  >
                    {actionLoadingId === 'editing' ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      'SAVE CHANGES'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
