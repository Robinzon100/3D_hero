"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow">A SMALL BUMP IN THE ROAD</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          Let’s give that another try.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Something didn’t load as expected. Please try again.
        </p>
        <Button onClick={reset} className="mt-7">
          <RefreshCw />
          Try again
        </Button>
      </div>
    </main>
  );
}
