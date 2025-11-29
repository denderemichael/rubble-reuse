import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const isAuthenticated = !!user;

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

            {/* Account Section */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <User className="h-4 w-4 mr-2" />
                    Account
                    <ChevronDown className="h-4 w-4 ml-2" />
                    {cartItemCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/cart" className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart
                      {cartItemCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {cartItemCount}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/listings" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      List Materials
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive focus:text-destructive"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
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
              Tools & Equipment
            </Link>
            <Link
              to="/non-materials"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Raw Materials
            </Link>

            {isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <div className="flex items-center gap-2 px-2 py-1">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Account</span>
                </div>
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
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    List Materials
                  </Button>
                </Link>
                <Link to="/account" className="w-full">
                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    My Account
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
