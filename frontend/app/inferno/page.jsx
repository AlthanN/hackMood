"use client";

import InfernoScene from "@/components/worldComponents/inferno";
import StatsHUD from "@/components/worldComponents/StatsHUD";

export default function InfernoPage() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StatsHUD />
      <InfernoScene />
    </div>
  );
}
