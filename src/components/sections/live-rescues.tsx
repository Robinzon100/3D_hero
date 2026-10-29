"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock3,
  Coffee,
  Croissant,
  Info,
  Leaf,
  MapPin,
  SearchX,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { rescues, rescueCategories, type Rescue, type RescueFilter } from "@/data/rescues";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PulseDot, Reveal } from "@/components/motion";
import { useSite } from "@/components/site-provider";
import { cn } from "@/lib/utils";

const categoryStyles = {
  Food: { icon: Utensils, style: "bg-[#e9efdd] text-[#567443]" },
  Drinks: { icon: Coffee, style: "bg-[#fcebd9] text-[#a7753b]" },
  Bakery: { icon: Croissant, style: "bg-[#f5e8db] text-[#9b744d]" },
};
const filters: RescueFilter[] = ["All", ...rescueCategories];

function RescueCard({ rescue, index }: { rescue: Rescue; index: number }) {
  const { openAction, claimedIds } = useSite();
  const claimed = claimedIds.includes(rescue.id);
  const reduced = useReducedMotion();
  const { icon: Icon, style } = categoryStyles[rescue.category];
  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="h-full"
    >
      <Card
        className={cn(
          "card-interactive flex h-full flex-col p-5 shadow-none sm:p-6",
          claimed && "border-primary/30 bg-[#f6f9f0]",
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-2">
          <span className={cn("flex size-12 items-center justify-center rounded-xl", style)}>
            <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-[10px]">
              {rescue.category}
            </Badge>
            {claimed ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
                <Check className="size-3" />
                Demo claimed
              </span>
            ) : rescue.urgent ? (
              <Badge variant="coral" className="px-2 py-0.5 text-[9px]">
                <Clock3 className="size-2.5" />
                Pickup soon
              </Badge>
            ) : (
              <span className="text-[10px] text-muted-foreground">{rescue.posted}</span>
            )}
          </div>
        </div>
        <h3 className="font-display text-[18px] font-semibold tracking-[-0.5px]">
          {rescue.restaurant}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {rescue.cuisine} <span className="px-1 text-[#a1aa98]">•</span> {rescue.neighborhood}
        </p>
        <div className="mb-5 mt-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            GOOD FOOD UP FOR GRABS
          </p>
          <ul className="flex min-h-12 flex-col justify-center gap-1.5 text-[13px] font-medium">
            {rescue.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-5 flex items-center justify-between gap-2">
          <Badge className="gap-1.5 px-2.5 py-1.5">
            <ShoppingBag className="size-3" />
            {rescue.quantity} items
          </Badge>
          <span className="text-[10px] text-muted-foreground">Free to collect</span>
        </div>
        <div className="mt-auto space-y-2.5 border-t border-border pt-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock3 className="size-3.5 text-[#7d8974]" />
            {rescue.pickupWindow}
          </p>
          <p className="flex items-center gap-2">
            <motion.span
              className="inline-flex"
              animate={reduced ? {} : { opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="size-3.5 text-[#7d8974]" />
            </motion.span>
            {rescue.distance}
            <span className="ml-auto text-primary">
              <PulseDot className="size-1.5 [&>span]:size-1.5" />
            </span>
          </p>
        </div>
        <Button
          variant={claimed ? "secondary" : "coral"}
          className="mt-5 w-full"
          disabled={claimed}
          onClick={() => openAction({ type: "claim", rescue })}
          aria-label={
            claimed
              ? `${rescue.restaurant} claimed in this demo`
              : `Claim ${rescue.quantity} items from ${rescue.restaurant}`
          }
        >
          {claimed ? (
            <>
              <Check />
              Claimed in this demo
            </>
          ) : (
            <>
              Claim This
              <ArrowRight />
            </>
          )}
        </Button>
      </Card>
    </motion.article>
  );
}

function RescueSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6" aria-hidden="true">
      <div className="mb-5 flex justify-between">
        <div className="size-12 rounded-xl bg-sage" />
        <div className="h-5 w-14 rounded-full bg-sage" />
      </div>
      <div className="h-5 w-2/3 rounded bg-sage" />
      <div className="mt-3 h-3 w-4/5 rounded bg-sage" />
      <div className="mt-7 h-12 w-full rounded-lg bg-sage" />
      <div className="mt-5 h-6 w-24 rounded-full bg-sage" />
      <div className="mt-6 h-12 w-full border-t border-border pt-3">
        <div className="h-3 w-1/2 rounded bg-sage" />
        <div className="mt-2 h-3 w-1/3 rounded bg-sage" />
      </div>
      <div className="mt-5 h-11 w-full rounded-lg bg-sage" />
    </div>
  );
}

export function LiveRescues() {
  const [filter, setFilter] = useState<RescueFilter>("All");
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();
  const visible = rescues.filter((rescue) => filter === "All" || rescue.category === filter);

  // A one-second loading preview. Replace this with your API's loading state later.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="live-rescues"
      aria-labelledby="rescues-heading"
      className="section-space bg-[#f5f6eb]"
    >
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <p className="eyebrow">GOOD FOOD, HAPPENING NOW</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cadbbe] bg-[#e9f0df] px-2 py-1 text-[9px] font-bold tracking-wider text-primary">
                  <PulseDot className="size-1.5 [&>span]:size-1.5" />
                  LIVE DEMO
                </span>
              </div>
              <h2 id="rescues-heading" className="section-title">
                Live Rescues Near You
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-[15px]">
                Food available right now in your city
              </p>
            </div>
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#dfe5d5] bg-card px-3.5 py-2 text-xs text-[#53634b]">
              <MapPin className="size-3.5 text-primary" />
              San Francisco, CA
            </div>
          </div>
        </Reveal>
        <div className="mb-7 mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter rescues by category"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-xs font-medium transition-colors focus-visible:outline-primary active:scale-95",
                  filter === item
                    ? "text-white"
                    : "border border-[#dfe5d5] bg-card text-[#5d6855] hover:border-primary/40 hover:bg-secondary",
                )}
              >
                <span className="relative z-10">{item === "All" ? "All Rescues" : item}</span>
                {filter === item && (
                  <motion.span
                    layoutId="rescue-filter"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">
            {loading
              ? "Finding good food nearby…"
              : `${visible.length} ${visible.length === 1 ? "rescue" : "rescues"} ready to make a difference`}
          </p>
        </div>
        <div aria-busy={loading} className="relative">
          <span className="sr-only" role="status">
            {loading ? "Loading demo rescue listings" : `${visible.length} demo listings loaded`}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <motion.div
                    key={index}
                    animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: index * 0.1 }}
                  >
                    <RescueSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {visible.length ? (
                  visible.map((rescue, index) => (
                    <RescueCard key={rescue.id} rescue={rescue} index={index} />
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl border border-dashed border-primary/25 bg-card p-12 text-center">
                    <SearchX className="mx-auto size-8 text-primary" />
                    <h3 className="mt-4 font-display text-lg font-semibold">
                      More good food is on the way.
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no {filter.toLowerCase()} rescues right now. Try another category.
                    </p>
                    <Button variant="outline" onClick={() => setFilter("All")} className="mt-5">
                      Show all rescues
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-7 flex items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />A preview of a kinder neighborhood. Listings
          are illustrative; demo claims do not reserve real food.
        </p>
        <Reveal className="mt-7 flex justify-center">
          <Button variant="ghost" asChild className="text-xs text-primary">
            <a href="#contact">
              <Leaf className="size-3.5" />
              Have surplus to share? List your food
              <ArrowRight />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
