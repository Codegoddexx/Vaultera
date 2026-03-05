"use client";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  show: boolean;
}

export default function PageLoader({ show }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <img
              src="/assets/globe-loader.gif"
              alt="Loading Vaultera..."
              className="w-36 h-36 sm:w-44 sm:h-44"
            />
            <div className="text-center">
              <div className="text-2xl font-black gold-text"
                style={{ fontFamily: "var(--font-playfair)" }}>
                Vaultera
              </div>
              <div className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "var(--text-muted)" }}>
                Loading...
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--gold)" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}