"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { getCurrencyFlag } from "@/lib/formatters";

const BASE_CURRENCIES = ["USD", "EUR", "GBP", "NGN", "AED"];

interface RateData {
  rates: Record<string, number>;
  base: string;
  lastUpdated: string;
  source: string;
}

export default function RatesPage() {
  const [base, setBase] = useState("USD");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<RateData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRates = async (baseCurrency: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rates?base=${baseCurrency}`);
      const json = await res.json();
      if (json.success) setData(json);
    } catch (err) {
      console.error("Failed to fetch rates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRates(base); }, [base]);

  const entries = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.rates)
      .filter(([code]) =>
        code !== base &&
        (code.toLowerCase().includes(search.toLowerCase()))
      );
  }, [data, base, search]);

  // Simulated 24h change (real change requires historical data — Phase 2)
  const getChange = (code: string): number => {
    const seed = code.charCodeAt(0) + code.charCodeAt(1);
    return parseFloat(((seed % 10 - 5) * 0.4).toFixed(2));
  };

  return (
    <div className="space-y-5">

      {/* Header with last updated */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          {data && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Last updated: {new Date(data.lastUpdated).toLocaleTimeString()} ·{" "}
              <span style={{ color: data.source === "cache" ? "var(--green)" : "var(--gold)" }}>
                {data.source === "cache" ? "⚡ Cached" : "🌐 Fresh from API"}
              </span>
            </p>
          )}
        </div>
        <button onClick={() => fetchRates(base)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold self-start sm:self-auto"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)", color: "var(--gold)" }}>
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Base selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest w-full sm:w-auto"
          style={{ color: "var(--text-muted)" }}>Base:</span>
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
        <input placeholder="Search currency code..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="vt-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
          style={{ borderRadius: "0.75rem" }} />
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div className="grid grid-cols-3 sm:grid-cols-4 px-4 py-3 text-[10px] font-bold uppercase tracking-widest border-b"
          style={{ background: "var(--bg-surface)", borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <span>Currency</span>
          <span className="text-right">Rate (1 {base})</span>
          <span className="text-right hidden sm:block">24h Change</span>
          <span className="text-right">Trend</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm" style={{ color: "var(--text-muted)", background: "var(--bg-card)" }}>
            <RefreshCw size={24} className="animate-spin mx-auto mb-3" style={{ color: "var(--gold)" }} />
            Fetching live rates...
          </div>
        ) : (
          <div style={{ background: "var(--bg-card)" }}>
            {entries.slice(0, 80).map(([code, rate], i) => {
              const change = getChange(code);
              const up = change >= 0;
              return (
                <motion.div key={code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.008 }}
                  className="grid grid-cols-3 sm:grid-cols-4 items-center px-4 py-3 border-b last:border-0 transition-all"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg-card-hover)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>

                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl">{getCurrencyFlag(code)}</span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold" style={{ color: "var(--text-primary)" }}>{code}</div>
                    </div>
                  </div>

                  <div className="text-right text-xs sm:text-sm font-bold font-mono"
                    style={{ color: "var(--text-primary)" }}>
                    {rate.toFixed(4)}
                  </div>

                  <div className="text-right text-xs sm:text-sm font-semibold hidden sm:block"
                    style={{ color: up ? "var(--green)" : "var(--red)" }}>
                    {up ? "+" : ""}{change.toFixed(2)}%
                  </div>

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
        )}
      </div>
    </div>
  );
}
