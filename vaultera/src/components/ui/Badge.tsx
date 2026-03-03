"use client";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "gold" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    success: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    warning: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    danger: "bg-rose-400/10 text-rose-400 border-rose-400/20",
    info: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    gold: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    default: "bg-slate-400/10 text-slate-400 border-slate-400/20",
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", variants[variant], className)}>
      {children}
    </span>
  );
}
