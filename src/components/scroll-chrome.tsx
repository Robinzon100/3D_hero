"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollChrome() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  // Subscribe to the browser, including restored scroll positions after a reload.
  useEffect(() => {
    const sync = () => {
      setShowTop(window.scrollY > 500);
      setProgress(Math.round(scrollYProgress.get() * 100));
    };
    const initialFrame = requestAnimationFrame(sync);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-forest"
        style={{ scaleX: reduced ? scrollYProgress : scaleX }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      />
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
              document.getElementById("home-link")?.focus({ preventScroll: true });
            }}
            className="fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-primary/15 bg-card text-primary shadow-lift transition-colors hover:bg-primary hover:text-white focus-visible:outline-primary sm:bottom-7 sm:right-7"
            aria-label="Back to top"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
