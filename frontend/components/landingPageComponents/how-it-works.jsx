export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Music",
      description: "Tell us about your music taste by logging into your Spotify account",
    },
    {
      number: "02",
      title: "Creating Your World",
      description: "Our algorithm will parse through your most listened songs to connect you to a unique environment",
    },
    {
      number: "03",
      title: "Explore & Enjoy",
      description: "Enter your environment and explore into your own musical world!",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-16">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="text-6xl font-serif font-bold text-accent/20 mb-4">{step.number}</div>

              {/* Step content */}
              <div className="bg-background border border-foreground/10 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/60">{step.description}</p>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-accent/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
