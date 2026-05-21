"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';
import { useReminders, Reminder } from './hooks/useReminders';
import { MetricsBar } from './components/MetricsBar';
import { RemindersList } from './components/RemindersList';
import { ReminderModal } from './components/ReminderModal';

export default function DashboardPage() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();

  // Custom hook containing all database state sync, actions and calculations
  const {
    reminders,
    loadingReminders,
    actionLoadingId,
    toast,
    addReminder,
    editReminder,
    sendReminder,
    deleteReminder,
    metrics,
    todayStr
  } = useReminders(user, role);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'sent'>('all');
  const [treatmentFilter, setTreatmentFilter] = useState('all');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);

  // Access Shield: Redirect if not admin
  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        router.push('/');
      }
    }
  }, [user, role, loading, router]);

  // Handle Form Submit (Handles both Adding and Editing)
  const handleModalSubmit = async (formData: any): Promise<boolean> => {
    if (selectedReminder) {
      return await editReminder(selectedReminder.id, formData);
    } else {
      return await addReminder(formData);
    }
  };

  const openEditModal = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedReminder(null);
    setIsModalOpen(true);
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
      {/* Floating Alert/Toast notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-12 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-3xl shadow-xl backdrop-blur-2xl border text-xs tracking-wider uppercase font-bold flex items-center gap-3 ${
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

      <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-10 space-y-12">
        
        {/* Title bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1 flex flex-col items-start">
            <span className="text-emerald-950/40 text-[10px] tracking-[0.35em] font-black uppercase block">
              Admin Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--primary)] leading-none">
              Dental <span className="font-light italic text-[var(--secondary)]">Reminders</span>
            </h1>
            <svg className="w-32 h-2.5 text-[var(--secondary)] mt-3.5" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
              <path d="M0,5 Q25,1 50,5 T100,5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Desktop Schedule Button (Hidden on Mobile) */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openAddModal}
              className="hidden md:flex bg-[var(--primary)] text-white px-6 py-4 rounded-2xl text-[10px] tracking-[0.2em] font-bold uppercase hover:bg-emerald-800 shadow-md transition-all items-center gap-3 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              SCHEDULE PATIENT
            </motion.button>
          </div>
        </div>

        {/* Mobile Floating Action Button (FAB) - Fixed at bottom right */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openAddModal}
          className="md:hidden fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-lg shadow-emerald-950/20 cursor-pointer focus:outline-none border border-white/10"
          title="Schedule Patient"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>

        {/* Metrics Grid */}
        <MetricsBar metrics={metrics} />

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

          {/* Reminders List (Handles mobile responsive cards automatically!) */}
          <RemindersList 
            reminders={filteredReminders}
            loadingReminders={loadingReminders}
            actionLoadingId={actionLoadingId}
            todayStr={todayStr}
            onSend={sendReminder}
            onEdit={openEditModal}
            onDelete={deleteReminder}
          />

        </div>
      </div>

      {/* Unified Add/Edit Reminder Modal */}
      <ReminderModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReminder(null);
        }}
        onSubmit={handleModalSubmit}
        reminder={selectedReminder}
        actionLoading={actionLoadingId === 'adding' || actionLoadingId === 'editing'}
      />
    </main>
  );
}
