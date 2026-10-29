"use client";

import { Float } from "@react-three/drei";
import { useMemo } from "react";

const goldenAngle = 2.399;

export function FoodItems({ mobile = false }: { mobile?: boolean }) {
  const items = useMemo(
    () =>
      Array.from({ length: mobile ? 6 : 10 }, (_, index) => {
        const angle = index * goldenAngle;
        const radius = 4.25 + (index % 2) * 0.5;
        return {
          index,
          position: [
            radius * Math.cos(angle),
            (index % 3 - 1) * 0.8,
            radius * Math.sin(angle),
          ] as [number, number, number],
        };
      }),
    [mobile],
  );

  return (
    <group>
      {items.map(({ index, position }) => (
        <Float key={index} speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
          <mesh position={position} castShadow>
            {index < 3 ? (
              <sphereGeometry args={[0.4, 24, 24]} />
            ) : index < 6 ? (
              <cylinderGeometry args={[0.3, 0.3, 0.5, 24]} />
            ) : index < 8 ? (
              <boxGeometry args={[0.4, 0.4, 0.4]} />
            ) : (
              <coneGeometry args={[0.3, 0.6, 24]} />
            )}
            <meshStandardMaterial
              color={
                index < 3 ? "#FF6B6B" : index < 6 ? "#FEFAE0" : index < 8 ? "#1B4332" : "#52B788"
              }
              roughness={0.45}
              metalness={0.05}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
