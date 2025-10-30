import { Navbar } from "@/components/Navbar";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const NonMaterials = () => {
  const materials = [
    {
      title: "River Sand",
      category: "Sand",
      condition: "New",
      price: "$25",
      location: "Harare",
      distance: "3.2 km",
      rating: 4.8,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/River-sand.jpg",
    },
    {
      title: "Red Clay Bricks",
      category: "Bricks",
      condition: "New",
      price: "$0.35",
      location: "Mbare",
      distance: "4.5 km",
      rating: 4.9,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/RedClay-bricks.jpg",
    },
    {
      title: "Crushed Stones",
      category: "Aggregate",
      condition: "New",
      price: "$30",
      location: "Borrowdale",
      distance: "6.8 km",
      rating: 4.7,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/Crushed-stone.jpg",
    },
    {
      title: "Cement Bags",
      category: "Cement",
      condition: "New",
      price: "$8.50",
      location: "Avondale",
      distance: "2.1 km",
      rating: 5.0,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/Cement-bags.jpg",
    },
    {
      title: "Roofing Tiles",
      category: "Tiles",
      condition: "New",
      price: "$2.50",
      location: "Mount Pleasant",
      distance: "5.3 km",
      rating: 4.8,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/Roofing-tiles.jpg",
    },
    {
      title: "Paving Tiles",
      category: "Tiles",
      condition: "New",
      price: "$4.00",
      location: "Eastlea",
      distance: "4.7 km",
      rating: 4.6,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/Paving-tiles.jpg",
    },
    {
      title: "Cement Tiles",
      category: "Tiles",
      condition: "New",
      price: "$3.20",
      location: "Waterfalls",
      distance: "7.2 km",
      rating: 4.7,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/Cement-tiles.jpg",
    },
    {
      title: "Quarry Dust",
      category: "Aggregate",
      condition: "New",
      price: "$18",
      location: "Norton",
      distance: "8.5 km",
      rating: 4.5,
      co2Saved: "0 kg",
      imageUrl: "/images/materials/Quarry-dust.jpg",
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
                Building Materials/ Raw Materials 
              </h1>
              <p className="text-muted-foreground">
                Essential building materials like bricks, sand, stones, and rubble
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
                <MaterialCard key={index} id={`nonmat-${index + 1}`} {...material} />
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

export default NonMaterials;
