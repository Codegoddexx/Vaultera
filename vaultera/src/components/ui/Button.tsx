"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "gold", size = "md", loading, children, className, disabled, ...props }, ref) => {
    const base = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
    const variants = {
      gold: "bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]",
      outline: "border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400",
      ghost: "text-slate-400 hover:text-white hover:bg-white/5",
      danger: "bg-rose-500/10 border border-rose-500/50 text-rose-400 hover:bg-rose-500/20",
    };
    const sizes = { sm: "text-xs px-3 py-2 gap-1.5", md: "text-sm px-5 py-2.5 gap-2", lg: "text-base px-7 py-3.5 gap-2.5" };
    return (
      <motion.button ref={ref} whileTap={{ scale: 0.97 }}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading} {...(props as any)}>
        <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
        {loading ? (<span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Loading...</span>) : children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
export default Button;
