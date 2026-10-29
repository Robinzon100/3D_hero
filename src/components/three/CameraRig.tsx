"use client";

import { useFrame } from "@react-three/fiber";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * clamp(amount);

export function CameraRig() {
  const progress = useScrollProgress();

  useFrame(({ camera }) => {
    const p = progress.current;
    let z = 8;
    let rotationY = 0;
    let rotationX = 0;

    if (p <= 0.2) {
      z = mix(8, 4, p / 0.2);
    } else if (p <= 0.4) {
      z = 4;
      rotationY = mix(0, Math.PI, (p - 0.2) / 0.2);
    } else if (p <= 0.6) {
      z = mix(4, 10, (p - 0.4) / 0.2);
      rotationY = Math.PI;
    } else if (p <= 0.8) {
      z = 10;
      rotationY = Math.PI;
      rotationX = mix(0, 0.5, (p - 0.6) / 0.2);
    } else {
      z = mix(10, 14, (p - 0.8) / 0.2);
      rotationY = Math.PI;
      rotationX = 0.5;
    }

    camera.position.z = z;
    camera.rotation.y = rotationY;
    camera.rotation.x = rotationX;
  });

  return null;
}
