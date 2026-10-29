import Link from "next/link";
import { ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-md text-center">
        <Leaf className="mx-auto size-12 text-primary" strokeWidth={1.5} />
        <p className="eyebrow mt-7">404 · A SMALL DETOUR</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
          Let’s get you back to the good.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          This page isn’t on the map. There’s still plenty of good food and good company waiting for
          you.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft />
            Back to FoodBridge
          </Link>
        </Button>
      </div>
    </main>
  );
}
