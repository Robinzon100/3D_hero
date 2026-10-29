"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Heart,
  HeartHandshake,
  Leaf,
  MapPin,
  Store,
  Utensils,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter, PulseDot, Reveal, easeOut } from "@/components/motion";
import { heroStats } from "@/data/content";
import { useSite } from "@/components/site-provider";

function NeighborhoodMap() {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[550px] pb-7 pt-7 lg:pb-6 lg:pt-4">
      <div className="relative aspect-[1.13] overflow-hidden rounded-[30px] border-[6px] border-white/80 bg-[#e9eddf] shadow-[0_20px_65px_-32px_#405e3a70] sm:rounded-[36px]">
        <svg
          viewBox="0 0 560 500"
          className="absolute inset-0 h-full w-full"
          fill="none"
          role="img"
          aria-labelledby="neighborhood-map-title"
        >
          <title id="neighborhood-map-title">
            An illustrated neighborhood connecting restaurants, volunteers, and shelters
          </title>
          <defs>
            <pattern
              id="map-grid"
              width="112"
              height="94"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-24 280 250)"
            >
              <rect width="112" height="94" fill="#e9eddf" />
              <rect x="9" y="9" width="94" height="76" rx="8" fill="#e0e6d4" />
              <path d="M0 0H112M0 0V94" stroke="#fffef5" strokeWidth="12" />
              <path d="M57 8V84M10 47H102" stroke="#f6f7ec" strokeWidth="5" />
              <rect x="18" y="17" width="29" height="22" rx="3" fill="#d8e0cb" />
              <rect x="65" y="55" width="28" height="19" rx="3" fill="#d8e0cb" />
            </pattern>
            <filter id="pin-shadow" x="-80%" y="-60%" width="260%" height="260%">
              <feDropShadow
                dx="0"
                dy="5"
                stdDeviation="5"
                floodColor="#294b35"
                floodOpacity=".18"
              />
            </filter>
          </defs>
          <rect width="560" height="500" fill="url(#map-grid)" />
          <path
            d="M465-40C395 90 524 129 484 245S514 400 610 474"
            stroke="#d0e4de"
            strokeWidth="76"
          />
          <path
            d="M465-40C395 90 524 129 484 245S514 400 610 474"
            stroke="#e0eeea"
            strokeWidth="48"
          />
          <path d="M-30 335L580 75" stroke="#d7decc" strokeWidth="25" />
          <path d="M-30 335L580 75" stroke="#fffef5" strokeWidth="19" />
          <path d="M90-30L307 540" stroke="#fffef5" strokeWidth="16" />
          <path d="M-10 454L565 205" stroke="#fffef5" strokeWidth="14" />
          <g transform="rotate(-24 140 155)">
            <rect x="84" y="108" width="97" height="77" rx="15" fill="#c6d8b5" />
            <path
              d="M99 151H166M133 120V171"
              stroke="#e6efd9"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <g fill="#a7c391">
              <circle cx="108" cy="129" r="9" />
              <circle cx="157" cy="130" r="8" />
              <circle cx="109" cy="167" r="8" />
              <circle cx="157" cy="167" r="9" />
            </g>
          </g>
          <g transform="rotate(-24 379 360)">
            <rect x="335" y="328" width="95" height="64" rx="12" fill="#c6d8b5" />
            <path d="M346 360H419" stroke="#e6efd9" strokeWidth="6" strokeLinecap="round" />
            <g fill="#acc696">
              <circle cx="354" cy="344" r="7" />
              <circle cx="376" cy="377" r="8" />
              <circle cx="406" cy="344" r="8" />
            </g>
          </g>
          <g fill="#8b9981" fontSize="9" fontFamily="sans-serif" fontWeight="600" letterSpacing="2">
            <text x="100" y="246" transform="rotate(-24 100 246)">
              MISSION DISTRICT
            </text>
            <text x="347" y="119" transform="rotate(-24 347 119)">
              SOMA
            </text>
            <text x="282" y="443" transform="rotate(-24 282 443)">
              NOE VALLEY
            </text>
          </g>
          <path
            d="M195 209L249 185Q260 180 265 193L295 263Q300 275 313 270L371 245"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M195 209L249 185Q260 180 265 193L295 263Q300 275 313 270L371 245"
            stroke="#2D6A4F"
            strokeWidth="3"
            strokeDasharray="5 7"
            strokeLinecap="round"
          />
          <path
            d="M195 209L156 226Q145 230 150 242L177 306L237 281"
            stroke="#94ae84"
            strokeWidth="2.5"
            strokeDasharray="4 7"
            strokeLinecap="round"
          />
          <g transform="translate(310 169)">
            <circle r="15" fill="#fffef9" />
            <path
              d="M-5 0L-1 4L6-4"
              stroke="#2D6A4F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <div className="absolute left-[31%] top-[33%]">
          <motion.div
            animate={reduced ? {} : { y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-coral text-charcoal shadow-lg sm:size-14"
          >
            <Utensils className="size-5" />
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-white bg-coral" />
          </motion.div>
          <span className="absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold shadow-sm">
            Bella Roma
          </span>
        </div>
        <div className="absolute left-[67%] top-[49%]">
          <div className="relative flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white bg-forest text-white shadow-lg">
            <HeartHandshake className="size-5" />
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-white bg-forest" />
          </div>
          <span className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold shadow-sm">
            Shelter Hope
          </span>
        </div>
        <div className="absolute left-[43%] top-[59%] flex size-9 items-center justify-center rounded-full border-[3px] border-white bg-[#e4b766] text-[#62471f] shadow-md">
          <Leaf className="size-4" />
        </div>
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white bg-white/95 px-3 py-2 text-[10px] font-semibold text-primary shadow-sm">
          <PulseDot />6 rescues nearby
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-md bg-white/85 px-2 py-1 text-[9px] font-medium text-[#5d6c55]">
          <MapPin className="size-3" />
          San Francisco · Illustrative map
        </div>
      </div>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: easeOut }}
        className="absolute -left-1 bottom-0 w-[270px] rounded-2xl border border-[#e5e9dd] bg-white p-4 shadow-[0_12px_40px_-15px_#2b503733] sm:-left-5 sm:w-[300px] sm:p-5"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf3e7] text-primary">
            <HeartHandshake className="size-5" />
          </span>
          <div>
            <p className="text-[13px] font-semibold">Dinner is on its way.</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              A little surplus. A lot of good.
            </p>
          </div>
          <span className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-forest text-white">
            <Check className="size-3" />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px]">
          <span className="font-medium text-primary">23 meals shared</span>
          <span className="text-muted-foreground">1.2 km of kindness</span>
        </div>
      </motion.div>
      <motion.div
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-1 top-0 flex items-center gap-2 rounded-xl border border-[#e5e9dd] bg-white px-3 py-2.5 shadow-soft sm:-right-4 sm:top-0"
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-[#fff0e8] text-[#b8603e]">
          <Heart className="size-3.5 fill-current" />
        </span>
        <span className="text-[11px] font-medium">Good food. Greater good.</span>
      </motion.div>
    </div>
  );
}

const statIcons = {
  meals: Utensils,
  restaurants: Store,
  shelters: HeartHandshake,
  cities: Building2,
};

export function Hero() {
  const { openAction } = useSite();
  const reduced = useReducedMotion();
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-14 pt-[116px] md:pb-16 lg:pt-[145px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-20 size-[720px] rounded-full bg-[radial-gradient(ellipse,#dce9c65c_0%,transparent_68%)]"
      />
      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.07fr_1fr] lg:gap-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="max-w-[590px]"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9e3cb] bg-[#eff3e3] px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-primary">
              <Leaf className="size-3.5" />
              GOOD FOOD. GREATER GOOD.
            </div>
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.65rem,6.8vw,4.2rem)] font-semibold leading-[1.12] tracking-[-0.055em]"
            >
              Rescue Food.
              <br />
              Feed People.
              <br />
              <span className="relative inline-block text-forest">
                Zero Waste.
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full text-[#a5be83]"
                  viewBox="0 0 370 14"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10C100 0 239 1 365 7"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-8 max-w-[460px] text-[15px] leading-[1.85] text-muted-foreground sm:text-base">
              FoodBridge connects restaurants with surplus food to shelters and families in your
              city — before it hits the landfill.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="px-4 text-xs sm:px-6 sm:text-sm"
                onClick={() => openAction({ type: "list" })}
              >
                <Utensils />
                I&apos;m a Restaurant
                <ArrowRight className="hidden sm:block" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-4 text-xs sm:px-6 sm:text-sm"
                asChild
              >
                <a href="#live-rescues">
                  <Heart />I Need Food
                </a>
              </Button>
            </div>
            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-cream bg-[#d9e4cb] text-[9px] font-semibold text-[#4e643c]">
                  MR
                </span>
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-cream bg-[#efd9c6] text-[9px] font-semibold text-[#754b34]">
                  AC
                </span>
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-cream bg-[#dfd8e8] text-[9px] font-semibold text-[#6d577e]">
                  MT
                </span>
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-cream bg-forest text-white">
                  <Heart className="size-3" />
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Real people. Real impact.</span>
                <br />
                One neighborhood at a time.
              </p>
            </div>
          </motion.div>
          <NeighborhoodMap />
        </div>
        <Reveal className="mt-12 lg:mt-16" delay={0.1}>
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#e3e7d8] bg-white/75 py-2 shadow-[0_4px_24px_-18px_#2d6a4f30] md:grid-cols-4 md:py-6">
            {heroStats.map((stat, index) => {
              const Icon = statIcons[stat.icon];
              return (
                <div
                  key={stat.label}
                  className={`flex items-center justify-center gap-3 px-3 py-4 md:px-5 md:py-1 ${index > 0 ? "md:border-l md:border-[#e3e7d8]" : ""} ${index % 2 === 1 ? "border-l border-[#e3e7d8]" : ""} ${index > 1 ? "border-t border-[#e3e7d8] md:border-t-0" : ""}`}
                >
                  <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-[#eff3e8] text-primary sm:flex">
                    <Icon className="size-[18px]" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-display text-[26px] font-semibold leading-tight tracking-[-1px] text-forest lg:text-[30px]">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
            <ShieldCheck className="size-3" />A growing community, a shared purpose.{" "}
            <span className="hidden sm:inline">Illustrative impact figures.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
