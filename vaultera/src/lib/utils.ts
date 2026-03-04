import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock auth — swap with NextAuth + DB later
export const MOCK_CREDENTIALS = {
  email: "adachi@vaultera.com",
  password: "vaultera123",
};

export function signIn(email: string, password: string): boolean {
  return (
    email === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  );
}

export function formatCurrency(
  amount: number,
  currency: string,
  compact = false
): string {
  if (compact && amount >= 1000000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  }
  if (compact && amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: currency === "NGN" ? 0 : 2,
    maximumFractionDigits: currency === "NGN" ? 0 : 2,
  }).format(amount);
}

export function formatRate(rate: number): string {
  if (rate >= 100) return rate.toFixed(2);
  if (rate >= 1) return rate.toFixed(4);
  return rate.toFixed(6);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getChangeColor(change: number): string {
  if (change > 0) return "text-emerald-400";
  if (change < 0) return "text-rose-400";
  return "text-slate-400";
}

export function getChangeBg(change: number): string {
  if (change > 0) return "bg-emerald-400/10 text-emerald-400";
  if (change < 0) return "bg-rose-400/10 text-rose-400";
  return "bg-slate-400/10 text-slate-400";
}
