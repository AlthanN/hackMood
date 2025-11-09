export default function About() {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: "var(--hero-background)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Your Music Deserves a World</h2>
            <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
              MoodScape transforms your unique music taste into personalized 3D environments. The jazz lounge you see
              is just the beginning—discover your perfect soundscape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="border border-foreground/10 rounded-lg p-8  hover:border-accent/50 transition"
              style={{ backgroundColor: "#F3D5A5" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--nav-background)" }}
              >
                <span className="text-xl">🎵</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#543111" }}>
                AI-Powered Analysis
              </h3>
              <p style={{ color: "#543111", opacity: 0.85 }}>
                Our advanced AI analyzes your music preferences and creates a bespoke environment that reflects your
                sound.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="border border-foreground/10 rounded-lg p-8 hover:border-accent/50 transition"
              style={{ backgroundColor: "#F3D5A5" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--nav-background)" }}
              >
                <span className="text-xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#543111" }}>
                Multiple Worlds
              </h3>
              <p style={{ color: "#543111", opacity: 0.85 }}>
                From jazz lounges to cyberpunk cities and enchanted forests—each genre gets its perfect environment.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="border border-foreground/10 rounded-lg p-8 hover:border-accent/50 transition"
              style={{ backgroundColor: "#F3D5A5" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--nav-background)" }}
              >
                <span className="text-xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: "#543111" }}>
                Custom Avatars
              </h3>
              <p style={{ color: "#543111", opacity: 0.85 }}>
                Create a personalized avatar and inhabit your musical world. Your presence, your rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
