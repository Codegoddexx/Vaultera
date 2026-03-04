"use client";
import Link from "next/link";
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
    <footer className="w-full px-6 md:px-12 lg:px-20 pt-20 pb-10 border-t"
      style={{ background: "var(--bg-surface)", borderColor: "var(--border)" }}>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
        <div className="col-span-2">
          <div className="text-2xl font-black gold-text mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}>Vaultera</div>
          <div className="text-[9px] tracking-[3px] uppercase mb-4" style={{ color: "var(--text-muted)" }}>
            Global Currency Platform
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            The new era of money movement. Convert, hold, send and invest in 180 world currencies.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-semibold">All systems operational</span>
          </div>
        </div>
        {Object.entries(links).map(([section, items]) => (
          <div key={section}>
            <div className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-primary)" }}>{section}</div>
            <ul className="space-y-2.5">
              {items.map(item => (
                <li key={item}>
                  <a href="#" className="text-sm transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--gold)"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: "var(--border)" }}>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          © {year} Vaultera. All rights reserved. Built with 💛 for the borderless generation.
        </div>
        <div className="flex items-center gap-6">
          {["Twitter", "Instagram", "LinkedIn"].map(s => (
            <a key={s} href="#" className="text-xs transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--gold)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>
              {s}
            </a>
          ))}
        </div>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          🌍 {siteConfig.url}
        </div>
      </div>
    </footer>
  );
}