"use client"

import { useRef } from "react"

export default function Hero3D({ onCreateWorld }) {
  const containerRef = useRef(null)
  return (
    <section
      className="relative w-full h-screen overflow-hidden pt-16"
      style={{ backgroundColor: "#FFF4DB" }}
    >
      <div ref={containerRef} className="w-full h-full" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-6 animate-fade-in pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#3C2A21] text-balance leading-tight">
            Your Music. Your World. Your Avatar.
          </h1> 
          <p className="text-lg md:text-xl text-[#3C2A21] max-w-2xl mx-auto text-balance">
            Step into an immersive 3D environment crafted uniquely for your sound. Every groove, every beat, visualized.
          </p>
          <div className="flex gap-4 justify-center pt-4 ">
            <button
              onClick={onCreateWorld}
              className="px-8 py-3 hover:scale-110 rounded-lg font-semibold transition cursor-pointer pointer-events-auto"
              style={{ backgroundColor: "#79B76B", color: "#FFFFFF" }}
            >
              Create Your World
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
