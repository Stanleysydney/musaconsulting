import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = ({ children, variant = 'default', className, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 h-10 px-4 py-2";
  const variants = {
    default: "bg-primary-600 text-white hover:bg-primary-700 shadow-md",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-950",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-700 dark:text-slate-300"
  };

  return (
    <button className={twMerge(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};