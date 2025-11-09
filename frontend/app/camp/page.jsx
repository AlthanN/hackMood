"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Camp from "@/components/worldComponents/camp";
import FirstPersonControls from "./FirstPersonControls";
import StatsHUD from "@/components/worldComponents/StatsHUD";

export default function CampPage() {
  const router = useRouter();

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StatsHUD />
      {/* Back Button */}
      <button
        onClick={() => router.push("/")} // Change "/" to wherever you want to go back to
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          color: "#000000", // <-- ADD THIS for black text
        }}
      >
        ← Back to Home
      </button>

      <Canvas
        camera={{ position: [-1.2, 0.3, 5], fov: 75 }}
        shadows
        gl={{ alpha: false }}
      >
        <Camp />
        <FirstPersonControls />
      </Canvas>
    </div>
  );
}
