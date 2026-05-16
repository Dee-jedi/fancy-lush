import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  rounded = 'full',
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none tracking-[0.2em] uppercase";
  
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:opacity-90 shadow-lg hover:shadow-[var(--primary)]/10 hover:-translate-y-0.5",
    secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90 shadow-lg hover:shadow-[var(--secondary)]/10 hover:-translate-y-0.5",
    outline: "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:-translate-y-0.5",
    ghost: "text-[var(--primary)] hover:bg-[var(--primary)]/5",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-[10px]",
    md: "px-9 py-4 text-[12px]",
    lg: "px-12 py-5 text-[14px]",
  };

  const rounding = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${rounding[rounded]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
