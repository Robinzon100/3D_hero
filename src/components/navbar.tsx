"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/content";
import { useSite } from "@/components/site-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();
  const { openAction } = useSite();
  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 16);
    if (value < 250) setActive("");
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    navigation.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const listFood = () => {
    setOpen(false);
    openAction({ type: "list" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-[#dde3d1]/80 bg-cream/90 shadow-[0_2px_20px_-12px_#294b35] backdrop-blur-xl"
          : "border-transparent bg-cream/80 backdrop-blur-xl",
      )}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-5 lg:h-[88px]">
        <a
          href="#home"
          id="home-link"
          aria-label="FoodBridge home"
          onClick={() => setOpen(false)}
          className="rounded-lg"
        >
          <Brand />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              className={cn(
                "relative py-2 text-[13px] font-medium transition-colors hover:text-primary",
                active === item.href ? "text-primary" : "text-[#535b50]",
              )}
            >
              {item.label}
              {active === item.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-primary"
                />
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="coral" onClick={listFood} className="hidden sm:inline-flex">
            <Plus />
            List Your Food
          </Button>
          <Button
            variant="ghost"
            size="icon"
            id="mobile-menu-toggle"
            className="lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.href ? "location" : undefined}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium hover:bg-primary/5 hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-primary" aria-hidden="true" />
                </a>
              ))}
              <Button variant="coral" onClick={listFood} className="mt-2 w-full sm:hidden">
                <Plus />
                List Your Food
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
