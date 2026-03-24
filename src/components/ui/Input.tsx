import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export function Input({ label, icon, helperText, className = '', ...props }: InputProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-[var(--text-main)]">{label}</label>
          {helperText && (
            <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{helperText}</span>
          )}
        </div>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-emerald-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          className={`w-full ${icon ? 'pl-10' : 'px-3'} py-2.5 bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-[var(--text-muted)]/50`}
          {...props}
        />
      </div>
    </div>
  );
}
