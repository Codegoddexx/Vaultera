"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Lock, Calendar, ChevronRight, CheckCircle } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatCurrency } from "@/lib/utils";
import { getCurrencyFlag } from "@/lib/formatters";
import { MOCK_INVESTMENT_PLANS } from "@/lib/mockData";
import PageLoader from "@/components/layout/PageLoader";

const RISK_COLORS: Record<string, string> = {
  low: "var(--green)",
  medium: "var(--gold)",
  high: "var(--red)",
};

export default function InvestPage() {
  const { activeInvestments } = useAppStore();
  const [tab, setTab] = useState<"plans" | "active">("plans");
  const [currency, setCurrency] = useState("all");
  const [loading, setLoading] = useState(false);
  const [investing, setInvesting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const filtered = currency === "all"
    ? MOCK_INVESTMENT_PLANS
    : MOCK_INVESTMENT_PLANS.filter(p => p.currency === currency);

  const handleInvest = async (planId: string, planName: string) => {
    setInvesting(planId);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setInvesting(null);
    setSuccess(planName);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <>
      <PageLoader show={loading} />

      <div className="space-y-6">

        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-lg"
              style={{
                background: "color-mix(in srgb, var(--green) 12%, var(--bg-surface))",
                borderColor: "color-mix(in srgb, var(--green) 30%, transparent)",
              }}>
              <CheckCircle size={18} style={{ color: "var(--green)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Invested in {success}!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-2xl w-fit"
          style={{ background: "var(--bg-surface)" }}>
          {["plans", "active"].map(t => (
            <button key={t} onClick={() => setTab(t as any)}
              className="px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
              style={{
                background: tab === t ? "var(--gold)" : "transparent",
                color: tab === t ? "#000" : "var(--text-muted)",
              }}>
              {t === "active" ? `Active (${activeInvestments.length})` : "Plans"}
            </button>
          ))}
        </div>

        {tab === "plans" && (
          <>
            {/* Currency filter */}
            <div className="flex gap-2 flex-wrap">
              {["all", "USD", "EUR", "GBP"].map(c => (
                <button key={c} onClick={() => setCurrency(c)}
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all border"
                  style={{
                    background: currency === c ? "color-mix(in srgb, var(--gold) 15%, transparent)" : "var(--bg-card)",
                    borderColor: currency === c ? "color-mix(in srgb, var(--gold) 40%, transparent)" : "var(--border)",
                    color: currency === c ? "var(--gold)" : "var(--text-muted)",
                  }}>
                  {c === "all" ? "All" : `${getCurrencyFlag(c)} ${c}`}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((plan, i) => {
                const riskKey = plan.risk.toLowerCase();
                const riskColor = RISK_COLORS[riskKey] ?? "var(--text-muted)";
                return (
                  <motion.div key={plan.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl border p-5 relative overflow-hidden"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in srgb, var(--gold) 30%, transparent)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                  >
                    <div className="absolute inset-x-0 top-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${riskColor}60, transparent)` }} />

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCurrencyFlag(plan.currency)}</span>
                        <span className="text-xs font-bold uppercase" style={{ color: "var(--text-muted)" }}>
                          {plan.currency}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full"
                        style={{
                          background: `color-mix(in srgb, ${riskColor} 12%, transparent)`,
                          color: riskColor,
                        }}>
                        {plan.risk} risk
                      </span>
                    </div>

                    <h3 className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
                    <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                      Earn {plan.roi} returns over {plan.duration}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: "ROI", value: plan.roi, icon: TrendingUp },
                        { label: "Duration", value: plan.duration, icon: Calendar },
                        { label: "Min", value: formatCurrency(plan.minAmount, plan.currency), icon: Lock },
                      ].map(d => (
                        <div key={d.label} className="text-center p-2 rounded-xl"
                          style={{ background: "var(--bg-surface)" }}>
                          <d.icon size={12} className="mx-auto mb-1" style={{ color: "var(--gold)" }} />
                          <div className="text-[10px] font-black" style={{ color: "var(--text-primary)" }}>{d.value}</div>
                          <div className="text-[9px]" style={{ color: "var(--text-muted)" }}>{d.label}</div>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => handleInvest(plan.id, plan.name)}
                      disabled={investing === plan.id}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="gold-btn w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1">
                      Invest Now <ChevronRight size={14} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {tab === "active" && (
          <div className="space-y-4">
            {activeInvestments.length === 0 ? (
              <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
                No active investments yet. Browse plans to get started.
              </div>
            ) : (
              activeInvestments.map((inv, i) => (
                <motion.div key={inv.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border p-5"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold" style={{ color: "var(--text-primary)" }}>{inv.planName}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Matures: {new Date(inv.maturityDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)" }}>
                        {formatCurrency(inv.projectedReturn, inv.currency)}
                      </div>
                      <div className="text-xs" style={{ color: "var(--green)" }}>
                        +{formatCurrency(inv.projectedReturn - inv.amount, inv.currency)} projected
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full mb-1" style={{ background: "var(--border)" }}>
                    <motion.div className="h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(inv.progress, 100)}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ background: "linear-gradient(90deg, var(--gold), var(--gold-light))" }} />
                  </div>
                  <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    {Math.round(Math.min(inv.progress, 100))}% complete · {inv.roi} ROI
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
