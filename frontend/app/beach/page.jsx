"use client";

import Beach from "@/components/worldComponents/beach";
import StatsHUD from "@/components/worldComponents/StatsHUD";

export default function BeachPage() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <StatsHUD />
      <Beach />
    </div>
  );
}