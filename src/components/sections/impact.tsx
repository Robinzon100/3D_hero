"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Leaf, Quote, Store, Utensils, HeartHandshake } from "lucide-react";
import { Counter, Reveal, easeOut } from "@/components/motion";
import { impactStats, monthlyRescues } from "@/data/content";

const icons = { meals: Utensils, leaf: Leaf, restaurants: Store, shelters: HeartHandshake };

export function Impact() {
  const reduced = useReducedMotion();
  const max = 4000;
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="section-space relative overflow-hidden bg-charcoal text-[#f8f9ef]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-72 size-[700px] rounded-full border border-white/[0.035]"
      >
        <div className="absolute inset-16 rounded-full border border-white/[0.035]" />
        <div className="absolute inset-32 rounded-full border border-white/[0.035]" />
      </div>
      <div className="container-page relative">
        <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3 text-[#b9d79e]">SMALL ACTS. EXTRAORDINARY IMPACT.</p>
            <h2 id="impact-heading" className="section-title">
              Our Impact So Far
            </h2>
          </div>
          <p className="max-w-[340px] text-sm leading-relaxed text-[#a8aea4]">
            Behind every number is a plate filled,
            <br className="hidden md:block" /> a connection made, and a little less waste.
          </p>
        </Reveal>
        <div className="mb-12 mt-11 grid grid-cols-2 gap-x-5 gap-y-9 border-b border-white/10 pb-11 lg:grid-cols-4 lg:gap-8">
          {impactStats.map((stat, index) => {
            const Icon = icons[stat.icon];
            return (
              <Reveal key={stat.label} delay={index * 0.08}>
                <Icon className="mb-4 size-5 text-[#b9d79e]" strokeWidth={1.5} />
                <p className="font-display text-[36px] font-semibold leading-tight tracking-[-1.5px] sm:text-[44px]">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                </p>
                <p className="mt-2 text-xs text-[#a8aea4] sm:text-[13px]">{stat.label}</p>
              </Reveal>
            );
          })}
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          <Reveal>
            <figure aria-labelledby="chart-title" aria-describedby="chart-description">
              <div className="mb-7 flex items-center justify-between gap-3">
                <h3
                  id="chart-title"
                  className="font-display text-sm font-medium tracking-tight sm:text-base"
                >
                  Meals Rescued by Month
                </h3>
                <span className="flex items-center gap-1 rounded-full bg-[#2b3b2b] px-2.5 py-1 text-[10px] font-medium text-[#c0dca9]">
                  <ArrowUpRight className="size-3" />
                  Growing together
                </span>
              </div>
              <div
                className="relative h-[205px] sm:h-[220px]"
                role="img"
                aria-label="Meals rescued: May 1,200; June 1,550; July 1,750; August 2,100; September 2,600; October 3,200."
              >
                <div
                  className="absolute inset-x-0 bottom-7 top-5 flex flex-col justify-between"
                  aria-hidden="true"
                >
                  {[4000, 2000, 0].map((tick) => (
                    <div key={tick} className="flex items-center gap-3">
                      <span className="w-6 text-right text-[9px] text-[#899084]">
                        {tick === 0 ? "0" : `${tick / 1000}k`}
                      </span>
                      <span className="h-px flex-1 border-t border-dashed border-white/10" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-y-0 bottom-0 left-9 right-0 flex items-end justify-around gap-3 sm:gap-6">
                  {monthlyRescues.map((month, index) => (
                    <div
                      key={month.month}
                      className="group relative flex h-full w-full max-w-14 flex-col items-center justify-end"
                    >
                      <div className="relative flex h-[157px] w-full items-end justify-center sm:h-[172px]">
                        <span className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[#f4f7ec] px-1.5 py-0.5 text-[9px] font-semibold text-forest opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                          {month.meals.toLocaleString("en-US")}
                        </span>
                        <motion.div
                          className="w-full max-w-11 origin-bottom rounded-t-[5px] bg-[#8eb879] transition-colors group-hover:bg-[#bddda7]"
                          style={{
                            height: `${(month.meals / max) * 100}%`,
                            opacity: 0.62 + index * 0.076,
                          }}
                          initial={reduced ? false : { scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: index * 0.09, ease: easeOut }}
                        />
                      </div>
                      <span className="mt-3 flex h-4 items-center text-[10px] text-[#a8aea4]">
                        {month.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <figcaption
                id="chart-description"
                className="mt-5 flex items-center gap-2 text-[10px] text-[#a8aea4]"
              >
                <span className="size-2 rounded-sm bg-[#8eb879]" />
                May – October 2026 <span className="ml-auto">Every month, a little more good.</span>
              </figcaption>
              <table className="sr-only">
                <caption>Meals rescued by month, illustrative data</caption>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Meals</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRescues.map((month) => (
                    <tr key={month.month}>
                      <th scope="row">{month.fullMonth}</th>
                      <td>{month.meals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </Reveal>
          <Reveal
            delay={0.15}
            className="flex flex-col justify-center border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
          >
            <Quote className="mb-5 size-8 fill-[#b9d79e]/15 text-[#b9d79e]" strokeWidth={1.2} />
            <blockquote className="font-display text-[20px] font-normal leading-[1.65] tracking-[-0.4px] text-[#eef2e6]">
              “FoodBridge doesn’t just bring us meals. It brings our community the feeling that
              someone cares.”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#3b4935] text-xs font-semibold text-[#d3e4c5]">
                MT
              </span>
              <div>
                <p className="text-xs font-semibold">Maya Thompson</p>
                <p className="mt-1 text-[11px] text-[#a8aea4]">Director, Shelter Hope</p>
              </div>
            </div>
          </Reveal>
        </div>
        <p className="mt-9 text-[10px] text-[#899084]">
          Illustrative community impact. Real change starts with people like you.
        </p>
      </div>
    </section>
  );
}
