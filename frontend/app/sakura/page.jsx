"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Sakura from "@/components/worldComponents/sakura";
import { OrbitControls } from "@react-three/drei";

export default function SakuraPage() {
  const router = useRouter();

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Canvas
        camera={{
          position: [12, 3, -20], // [x, y, z] - Change these values
          fov: 75,
        }}
      >
        <Sakura />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
