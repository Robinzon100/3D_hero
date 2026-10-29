"use client";

import { useEffect } from "react";
import { createSmoothScroll } from "@/lib/scroll";

export function LenisProvider() {
  useEffect(() => createSmoothScroll(), []);
  return null;
}
