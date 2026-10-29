"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function Globe() {
  const globe = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.12;
  });

  return (
    <group>
      <mesh ref={globe} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#2D6A4F" wireframe />
      </mesh>
      <mesh scale={1.04}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#52B788" transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}
