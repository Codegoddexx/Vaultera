"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { ALL_CURRENCIES, MOCK_RATES } from "@/lib/constants";
import { getCurrencyFlag } from "@/lib/formatters";

const BASE_CURRENCIES = ["USD", "EUR", "GBP", "NGN", "AED"];

export default function RatesPage() {
  const [base, setBase] = useState("USD");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return ALL_CURRENCIES.filter(c =>
      c.code !== base &&
      (c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [base, search]);

  const getRate = (to: string): string => {
    const key = `${base}/${to}`;
    const rev = `${to}/${base}`;
    if (MOCK_RATES[key]) return Number(MOCK_RATES[key]).toFixed(4);
    if (MOCK_RATES[rev]) return (1 / Number(MOCK_RATES[rev])).toFixed(4);
    return "—";
  };

  const CHANGES: Record<string, number> = {
    EUR: 0.13, GBP: 0.09, NGN: -2.1, AED: 0.0,
    JPY: 0.32, GHS: -0.8, CHF: 0.05, CAD: 0.12, AUD: -0.3,
  };

  const getChange = (code: string): number => {
    return CHANGES[code] ?? parseFloat((Math.random() * 2 - 1).toFixed(2));
  };

  return (
    <div className="space-y-5">

      {/* Base selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest w-full sm:w-auto"
          style={{ color: "var(--text-muted)" }}>Base Currency:</span>
        <div className="flex flex-wrap gap-2">
          {BASE_CURRENCIES.map(c => (
            <button key={c} onClick={() => setBase(c)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-semibold transition-all"
              style={{
                background: base === c ? "color-mix(in srgb, var(--gold) 15%, transparent)" : "var(--bg-card)",
                borderColor: base === c ? "color-mix(in srgb, var(--gold) 40%, transparent)" : "var(--border)",
                color: base === c ? "var(--gold)" : "var(--text-muted)",
              }}>
              {getCurrencyFlag(c)} {c}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-muted)" }} />
        <input placeholder="Search currency..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="vt-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
          style={{ borderRadius: "0.75rem" }} />
      </div>

      {/* Table — scrollable on mobile */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        {/* Header */}
        <div className="grid grid-cols-3 sm:grid-cols-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <span>Currency</span>
          <span className="text-right">Rate (1 {base})</span>
          <span className="text-right hidden sm:block">24h Change</span>
          <span className="text-right">Trend</span>
        </div>

        {/* Rows */}
        <div style={{ background: "var(--bg-card)" }}>
          {filtered.slice(0, 60).map((c, i) => {
            const change = getChange(c.code);
            const up = change >= 0;
            return (
              <motion.div key={c.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.015 }}
                className="grid grid-cols-3 sm:grid-cols-4 items-center px-4 py-3 border-b last:border-0 transition-all"
                style={{ borderColor: "var(--border)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                {/* Currency */}
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl">{getCurrencyFlag(c.code)}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {c.code}
                    </div>
                    <div className="text-[9px] sm:text-[10px] hidden sm:block truncate max-w-[100px]"
                      style={{ color: "var(--text-muted)" }}>{c.name}</div>
                  </div>
                </div>

                {/* Rate */}
                <div className="text-right text-xs sm:text-sm font-bold"
                  style={{ color: "var(--text-primary)" }}>
                  {getRate(c.code)}
                </div>

                {/* Change — hidden on mobile */}
                <div className="text-right text-xs sm:text-sm font-semibold hidden sm:block"
                  style={{ color: up ? "var(--green)" : "var(--red)" }}>
                  {up ? "+" : ""}{change.toFixed(2)}%
                </div>

                {/* Trend */}
                <div className="flex justify-end items-center gap-1">
                  {up
                    ? <TrendingUp size={14} style={{ color: "var(--green)" }} />
                    : <TrendingDown size={14} style={{ color: "var(--red)" }} />}
                  <span className="text-[10px] sm:hidden"
                    style={{ color: up ? "var(--green)" : "var(--red)" }}>
                    {up ? "+" : ""}{change.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}