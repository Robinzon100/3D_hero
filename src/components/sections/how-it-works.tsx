"use client";

import { ArrowRight, BellRing, ClipboardList, HeartHandshake, Leaf } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: ClipboardList,
    title: "List Surplus",
    description: "Restaurants post leftover meals with quantity, pickup time, and location.",
    detail: "A few taps. A fresh start.",
    color: "bg-[#eaf0df] text-[#477143]",
  },
  {
    icon: BellRing,
    title: "Match & Notify",
    description: "Nearby shelters and volunteers get notified instantly via the app.",
    detail: "The right food. The right people.",
    color: "bg-[#fff0dd] text-[#aa7432]",
  },
  {
    icon: HeartHandshake,
    title: "Pickup & Donate",
    description: "Volunteers pick up and deliver. You track impact in real time.",
    detail: "A small trip. A big difference.",
    color: "bg-[#fce7e0] text-[#b6604e]",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="section-space border-y border-[#e8eadc] bg-card"
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-3">LESS WASTE. MORE POSSIBILITY.</p>
          <h2 id="how-heading" className="section-title">
            How FoodBridge Works
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Good food already has a place in your community.
            <br className="hidden sm:block" /> We just help it get there.
          </p>
        </Reveal>
        <Stagger className="relative mt-11 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-7">
          <div
            aria-hidden="true"
            className="absolute left-[15%] right-[15%] top-[73px] hidden border-t-2 border-dashed border-[#d5deca] md:block"
          />
          {steps.map((step, index) => (
            <StaggerItem key={step.title} className="relative">
              <Card className="card-interactive relative h-full overflow-visible rounded-2xl p-1 shadow-none">
                <CardContent className="p-6 lg:p-7">
                  <div className="mb-7 flex items-center justify-between">
                    <span
                      className={`relative flex size-14 items-center justify-center rounded-2xl ${step.color}`}
                    >
                      <step.icon className="size-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-display text-[40px] font-semibold leading-none tracking-[-2px] text-[#78856d]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.6px]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
                    {step.description}
                  </p>
                  <p className="mt-5 text-[11px] font-medium text-primary">{step.detail}</p>
                </CardContent>
              </Card>
              {index < 2 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-[25px] top-[62px] z-10 hidden size-6 items-center justify-center rounded-full border border-[#d5deca] bg-card text-primary md:flex"
                >
                  <ArrowRight className="size-3" />
                </span>
              )}
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-9 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Leaf className="size-3.5 text-primary" />
          Simple for you. Meaningful for someone else.
        </Reveal>
      </div>
    </section>
  );
}
