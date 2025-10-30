"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Leaf, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface MaterialCardProps {
  id?: string;
  title: string;
  category: string;
  condition: string;
  price: string;
  location: string;
  distance: string;
  rating: number;
  co2Saved: string;
  coordinates?: number[];
  imageUrl?: string;
}

export const MaterialCard = ({
  id,
  title,
  category,
  condition,
  price,
  location,
  distance,
  rating,
  co2Saved,
  imageUrl,
}: MaterialCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const itemId = id || `${title}-${category}-${location}`.replace(/\s+/g, '-').toLowerCase();
    addToCart({
      id: itemId,
      title,
      category,
      condition,
      price,
      location,
      distance,
      rating,
      co2Saved,
    });
  };

  return (
    <>
      {/* Material Card */}
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
        {/* Image */}
        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-primary opacity-10 group-hover:opacity-20 transition-opacity" />
          )}
          <div className="absolute top-4 right-4">
            <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
              {category}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="gap-1">
              <Leaf className="h-3 w-3" />
              {co2Saved} CO₂ saved
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <Badge variant="outline" className="shrink-0">
              {condition}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{location}</span>
            <span className="text-xs">• {distance}</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">{price}</p>
              <p className="text-xs text-muted-foreground">per unit</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowDetails(true)}
          >
            Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className="px-3"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button
            className="flex-1 bg-gradient-primary"
            onClick={() => setShowContact(true)}
          >
            Contact
          </Button>
        </CardFooter>
      </Card>

      {/* Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-background rounded-xl shadow-xl w-[90%] max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
              type="button"
              aria-label="Close details modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Condition:</strong> {condition}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Distance:</strong> {distance}</p>
            <p><strong>CO₂ Saved:</strong> {co2Saved}</p>
            <p><strong>Rating:</strong> {rating} ⭐</p>
          </div>
        </div>
      )}

      {/* Contact Seller Modal */}
      {showContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setShowContact(false)}
        >
          <div
            className="bg-background rounded-xl shadow-xl w-[90%] max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
              type="button"
              aria-label="Close contact modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
            <p className="text-muted-foreground mb-2">
              Get in touch with the supplier for more information.
            </p>
            <div className="space-y-2">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Phone:</strong> +263 77 123 4567</p>
              <p><strong>Email:</strong> johndoe@email.com</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

