"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Camp from "@/components/worldComponents/camp";
import { OrbitControls } from "@react-three/drei";

export default function CampPage() {
  const router = useRouter();

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Back Button */}

      <Canvas>
        <Camp />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 0, 3]}
        />
      </Canvas>
    </div>
  );
}
