import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-[0.1em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase";
  
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-emerald-700 shadow-sm",
    secondary: "bg-[var(--secondary)] text-emerald-900 hover:bg-[#b89744] shadow-sm",
    outline: "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
    ghost: "text-[var(--primary)] hover:bg-emerald-50",
  };

  const sizes = {
    sm: "px-6 py-2.5 text-[10px] rounded-full",
    md: "px-8 py-3.5 text-xs rounded-full",
    lg: "px-10 py-4.5 text-[13px] rounded-full",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={combinedClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
