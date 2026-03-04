import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}>
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "vt-input w-full py-3 rounded-xl text-sm transition-all",
              leftIcon ? "pl-10 pr-4" : "px-4",
              className
            )}
            style={{ borderRadius: "0.75rem" }}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs" style={{ color: "var(--red)" }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
