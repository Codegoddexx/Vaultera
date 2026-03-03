"use client";
import { motion } from "framer-motion";

const TICKER_ITEMS = [
  { pair: "EUR/USD", rate: "1.0847", change: "+0.13%", up: true },
  { pair: "GBP/USD", rate: "1.2622", change: "+0.09%", up: true },
  { pair: "USD/NGN", rate: "1,601.45", change: "-2.10%", up: false },
  { pair: "USD/AED", rate: "3.6725", change: "0.00%", up: true },
  { pair: "EUR/GBP", rate: "0.8595", change: "-0.05%", up: false },
  { pair: "GBP/NGN", rate: "2,021.80", change: "-1.90%", up: false },
  { pair: "EUR/NGN", rate: "1,737.22", change: "-1.50%", up: false },
  { pair: "AED/USD", rate: "0.2723", change: "+0.01%", up: true },
  { pair: "USD/JPY", rate: "151.22", change: "+0.32%", up: true },
  { pair: "GBP/EUR", rate: "1.1634", change: "+0.06%", up: true },
];

const TickerItem = ({ pair, rate, change, up }: any) => (
  <div className="flex items-center gap-3 px-6 whitespace-nowrap">
    <span className="text-xs font-bold text-slate-300">{pair}</span>
    <span className="text-xs font-black text-white">{rate}</span>
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
      up ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
    }`}>{change}</span>
    <span className="text-slate-700">·</span>
  </div>
);

export default function CurrencyTicker() {
  return (
    <div className="relative py-4 bg-[#0C0F1A]/80 border-y border-white/5 overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0C0F1A] to-transparent z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0C0F1A] to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </motion.div>
    </div>
  );
}
