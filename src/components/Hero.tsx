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
    <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
      {/* Background Image Overlay - Changing */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${heroImages[current]})` }}
      ></div>
      {/* Black Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-green-400">Transform Construction</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Waste into Resource
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover surplus materials from local projects. Save costs, minimize environmental impact, and support circular economy in construction.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
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
              className="border-white text-white bg-white/10 hover:bg-white/20"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
