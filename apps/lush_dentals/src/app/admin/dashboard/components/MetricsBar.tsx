import React from 'react';
import { motion } from 'framer-motion';

interface MetricsBarProps {
  metrics: {
    total: number;
    pending: number;
    sent: number;
    overdue: number;
  };
}

export const MetricsBar = ({ metrics }: MetricsBarProps) => {
  const cards = [
    { label: 'Total Scheduled', value: metrics.total, color: 'border-emerald-600/10' },
    { label: 'Pending Reminders', value: metrics.pending, color: 'border-amber-600/10' },
    { label: 'Sent / Completed', value: metrics.sent, color: 'border-blue-600/10' },
    { 
      label: 'Overdue Patients', 
      value: metrics.overdue, 
      color: 'border-rose-600/10', 
      textCls: metrics.overdue > 0 ? 'text-rose-600 font-bold' : '' 
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, idx) => (
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
  );
};
