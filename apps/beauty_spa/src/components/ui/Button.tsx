"use client";

import React from 'react';
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

const MotionLink = motion.create(Link);

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  href,
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-500 focus:outline-none disabled:opacity-50 disabled:pointer-events-none tracking-[0.2em] uppercase rounded-full";
  
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 shadow-2xl",
    secondary: "bg-[var(--secondary)] text-white hover:opacity-95 shadow-xl",
    outline: "border-2 border-[var(--primary)]/20 text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-10 py-4 text-[11px]",
    md: "px-14 py-5 text-[13px]",
    lg: "px-20 py-7 text-base",
  };

  const commonProps = {
    whileHover: { y: -4, scale: 1.02 },
    whileTap: { scale: 0.98 },
    className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`,
    ...props as any
  };

  if (href) {
    return (
      <MotionLink href={href} {...commonProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button {...commonProps}>
      {children}
    </motion.button>
  );
};
