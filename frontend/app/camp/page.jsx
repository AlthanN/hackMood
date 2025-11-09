"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Camp from "@/components/worldComponents/camp";
import StatsHUD from "@/components/worldComponents/StatsHUD";
import { OrbitControls } from "@react-three/drei";

export default function CampPage() {
  const router = useRouter();

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StatsHUD />
      <Canvas
        camera={{ position: [-1.2, 0.3, 5], fov: 75 }}
        shadows
        gl={{ alpha: false }}
      >
        <Camp />
      </Canvas>
    </div>
  );
}
