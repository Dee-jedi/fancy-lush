import React from 'react';
import { Reminder } from '../hooks/useReminders';

interface RemindersListProps {
  reminders: Reminder[];
  loadingReminders: boolean;
  actionLoadingId: string | null;
  todayStr: string;
  onSend: (reminder: Reminder) => void;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

export const RemindersList = ({
  reminders,
  loadingReminders,
  actionLoadingId,
  todayStr,
  onSend,
  onEdit,
  onDelete
}: RemindersListProps) => {

  if (loadingReminders) {
    return (
      <div className="py-12 text-center text-emerald-950/40 font-medium">
        Syncing database...
      </div>
    );
  }

  if (reminders.length === 0) {
    return (
      <div className="py-12 text-center text-emerald-950/40 font-medium">
        No scheduled reminders found matching criteria.
      </div>
    );
  }

  return (
    <div>
      {/* 1. Desktop & Tablet View (Hidden on mobile screens) */}
      <div className="hidden lg:block overflow-x-auto -mx-6 md:-mx-8">
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
              {reminders.map((reminder) => {
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
                    <td className="py-5 pr-4 text-[10px]">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                            reminder.status === 'sent' ? 'bg-emerald-500' : 'bg-amber-400'
                          }`} title={reminder.status === 'sent' ? 'Sent' : 'Pending'} />
                          <span className="text-[10px] tracking-widest font-black uppercase text-emerald-900/40 ml-2">
                            {reminder.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 mt-2 pl-4.5">
                          <div className="flex items-center text-[9px] text-emerald-950/45 font-bold uppercase tracking-wider">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                              reminder.sent3DayReminder ? 'bg-emerald-500' : 'bg-amber-300'
                            }`} />
                            3d email
                          </div>
                          <div className="flex items-center text-[9px] text-emerald-950/45 font-bold uppercase tracking-wider">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                              reminder.sentDueDayReminder ? 'bg-emerald-500' : 'bg-amber-300'
                            }`} />
                            due email
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-5 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => onSend(reminder)}
                        disabled={actionLoadingId === reminder.id}
                        className={`px-4 py-2.5 rounded-xl text-[9px] tracking-widest font-black uppercase transition-all focus:outline-none cursor-pointer border border-transparent ${
                          reminder.status === 'sent'
                            ? 'bg-emerald-950/5 text-[var(--primary)] hover:bg-emerald-950/10'
                            : 'bg-[var(--primary)] text-white hover:bg-emerald-800 hover:shadow-md active:scale-[0.98] active:translate-y-0 hover:-translate-y-px shadow-sm'
                        }`}
                      >
                        {actionLoadingId === reminder.id ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            <span>SENDING...</span>
                          </div>
                        ) : reminder.status === 'sent' ? (
                          'RESEND'
                        ) : (
                          'SEND REMINDER'
                        )}
                      </button>

                      <button
                        onClick={() => onEdit(reminder)}
                        className="p-2.5 rounded-xl bg-white/70 text-emerald-900/50 hover:text-[var(--primary)] hover:bg-white transition-all cursor-pointer inline-flex items-center justify-center focus:outline-none"
                        title="Edit schedule"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>

                      <button
                        onClick={() => onDelete(reminder.id)}
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Mobile Card Stack View (Hidden on larger screens) */}
      <div className="block lg:hidden space-y-4">
        {reminders.map((reminder) => {
          const isOverdue = reminder.status === 'pending' && reminder.dueDate < todayStr;
          const formattedDate = new Date(reminder.dueDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          });

          return (
            <div 
              key={reminder.id}
              className="bg-white/60 backdrop-blur-md border border-emerald-900/5 rounded-3xl p-5 space-y-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-lg text-[var(--primary)] leading-tight">{reminder.patientName}</span>
                  <span className="text-[11px] text-emerald-950/40 mt-0.5">{reminder.patientEmail}</span>
                  {reminder.phoneNumber && (
                    <span className="text-[10px] text-emerald-950/30 font-medium mt-0.5">{reminder.phoneNumber}</span>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      reminder.status === 'sent' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`} />
                    <span className="text-[9px] tracking-wider uppercase font-black text-emerald-900/40">
                      {reminder.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1 items-end">
                    <span className="text-[8px] text-emerald-950/45 font-bold uppercase tracking-widest flex items-center">
                      3D:
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ml-1.5 ${
                        reminder.sent3DayReminder ? 'bg-emerald-500' : 'bg-amber-300'
                      }`} />
                    </span>
                    <span className="text-[8px] text-emerald-950/45 font-bold uppercase tracking-widest flex items-center">
                      DUE:
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ml-1.5 ${
                        reminder.sentDueDayReminder ? 'bg-emerald-500' : 'bg-amber-300'
                      }`} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="bg-emerald-950/5 text-[var(--primary)] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  {reminder.treatmentType}
                </span>
                
                <span className={`text-[11px] font-semibold px-2 py-1 rounded-lg ${
                  isOverdue ? 'text-rose-600 bg-rose-50 font-bold' : 'text-emerald-950/50 bg-emerald-950/5'
                }`}>
                  Due: {formattedDate}
                </span>

                {isOverdue && (
                  <span className="text-[9px] tracking-wide uppercase font-bold text-rose-500 px-2 py-1 bg-rose-50 rounded-lg">
                    OVERDUE
                  </span>
                )}
              </div>

              {reminder.customMessage && (
                <p className="text-xs text-emerald-950/50 bg-emerald-950/5 p-3 rounded-2xl italic">
                  "{reminder.customMessage}"
                </p>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-emerald-900/5">
                <button
                  onClick={() => onSend(reminder)}
                  disabled={actionLoadingId === reminder.id}
                  className={`flex-1 max-w-[140px] py-2.5 rounded-xl text-[9px] tracking-widest font-black uppercase transition-all focus:outline-none cursor-pointer text-center border border-transparent ${
                    reminder.status === 'sent'
                      ? 'bg-emerald-950/5 text-[var(--primary)] hover:bg-emerald-950/10'
                      : 'bg-[var(--primary)] text-white hover:bg-emerald-800 hover:shadow-md active:scale-[0.98] shadow-sm'
                  }`}
                >
                  {actionLoadingId === reminder.id ? (
                    <div className="flex items-center justify-center gap-1.5 mx-auto">
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>SENDING...</span>
                    </div>
                  ) : reminder.status === 'sent' ? (
                    'RESEND'
                  ) : (
                    'SEND EMAIL'
                  )}
                </button>

                <button
                  onClick={() => onEdit(reminder)}
                  className="px-3 rounded-xl bg-white/70 border border-emerald-900/5 text-emerald-900/50 hover:text-[var(--primary)] hover:bg-white transition-all cursor-pointer inline-flex items-center justify-center focus:outline-none"
                  title="Edit schedule"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>

                <button
                  onClick={() => onDelete(reminder.id)}
                  disabled={actionLoadingId === `delete-${reminder.id}`}
                  className="px-3 rounded-xl bg-white/70 border border-rose-100 text-rose-500/50 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer inline-flex items-center justify-center focus:outline-none"
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
