import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="RubbleReuse Logo" 
              className="h-10 w-10 transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold text-foreground">
              RubbleReuse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link to="/materials" className="text-sm font-medium hover:text-primary transition-colors">
              Tools & Equipment
            </Link>
            <Link to="/non-materials" className="text-sm font-medium hover:text-primary transition-colors">
              Raw Materials
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/listings">
              <Button className="bg-gradient-primary">List Materials</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            <Link
              to="/marketplace"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Marketplace
            </Link>
            <Link
              to="/materials"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Materials
            </Link>
            <Link
              to="/non-materials"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Non-Materials
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {/* Cart Icon Mobile */}
              <Link to="/cart" className="w-full">
                <Button variant="outline" className="w-full relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/listings" className="w-full">
                <Button className="w-full bg-gradient-primary">List Materials</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
