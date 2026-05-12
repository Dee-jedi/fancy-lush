import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none tracking-widest uppercase";
  
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-lg hover:shadow-[var(--primary)]/20 hover:-translate-y-0.5",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90 shadow-lg hover:shadow-[var(--secondary)]/20 hover:-translate-y-0.5",
    outline: "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:-translate-y-0.5",
    ghost: "text-[var(--primary)] hover:bg-[var(--primary)]/5",
  };

  const sizes = {
    sm: "px-7 py-3 rounded-full text-[12px]",
    md: "px-10 py-4 rounded-full text-[14px]",
    lg: "px-14 py-6 rounded-full text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
