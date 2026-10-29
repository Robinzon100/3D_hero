"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let registered = false;

export function createSmoothScroll() {
  if (typeof window === "undefined") return () => undefined;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  const lenis = new Lenis({ lerp: 0.1 });
  const onTick = (time: number) => lenis.raf(time * 1000);
  const onScroll = () => ScrollTrigger.update();

  lenis.on("scroll", onScroll);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.defaults({ scroller: document.body });
  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(onTick);
    lenis.off("scroll", onScroll);
    lenis.destroy();
  };
}
