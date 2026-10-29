"use client";

import {
  ArrowRight,
  Flower2,
  HeartHandshake,
  Leaf,
  Sprout,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { useSite } from "@/components/site-provider";

const partners = [
  {
    name: "GreenLeaf",
    sub: "CAFÉ",
    icon: Leaf,
    className: "text-[#52794b]",
    font: "font-display font-semibold tracking-[-0.8px]",
  },
  {
    name: "urban harvest",
    sub: "FARM TO COMMUNITY",
    icon: Sprout,
    className: "text-[#7d6935]",
    font: "font-display font-medium tracking-[-0.9px]",
  },
  {
    name: "Shelter Hope",
    sub: "A PLACE TO BELONG",
    icon: HeartHandshake,
    className: "text-[#7a6794]",
    font: "font-display font-semibold tracking-[-0.9px]",
  },
  {
    name: "CITY FOODS",
    sub: "GOOD FOOD FOR EVERYONE",
    icon: UtensilsCrossed,
    className: "text-[#99573d]",
    font: "font-display font-bold tracking-[-0.7px]",
  },
  {
    name: "FreshStart",
    sub: "A FRESH WAY FORWARD",
    icon: Flower2,
    className: "text-[#427561]",
    font: "font-display font-semibold tracking-[-1px]",
  },
  {
    name: "the daily crust",
    sub: "YOUR NEIGHBORHOOD BAKERY",
    icon: Wheat,
    className: "text-[#846339]",
    font: "font-display font-medium tracking-[-0.9px]",
  },
];

export function Partners() {
  const { openAction } = useSite();
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="border-b border-[#e8eadc] bg-card py-14 md:py-20"
    >
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">A SHARED TABLE. A STRONGER COMMUNITY.</p>
          <h2
            id="partners-heading"
            className="font-display text-[28px] font-semibold tracking-[-1px]"
          >
            Trusted By
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Local heroes turning everyday surplus into everyday good.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 items-center gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <div
                tabIndex={0}
                role="img"
                aria-label={`${partner.name}, illustrative partner`}
                className={`group flex min-h-16 cursor-default flex-col items-center justify-center gap-1 rounded-lg text-center grayscale transition-[filter,transform] duration-300 hover:scale-105 hover:grayscale-0 focus:grayscale-0 ${partner.className}`}
              >
                <div
                  className={`flex items-center gap-1.5 text-[16px] xl:text-[17px] ${partner.font}`}
                >
                  <partner.icon className="size-5 shrink-0" strokeWidth={1.6} />
                  <span>{partner.name}</span>
                </div>
                <span className="text-[6.5px] font-semibold tracking-[0.16em]">{partner.sub}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <button
            type="button"
            onClick={() => openAction({ type: "list" })}
            className="group inline-flex items-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-primary transition-colors hover:text-[#17432e]"
          >
            Become a Partner
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Illustrative partners. Real possibilities.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
