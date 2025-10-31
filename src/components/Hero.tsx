import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, TrendingDown, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ Import your hero images directly
import hero1 from "/image/Hero1.jpg";
import hero2 from "/image/Hero2.jpg";
import hero3 from "/image/Hero3.jpg";

const heroImages = [hero1, hero2, hero3];

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  // ✅ Auto-change carousel image every 4 seconds with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % heroImages.length);
        setFade(true); // fade-in next image
      }, 500); // half-second fade transition
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8 animate-slide-up">
            <Badge className="bg-secondary text-secondary-foreground">
              🌍 Sustainable Construction Marketplace
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Turn Construction{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Waste into Value
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground">
              Connect suppliers and buyers of surplus construction materials.
              Reduce waste, save money, and build a sustainable future.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-gradient-primary text-lg"
                onClick={() => navigate("/marketplace")}
              >
                Browse Materials
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-primary">
                  <TrendingDown className="h-6 w-6" /> 50K+
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Tonnes Diverted
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-secondary">
                  <Users className="h-6 w-6" /> 1,200+
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Active Users
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-accent">
                  <Leaf className="h-6 w-6" /> 95K
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  CO₂ Saved (kg)
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Image Carousel */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border animate-scale-in">
            <img
              key={current}
              src={heroImages[current]}
              alt={`Hero ${current + 1}`}
              className={`w-full h-[400px] object-cover rounded-2xl transition-opacity duration-700 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
