"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Product: ["Converter", "Wallets", "Invest", "Send Money", "Live Rates"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "KYC Policy"],
    Support: ["Help Center", "Contact Us", "Status", "Community"],
  };

  return (
    <footer className="border-t border-white/5 bg-[#0C0F1A]/50 px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="text-2xl font-black bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Vaultera
            </div>
            <div className="text-[9px] text-slate-500 tracking-[3px] uppercase mb-4">Global Currency Platform</div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
              The new era of money movement. Convert, hold, send and invest in 180 world currencies.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-semibold">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">{section}</div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 hover:text-amber-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            © {year} Vaultera. All rights reserved. Built with 💛 for the borderless generation.
          </div>
          <div className="flex items-center gap-6">
            {["Twitter", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-xs text-slate-600 hover:text-amber-400 transition-colors">{s}</a>
            ))}
          </div>
          <div className="text-xs text-slate-600">
            🌍 Available worldwide · 180 currencies · {siteConfig.url}
          </div>
        </div>
      </div>
    </footer>
  );
}
