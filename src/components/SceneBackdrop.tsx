"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

export function SceneBackdrop() {
  const [loaded, setLoaded] = useState(false);
  const markLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene onCreated={markLoaded} />
        </Suspense>
      </div>
      <LoadingScreen loaded={loaded} />
    </>
  );
}
