"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const FLOATING_CURRENCIES = [
  { code: "USD", symbol: "$", flag: "🇺🇸", color: "#10B981", x: "5%", y: "20%", delay: 0 },
  { code: "EUR", symbol: "€", flag: "🇪🇺", color: "#C9A84C", x: "80%", y: "15%", delay: 0.3 },
  { code: "GBP", symbol: "£", flag: "🇬🇧", color: "#8B5CF6", x: "76%", y: "60%", delay: 0.6 },
  { code: "NGN", symbol: "₦", flag: "🇳🇬", color: "#3B82F6", x: "4%", y: "62%", delay: 0.9 },
  { code: "AED", symbol: "د.إ", flag: "🇦🇪", color: "#F59E0B", x: "44%", y: "82%", delay: 1.1 },
  { code: "JPY", symbol: "¥", flag: "🇯🇵", color: "#EF4444", x: "20%", y: "8%", delay: 1.3 },
  { code: "CHF", symbol: "Fr", flag: "🇨🇭", color: "#06B6D4", x: "66%", y: "6%", delay: 0.7 },
];

function VaultGlobe() {
  const rotateX = useMotionValue(15);
  const rotateY = useMotionValue(-20);
  const springX = useSpring(rotateX, { stiffness: 80, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 18 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    rotateY.set(rotateY.get() + (e.clientX - lastPos.current.x) * 0.6);
    rotateX.set(rotateX.get() - (e.clientY - lastPos.current.y) * 0.6);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { isDragging.current = false; };

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) rotateY.set(rotateY.get() + 0.2);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animRef.current); };
  }, [rotateY]);

  const dots = Array.from({ length: 30 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 30);
    const theta = Math.sqrt(30 * Math.PI) * phi;
    const r = 95;
    return {
      x: r * Math.cos(theta) * Math.sin(phi),
      y: r * Math.sin(theta) * Math.sin(phi),
      z: r * Math.cos(phi),
      color: ["#F59E0B","#8B5CF6","#3B82F6","#10B981"][i % 4],
    };
  });

  const orbitCurrencies = [
    { sym: "$", color: "#10B981", angle: 0 },
    { sym: "€", color: "#F59E0B", angle: Math.PI / 2 },
    { sym: "£", color: "#8B5CF6", angle: Math.PI },
    { sym: "₦", color: "#3B82F6", angle: (3 * Math.PI) / 2 },
  ];

  return (
    <div className="relative flex items-center justify-center"
      style={{ width: 340, height: 340 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(139,92,246,0.2) 35%, transparent 65%)",
        filter: "blur(40px)", transform: "scale(1.5)",
      }} />
      {/* Ring border */}
      <div className="absolute rounded-full pointer-events-none" style={{
        width: "100%", height: "100%",
        border: "1px solid rgba(245,158,11,0.15)",
        boxShadow: "0 0 80px rgba(245,158,11,0.2), inset 0 0 80px rgba(245,158,11,0.05)",
      }} />
      {/* 3D scene */}
      <motion.div
        onPointerDown={onPointerDown} onPointerMove={onPointerMove}
        onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
        className="relative cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
        style={{ width: 320, height: 320, perspective: 1000 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 70 }}
      >
        <motion.div className="w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d", rotateX: springX, rotateY: springY }}>
          {/* Core */}
          <div className="absolute flex items-center justify-center rounded-full" style={{
            width: 130, height: 130,
            background: "radial-gradient(circle at 35% 30%, #2a1f0e, #100d1a, #080B12)",
            boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.9), inset 6px 6px 20px rgba(245,158,11,0.3), 0 0 60px rgba(245,158,11,0.5), 0 0 100px rgba(139,92,246,0.25)",
            border: "2px solid rgba(245,158,11,0.5)", transformStyle: "preserve-3d",
          }}>
            <span className="text-4xl font-black select-none" style={{
              fontFamily: "var(--font-playfair)",
              background: "linear-gradient(135deg, #F59E0B, #FCD34D)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 16px rgba(245,158,11,1))",
            }}>V</span>
          </div>
          {/* Rings */}
          {[
            { size: 210, tilt: "rotateX(88deg)", color: "#F59E0B", opacity: 0.8, w: 2, dash: "10 5" },
            { size: 190, tilt: "rotateX(55deg) rotateZ(35deg)", color: "#8B5CF6", opacity: 0.6, w: 1.5, dash: "6 8" },
            { size: 170, tilt: "rotateX(25deg) rotateZ(-25deg)", color: "#3B82F6", opacity: 0.55, w: 1.5, dash: "4 10" },
            { size: 240, tilt: "rotateX(70deg) rotateZ(70deg)", color: "#10B981", opacity: 0.4, w: 1, dash: "3 12" },
          ].map((ring, i) => (
            <div key={i} className="absolute flex items-center justify-center"
              style={{ width: ring.size, height: ring.size, transform: ring.tilt, transformStyle: "preserve-3d" }}>
              <svg width={ring.size} height={ring.size} style={{ position: "absolute", overflow: "visible" }}>
                <circle cx={ring.size/2} cy={ring.size/2} r={ring.size/2-2}
                  fill="none" stroke={ring.color} strokeWidth={ring.w}
                  strokeDasharray={ring.dash} opacity={ring.opacity}
                  style={{ filter: `drop-shadow(0 0 6px ${ring.color})` }} />
              </svg>
            </div>
          ))}
          {/* Dots */}
          {dots.map((dot, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: 5, height: 5, background: dot.color,
              transform: `translate3d(${dot.x}px, ${dot.y}px, ${dot.z}px)`,
              boxShadow: `0 0 8px ${dot.color}, 0 0 14px ${dot.color}60`, opacity: 0.9,
            }} />
          ))}
          {/* Orbiting pills */}
          {orbitCurrencies.map((c, i) => (
            <div key={i} className="absolute flex items-center justify-center rounded-full font-black text-sm"
              style={{
                width: 38, height: 38,
                background: `radial-gradient(circle, ${c.color}50, ${c.color}15)`,
                border: `2px solid ${c.color}`, color: c.color,
                transform: `translate3d(${Math.cos(c.angle)*140}px, ${Math.sin(c.angle)*50}px, ${Math.sin(c.angle)*110}px)`,
                boxShadow: `0 0 16px ${c.color}80, 0 0 32px ${c.color}40`,
                textShadow: `0 0 10px ${c.color}`,
              }}>
              {c.sym}
            </div>
          ))}
        </motion.div>
      </motion.div>
      {/* Drag hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
        <motion.span animate={{ x: [-3, 3, -3] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: "var(--gold)" }} className="text-sm">↔</motion.span>
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Drag to rotate
        </span>
        <motion.span animate={{ x: [3, -3, 3] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: "var(--gold)" }} className="text-sm">↔</motion.span>
      </motion.div>
    </div>
  );
}

function FloatingCard({ code, symbol, flag, color, x, y, delay }: any) {
  return (
    <motion.div className="absolute z-20" style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 100 }}>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
      >
        <div className="absolute inset-0 rounded-2xl scale-110 blur-xl opacity-40"
          style={{ background: color }} />
        <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl"
          style={{
            background: "rgba(10,13,22,0.85)",
            borderColor: `${color}50`,
            boxShadow: `0 8px 32px ${color}30`,
          }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{ background: `${color}25`, border: `1px solid ${color}40` }}>
            {flag}
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}>{code}</div>
            <div className="text-base font-black leading-tight"
              style={{ color, textShadow: `0 0 10px ${color}90` }}>{symbol}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section style={{ background: "var(--bg-primary)" }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-32">

      {/* Full-width background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at center, transparent 30%, var(--bg-primary) 80%)`
        }} />
      </div>

      {/* Badge */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-12"
        style={{ background: "color-mix(in srgb, var(--gold) 10%, transparent)", borderColor: "color-mix(in srgb, var(--gold) 30%, transparent)" }}>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--gold)" }} />
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--gold)" }}>
          180 Currencies · Live Rates · Zero Borders
        </span>
      </motion.div>

      {/* Globe — centred, floating cards around it */}
      <div className="relative z-10 w-full flex items-center justify-center" style={{ height: 420 }}>
        {/* Floating cards — positioned absolutely around the globe */}
        <div className="absolute inset-0">
          {FLOATING_CURRENCIES.map((c) => <FloatingCard key={c.code} {...c} />)}
        </div>
        {/* Globe dead centre */}
        <VaultGlobe />
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  );
}