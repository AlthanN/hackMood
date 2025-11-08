"use client"

import { useState } from "react"
import Link from "next/link"

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const worlds = [
    {
      name: "Jazz Lounge",
      genre: "Jazz / Blues",
      color: "from-blue-900 to-amber-900",
      emoji: "🎺",
      path: "/farm",
    },
    {
      name: "Cyber City",
      genre: "EDM / Electronic",
      color: "from-purple-900 to-pink-900",
      emoji: "🌆",
      path: "/cyber-city",
    },
    {
      name: "Enchanted Forest",
      genre: "Indie / Folk",
      color: "from-green-900 to-emerald-900",
      emoji: "🌲",
      path: "/enchanted-forest",
    },
    {
      name: "Grand Concert Hall",
      genre: "Classical",
      color: "from-yellow-900 to-red-900",
      emoji: "🎼",
      path: "/concert-hall",
    },
  ]

  const handleNavigate = (path) => {
    window.location.href = path
  }

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center text-balance">
            Discover Your World
          </h2>
          <p className="text-foreground/60 text-center max-w-2xl mx-auto">
            See what worlds await you based on your musical preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {worlds.map((world, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-gradient-to-br ${world.color} rounded-lg overflow-hidden border border-foreground/10 hover:border-accent/50 transition-all duration-300 group cursor-pointer transform ${
                hoveredIndex === index
                  ? "scale-105 shadow-2xl shadow-accent/20"
                  : "hover:shadow-lg shadow-background/50"
              }`}
            >
              <div className="aspect-video flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300`}
                />
                <span className="relative z-10">{world.emoji}</span>
              </div>
              <div
                className={`p-6 bg-background/80 backdrop-blur transition-all duration-300 ${
                  hoveredIndex === index ? "bg-background/90" : ""
                }`}
              >
                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {world.name}
                </h3>
                <p className="text-foreground/60 text-sm group-hover:text-foreground/80 transition-colors">
                  {world.genre}
                </p>
                {hoveredIndex === index && (
                  <button 
                    onClick={() => handleNavigate(world.path)}
                    className="mt-3 px-4 py-2 bg-accent text-background rounded-lg text-sm font-semibold hover:bg-accent/90 transition animate-slide-up"
                  >
                    Explore World
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}