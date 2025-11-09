"use client";

import { Canvas } from "@react-three/fiber";
import Sakura from "@/components/worldComponents/sakura";
import StatsHUD from "@/components/worldComponents/StatsHUD";
import { OrbitControls } from "@react-three/drei";

export default function SakuraPage() {

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StatsHUD />
      <Canvas
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
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
