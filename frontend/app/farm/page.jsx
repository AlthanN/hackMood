"use client";

import Farm from "@/components/worldComponents/farm";
import StatsHUD from "@/components/worldComponents/StatsHUD";

export default function FarmPage() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StatsHUD />
      <Farm />
    </div>
  );
}
