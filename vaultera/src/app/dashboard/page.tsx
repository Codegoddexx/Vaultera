"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, TrendingUp, Send, Download, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useWallet } from "@/hooks/useWallet";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getCurrencyFlag, getCurrencySymbol } from "@/lib/formatters";
import Link from "next/link";

const QUICK_ACTIONS = [
  { label: "Convert", icon: ArrowLeftRight, href: "/convert", color: "var(--gold)" },
  { label: "Send", icon: Send, href: "/send", color: "var(--blue)" },
  { label: "Receive", icon: Download, href: "/receive", color: "var(--green)" },
  { label: "Invest", icon: TrendingUp, href: "/invest", color: "var(--purple)" },
];

export default function DashboardPage() {
  const [hideBalance, setHideBalance] = useState(false);
  const { wallets, totalBalanceUSD } = useWallet();
  const { transactions } = useAppStore();

  return (
    <div className="space-y-6">

      {/* Total Balance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--gold) 15%, var(--bg-surface)), var(--bg-surface))", border: "1px solid color-mix(in srgb, var(--gold) 20%, transparent)" }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--gold)", transform: "translate(30%, -30%)" }} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Total Portfolio Value</p>
            <button onClick={() => setHideBalance(!hideBalance)}
              className="p-1.5 rounded-lg transition-all" style={{ color: "var(--text-muted)" }}>
              {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="text-4xl font-black mb-1" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
            {hideBalance ? "••••••" : formatCurrency(totalBalanceUSD, "USD")}
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Across all wallets · USD equivalent</p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action, i) => (
          <motion.div key={action.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}>
            <Link href={action.href}>
              <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border cursor-pointer"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `color-mix(in srgb, ${action.color} 15%, transparent)`, border: `1px solid color-mix(in srgb, ${action.color} 30%, transparent)` }}>
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  {action.label}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Wallets Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
          My Wallets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet, i) => (
            <motion.div key={wallet.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-5 rounded-2xl border cursor-pointer relative overflow-hidden"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${wallet.color}40`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
            >
              <div className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${wallet.color}60, transparent)` }} />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getCurrencyFlag(wallet.currency)}</span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                      {wallet.currency}
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--text-dim)" }}>{wallet.name}</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ background: `color-mix(in srgb, ${wallet.color} 15%, transparent)`, color: wallet.color }}>
                  {getCurrencySymbol(wallet.currency)}
                </div>
              </div>
              <div className="text-2xl font-black" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
                {hideBalance ? "••••••" : formatCurrency(wallet.balance, wallet.currency)}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Active · {wallet.accountNumber}</span>
              </div>
            </motion.div>
          ))}
          {/* Add wallet */}
          <Link href="/wallets">
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
              className="p-5 rounded-2xl border border-dashed flex items-center justify-center gap-2 cursor-pointer h-full min-h-[120px]"
              style={{ borderColor: "var(--border-hover)", color: "var(--text-muted)" }}>
              <span className="text-2xl">+</span>
              <span className="text-sm font-medium">Add Wallet</span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
          Recent Transactions
        </h2>
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {transactions.slice(0, 6).map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 px-5 py-4 border-b last:border-0 transition-all"
              style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card)"}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: tx.type === "credit"
                    ? "color-mix(in srgb, var(--green) 12%, transparent)"
                    : tx.type === "convert"
                    ? "color-mix(in srgb, var(--gold) 12%, transparent)"
                    : "color-mix(in srgb, var(--blue) 12%, transparent)"
                }}>
                {tx.type === "credit" ? <ArrowDownLeft size={16} style={{ color: "var(--green)" }} />
                  : tx.type === "convert" ? <ArrowLeftRight size={16} style={{ color: "var(--gold)" }} />
                  : <ArrowUpRight size={16} style={{ color: "var(--blue)" }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  {tx.description}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {formatDate(tx.date)}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-bold"
                  style={{ color: tx.type === "credit" ? "var(--green)" : tx.type === "debit" ? "var(--red)" : "var(--gold)" }}>
                  {tx.type === "credit" ? "+" : tx.type === "debit" ? "-" : "~"}
                  {formatCurrency(tx.amount, tx.currency)}
                </div>
                <div className="text-[10px] capitalize px-2 py-0.5 rounded-full mt-0.5 inline-block"
                  style={{
                    background: tx.status === "completed" ? "color-mix(in srgb, var(--green) 12%, transparent)" : "color-mix(in srgb, var(--gold) 12%, transparent)",
                    color: tx.status === "completed" ? "var(--green)" : "var(--gold)"
                  }}>
                  {tx.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}