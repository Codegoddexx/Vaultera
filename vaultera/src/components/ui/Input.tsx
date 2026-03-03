"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, suffix, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</label>}
        <div className="relative flex items-center">
          {prefix && <div className="absolute left-4 text-slate-400 pointer-events-none">{prefix}</div>}
          <input ref={ref} className={cn(
            "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm",
            "focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all duration-200",
            prefix && "pl-10", suffix && "pr-10",
            error && "border-rose-500/50", className)} {...props} />
          {suffix && <div className="absolute right-4 text-slate-400">{suffix}</div>}
        </div>
        {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
