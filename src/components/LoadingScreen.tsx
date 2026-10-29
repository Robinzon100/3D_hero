"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function LoadingScreen({ loaded }: { loaded: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <motion.div
      aria-live="polite"
      aria-label="Loading experience"
      initial={{ opacity: 1 }}
      animate={{ opacity: loaded ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (loaded) setDismissed(true);
      }}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1F0A] text-[#FEFAE0] ${loaded ? "pointer-events-none" : ""}`}
    >
      <div className="flex items-center gap-3 font-display text-lg">
        <span className="size-2.5 animate-pulse rounded-full bg-[#52B788]" />
        Loading experience...
      </div>
    </motion.div>
  );
}
