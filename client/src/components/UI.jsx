import React from 'react';
import { twMerge } from 'tailwind-merge';

// 1. Scalable Button Component
export const Button = ({ children, variant = 'primary', className, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3";
  
  const variants = {
    primary: "bg-clinic-600 text-white hover:bg-clinic-700 shadow-lg shadow-clinic-500/30",
    outline: "border-2 border-clinic-600 text-clinic-600 dark:text-clinic-400 dark:border-clinic-400 hover:bg-clinic-50 dark:hover:bg-clinic-900/20",
    ghost: "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-dark-border"
  };

  return (
    <button className={twMerge(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

// 2. Animated Card Component
import { motion } from 'framer-motion';

export const FadeIn = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);