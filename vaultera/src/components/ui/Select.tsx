"use client";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export default function Select({ label, options, error, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</label>}
      <select className={cn(
        "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm",
        "focus:outline-none focus:border-amber-500/50 transition-all duration-200 cursor-pointer",
        "[&>option]:bg-slate-900 [&>option]:text-white",
        error && "border-rose-500/50", className)} {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
