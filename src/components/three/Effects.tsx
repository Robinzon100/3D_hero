"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

export function Effects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom intensity={0.3} luminanceThreshold={0.8} />
    </EffectComposer>
  );
}
