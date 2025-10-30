import { Navbar } from "@/components/Navbar";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { CartProvider } from "@/contexts/CartContext";

const Materials = () => {
  const materials = [
    {
      title: "Aluminum Ladder",
      category: "Equipment",
      condition: "Used",
      price: "$45",
      location: "Harare Central",
      distance: "2.3 km",
      rating: 4.8,
      co2Saved: "15 kg",
      imageUrl: "/images/materials/aluminium-ladder.jpg",
    },
    {
      title: "Wheelbarrow",
      category: "Equipment",
      condition: "Good",
      price: "$35",
      location: "Mbare",
      distance: "5.1 km",
      rating: 4.7,
      co2Saved: "10 kg",
      imageUrl: "/images/materials/wheelbarrow.jpg",
    },
    {
      title: "Tool Belt",
      category: "Safety Gear",
      condition: "Like New",
      price: "$20",
      location: "Borrowdale",
      distance: "7.8 km",
      rating: 4.9,
      co2Saved: "3 kg",
      imageUrl: "/images/materials/tool-belt.jpg",
    },
    {
      title: "Safety Helmet",
      category: "Safety Gear",
      condition: "New",
      price: "$15",
      location: "Avondale",
      distance: "4.2 km",
      rating: 5.0,
      co2Saved: "2 kg",
      imageUrl: "/images/materials/safety-helmet.jpg",
    },
    {
      title: "Scaffolding Section",
      category: "Equipment",
      condition: "Used",
      price: "$80",
      location: "Mount Pleasant",
      distance: "3.5 km",
      rating: 4.6,
      co2Saved: "25 kg",
      imageUrl: "/images/materials/scaffolding.jpg",
    },
    {
      title: "Concrete Mixer",
      category: "Machinery",
      condition: "Good",
      price: "$120",
      location: "Eastlea",
      distance: "6.2 km",
      rating: 4.8,
      co2Saved: "35 kg",
      imageUrl: "/images/materials/concrete-mixer.jpg",
    },
    {
      title: "Power Drill Set",
      category: "Tools",
      condition: "Like New",
      price: "$60",
      location: "Waterfalls",
      distance: "4.9 km",
      rating: 4.9,
      co2Saved: "8 kg",
      imageUrl: "/images/materials/power-drill.jpg",
    },
    {
      title: "Measuring Tape",
      category: "Tools",
      condition: "New",
      price: "$8",
      location: "Norton",
      distance: "8.1 km",
      rating: 4.7,
      co2Saved: "1 kg",
      imageUrl: "/images/materials/measuring-tape.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Tools & Equipment for Construction
              </h1>
              <p className="text-muted-foreground">
                Quality tools and equipment at affordable prices
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search materials..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Materials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material, index) => (
                <MaterialCard key={index} id={`mat-${index + 1}`} {...material} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2025 RubbleReuse. Building a sustainable future, one brick at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Materials;
