"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, glow = false, glowColor = "amber", onClick }: CardProps) {
  const glowColors: Record<string, string> = {
    amber: "hover:shadow-amber-500/10", emerald: "hover:shadow-emerald-500/10",
    blue: "hover:shadow-blue-500/10", purple: "hover:shadow-purple-500/10",
  };
  return (
    <motion.div onClick={onClick} whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-6 transition-all duration-300",
        hover && "cursor-pointer hover:border-white/10",
        glow && `hover:shadow-xl ${glowColors[glowColor]}`, className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />
      {children}
    </motion.div>
  );
}
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}
export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-base font-semibold text-white", className)}>{children}</h3>;
}
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>;
}
