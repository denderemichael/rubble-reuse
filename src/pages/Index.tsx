import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const featuredMaterials = [
    {
      id: "1",
      title: "Premium Red Clay Bricks",
      category: "Bricks",
      condition: "New",
      price: "$0.45",
      location: "Harare Central",
      distance: "2.3 km",
      rating: 4.8,
      co2Saved: "12 kg",
      seller: "John Doe",
      contact: "078-123-4567",
      description: "High-quality red clay bricks, perfect for wall construction.",
      imageUrl: "/images/materials/RedClay-bricks.jpg",
    },
    {
      id: "2",
      title: "Portland Cement Bags",
      category: "Cement",
      condition: "Like New",
      price: "$7.00",
      location: "Mbare",
      distance: "5.1 km",
      rating: 4.9,
      co2Saved: "8 kg",
      seller: "Mary Smith",
      contact: "077-555-2345",
      description: "Premium Portland cement, 50kg bags, stored properly.",
      imageUrl: "/images/materials/Cement-bags.jpg",
    },
    {
      id: "3",
      title: "Steel Rebar Offcuts",
      category: "Metal",
      condition: "Used",
      price: "Free",
      location: "Borrowdale",
      distance: "7.8 km",
      rating: 4.6,
      co2Saved: "25 kg",
      seller: "Peter Johnson",
      contact: "078-987-6543",
      description: "Rebar offcuts suitable for smaller construction projects.",
      imageUrl: "/images/materials/Steel-reinforcement.jpg",
    },
    {
      id: "4",
      title: "Ceramic Floor Tiles",
      category: "Tiles",
      condition: "New",
      price: "$12.50",
      location: "Avondale",
      distance: "4.2 km",
      rating: 5.0,
      co2Saved: "15 kg",
      seller: "Alice Brown",
      contact: "077-888-1122",
      description: "High-quality ceramic floor tiles, 30x30 cm, gloss finish.",
      imageUrl: "/images/materials/Ceramic-tiles.jpg",
    },
  ];

  // Modal State
  const [modalMaterial, setModalMaterial] = useState<any>(null);
  const [modalType, setModalType] = useState<"details" | "contact" | null>(null);

  const openModal = (material: any, type: "details" | "contact") => {
    setModalMaterial(material);
    setModalType(type);
  };

  const closeModal = () => {
    setModalMaterial(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />

      {/* Featured Materials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Featured Materials
              </h2>
              <p className="text-muted-foreground">
                Fresh listings from verified suppliers near you
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex"
              onClick={() => navigate("/marketplace")}
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                {...material}
              />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/marketplace")}
            >
              View All Materials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalMaterial && modalType && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-background rounded-xl shadow-lg max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
              onClick={closeModal}
            >
              ✕
            </button>

            {modalType === "details" && (
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{modalMaterial.title}</h3>
                <p><strong>Category:</strong> {modalMaterial.category}</p>
                <p><strong>Condition:</strong> {modalMaterial.condition}</p>
                <p><strong>Price:</strong> {modalMaterial.price}</p>
                <p>
                  <strong>Location:</strong> {modalMaterial.location} (
                  {modalMaterial.distance})
                </p>
                <p><strong>CO₂ Saved:</strong> {modalMaterial.co2Saved}</p>
                <p className="mt-2">{modalMaterial.description}</p>
              </div>
            )}

            {modalType === "contact" && (
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{modalMaterial.seller}</h3>
                <p><strong>Phone:</strong> {modalMaterial.contact}</p>
                <p><strong>Location:</strong> {modalMaterial.location}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of contractors, builders, and sustainability
              champions turning construction waste into opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>
              © 2025 RubbleReuse. Building a sustainable future, one brick at a
              time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
