"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const features = [
  {
    image: "/iconimage/location-removebg-preview.png",
    title: "Location-Based Search",
    description:
      "Find materials near you with our interactive map and radius filters.",
  },
  {
    image: "/iconimage/verified-removebg-preview.png",
    title: "Verified Suppliers",
    description:
      "Trust our rating system with verified profiles and transaction history.",
  },
  {
    image: "/iconimage/Metrics1.png",
    title: "Sustainability Metrics",
    description:
      "Track your environmental impact with CO₂ savings and waste diverted.",
  },
  {
    image: "/iconimage/pricing-removebg-preview.png",
    title: "Smart Pricing",
    description:
      "Get fair market prices with transparent listings and negotiations.",
  },
  {
    image: "/iconimage/quick-removebg-preview.png",
    title: "Quick Pickup",
    description:
      "Schedule pickups instantly or arrange delivery with our partners.",
  },
  {
    image: "/iconimage/assured-removebg-preview.png",
    title: "Quality Assured",
    description:
      "Detailed photos, condition ratings, and material specifications.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
            <span></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Why Choose RubbleReuse?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A complete platform designed for the circular construction economy, connecting suppliers and buyers while reducing waste and environmental impact.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-105 opacity-0 animate-fade-up cursor-pointer overflow-hidden"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <CardHeader className="relative z-10 pb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl bg-white/80 backdrop-blur-sm">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      // Fallback for broken images
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </CardDescription>

                {/* Interactive arrow indicator */}
                <div className="mt-6 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="flex items-center gap-2 text-primary font-medium">
                  
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

