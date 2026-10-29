import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl",
          light ? "bg-white/10 text-[#c5dfac]" : "bg-forest text-cream",
        )}
      >
        <Leaf className="size-5 -rotate-12" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span
        className={cn(
          "font-display text-[23px] font-semibold tracking-[-1.1px]",
          light ? "text-white" : "text-[#214c38]",
        )}
      >
        Food<span className={light ? "text-[#c5dfac]" : "text-forest"}>Bridge</span>
      </span>
    </span>
  );
}
