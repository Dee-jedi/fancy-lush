import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reminder } from '../hooks/useReminders';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<boolean>;
  reminder: Reminder | null;
  actionLoading: boolean;
}

export const ReminderModal = ({
  isOpen,
  onClose,
  onSubmit,
  reminder,
  actionLoading
}: ReminderModalProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    phoneNumber: '',
    treatmentType: 'Braces Checkup',
    customTreatment: '',
    dueDate: '',
    customMessage: ''
  });

  // Sync state if editing a reminder
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (reminder) {
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
    } else {
      // Default values for Adding (Prefill due date with today's date)
      setFormData({
        patientName: '',
        patientEmail: '',
        phoneNumber: '',
        treatmentType: 'Braces Checkup',
        customTreatment: '',
        dueDate: todayStr,
        customMessage: ''
      });
    }
  }, [reminder, isOpen]);

  const setPresetDate = (daysAhead: number) => {
    const today = new Date();
    today.setDate(today.getDate() + daysAhead);
    const dateString = today.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, dueDate: dateString }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientEmail || !formData.dueDate) {
      alert("Please fill in Name, Email and Due Date.");
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/20 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-xl rounded-[40px] border border-emerald-900/5 p-6 md:p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-[var(--primary)]">
                {reminder ? 'Edit Scheduled Reminder' : 'Schedule Patient Reminder'}
              </h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-emerald-950/5 flex items-center justify-center text-emerald-950/40 cursor-pointer focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
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
                  <div className="relative">
                    <select
                      value={formData.treatmentType}
                      onChange={(e) => setFormData(prev => ({ ...prev, treatmentType: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl pl-5 pr-12 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold text-emerald-950/80 appearance-none cursor-pointer"
                    >
                      <option value="Braces Checkup">Braces Checkup</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Routine Hygiene & Clean">Routine Hygiene & Clean</option>
                      <option value="Root Canal Followup">Root Canal Followup</option>
                      <option value="Custom">Custom / Special treatment</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-950/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-emerald-950/50 block">Appointment Due Date *</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full bg-emerald-950/5 rounded-2xl pl-5 pr-12 py-4 text-sm focus:outline-none focus:bg-emerald-950/10 transition-all font-semibold text-emerald-950/80 appearance-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-950/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                  </div>
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
                    placeholder="e.g. Tooth Extraction Follow-up"
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
                  onClick={onClose}
                  className="px-5 py-3.5 rounded-2xl text-[10px] tracking-wider uppercase font-bold text-emerald-950/40 hover:bg-emerald-950/5 transition-all focus:outline-none cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-[var(--primary)] text-white px-6 py-3.5 rounded-2xl text-[10px] tracking-wider uppercase font-bold hover:bg-emerald-800 hover:shadow-md active:scale-[0.98] transition-all shadow-sm focus:outline-none cursor-pointer min-w-[150px]"
                >
                  {actionLoading ? (
                    <div className="flex items-center justify-center gap-1.5 mx-auto">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{reminder ? 'SAVING...' : 'CREATING...'}</span>
                    </div>
                  ) : reminder ? (
                    'SAVE CHANGES'
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
  );
};
