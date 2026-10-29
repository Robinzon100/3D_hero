"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "@/components/three/CameraRig";
import { Effects } from "@/components/three/Effects";
import { FoodItems } from "@/components/three/FoodItems";
import { Globe } from "@/components/three/Globe";

export default function Scene({ onCreated }: { onCreated: () => void }) {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Canvas
      dpr={mobile ? [1, 1] : [1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "low-power" }}
      onCreated={onCreated}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#0A1F0A"]} />
      <fog attach="fog" args={["#0A1F0A", 5, 25]} />
      <ambientLight intensity={0.4} color="#FEFAE0" />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFFFFF" />
      <pointLight position={[-3, 2, -3]} intensity={0.5} color="#2D6A4F" />
      <Globe />
      <FoodItems mobile={mobile} />
      <CameraRig />
      <Effects enabled={!mobile} />
    </Canvas>
  );
}
