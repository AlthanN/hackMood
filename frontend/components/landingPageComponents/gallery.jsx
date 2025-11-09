"use client";

import { useState } from "react";
import Link from "next/link";

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const worlds = [
    {
      name: "Sunset Ranch",
      genre: "Country / Folk",
      color: "#FFFFE0",
      hoverColor: "#8B7355", // Brown/tan for countryside
      backgroundImage: "/web_assets/farmBlur.png",
      path: "/farm",
    },
    {
      name: "Paradise Cove",
      genre: "Happy / Energetic",
      color: "#FFFFFF",
      hoverColor: "#0EA5E9", // Ocean blue
      backgroundImage: "/web_assets/beachBlur.png", 
      path: "/beach",
    },
    {
      name: "Quiet Woods",
      genre: "Calm / Lo-Fi",
      color: "#FFFFFF",
      hoverColor: "#22C55E", // Forest green
      backgroundImage: "/web_assets/campBlur.png", 
      path: "/camp",
    },
    {
      name: "Gloomy Ville",
      genre: "Sad / Blues",
      color: "#FFFFFF",
      hoverColor: "#6B7280", // Gray
      backgroundImage: "/web_assets/demoFarmBlur.png", 
      path: "/concert-hall",
    },
    {
      name: "Sakura",
      genre: "Love",
      color: "from-yellow-900 to-red-900",
      emoji: "🎼",
      path: "/sakura",
    },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  };

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
              className={`bg-gradient-to-br ${
                world.color
              } rounded-lg overflow-hidden border border-foreground/10 hover:border-accent/50 transition-all duration-300 group cursor-pointer transform ${
                hoveredIndex === index
                  ? "scale-105 shadow-2xl shadow-accent/20"
                  : "hover:shadow-lg shadow-background/50"
              }`}
            >
              <div 
                className="aspect-video flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden"
                style={{
                  backgroundImage: `url(${world.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Optional gradient overlay (can remove if not needed) */}
                <div className={`absolute inset-0 opacity-40 group-hover:opacity-30 transition-opacity duration-300`} 
                     style={{ backgroundColor: world.color }} />
                
                <div
                  className={`absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300`}
                />
              </div>
              <div
                className={`p-6 bg-background/80 backdrop-blur transition-all duration-300 ${
                  hoveredIndex === index ? "bg-background/90" : ""
                }`}
              >
                <h3 
                  className="text-xl font-semibold mb-1 transition-colors duration-300"
                  style={{ color: hoveredIndex === index ? world.hoverColor : 'var(--foreground)' }}
                >
                  {world.name}
                </h3>
                <p 
                  className="text-sm transition-colors duration-300"
                  style={{ color: hoveredIndex === index ? world.hoverColor : 'rgb(var(--foreground) / 0.6)' }}
                >
                  {world.genre}
                </p>
                {hoveredIndex === index && (
                  <button
                    onClick={() => handleNavigate(world.path)}
                    className="cursor-pointer mt-3 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition animate-slide-up text-white"
                    style={{ backgroundColor: world.hoverColor }}
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
  );
}
