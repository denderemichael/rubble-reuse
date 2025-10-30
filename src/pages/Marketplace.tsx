import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Navbar } from "@/components/Navbar";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, MapPin, Grid3x3, Map, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Material {
  id: string;
  title: string;
  category: string;
  condition: string;
  price: string;
  location: string;
  distance: string;
  rating: number;
  co2Saved: string;
  coordinates: number[];
  imageUrl: string;
}

// Mock data - will be replaced with real data from backend
const mockMaterials = [
  {
    id: "1",
    title: "Premium Clay Bricks",
    category: "Bricks",
    condition: "New",
    price: "$0.50",
    location: "Harare CBD",
    distance: "2.3 km",
    rating: 4.8,
    co2Saved: "12kg",
    coordinates: [-17.8252, 31.0335],
    imageUrl: "/images/materials/RedClay-bricks.jpg",
  },
  {
    id: "2",
    title: "Steel Reinforcement Bars",
    category: "Metal",
    condition: "Like New",
    price: "$15.00",
    location: "Mbare Industrial",
    distance: "5.1 km",
    rating: 4.6,
    co2Saved: "45kg",
    coordinates: [-17.8587, 31.0295],
    imageUrl: "/images/materials/Steel-reinforcement.jpg",
  },
  {
    id: "3",
    title: "Cement Bags (50kg)",
    category: "Cement",
    condition: "New",
    price: "$7.50",
    location: "Borrowdale",
    distance: "8.7 km",
    rating: 4.9,
    co2Saved: "8kg",
    coordinates: [-17.7600, 31.1000],
    imageUrl: "/images/materials/Cement-bags.jpg",
  },
  {
    id: "4",
    title: "Ceramic Floor Tiles",
    category: "Tiles",
    condition: "Used",
    price: "Free",
    location: "Avondale",
    distance: "4.2 km",
    rating: 4.3,
    co2Saved: "18kg",
    coordinates: [-17.7958, 31.0378],
    imageUrl: "/images/materials/Ceramic-tiles.jpg",
  },
  {
    id: "5",
    title: "Timber Planks - Hardwood",
    category: "Timber",
    condition: "Like New",
    price: "$25.00",
    location: "Highlands",
    distance: "6.5 km",
    rating: 4.7,
    co2Saved: "32kg",
    coordinates: [-17.7858, 31.0378],
    imageUrl: "/images/materials/Timber-planks.jpg",
  },
  {
    id: "6",
    title: "Roofing Sheets",
    category: "Metal",
    condition: "Used",
    price: "$8.00",
    location: "Warren Park",
    distance: "7.8 km",
    rating: 4.4,
    co2Saved: "28kg",
    coordinates: [-17.8200, 31.0500],
    imageUrl: "/images/materials/Roofing-sheets.jpg",
  },
  {
    id: "7",
    title: "Concrete Blocks",
    category: "Blocks",
    condition: "New",
    price: "$1.20",
    location: "Glen Norah",
    distance: "9.2 km",
    rating: 4.5,
    co2Saved: "15kg",
    coordinates: [-17.8500, 31.0500],
    imageUrl: "/images/materials/Concrete-blocks.jpg",
  },
  {
    id: "8",
    title: "PVC Pipes & Fittings",
    category: "Plumbing",
    condition: "New",
    price: "$12.00",
    location: "Belvedere",
    distance: "3.8 km",
    rating: 4.8,
    co2Saved: "6kg",
    coordinates: [-17.8250, 31.0335],
    imageUrl: "/images/materials/Pvc pipes-fittings.jpg",
  },
];

const categories = ["All", "Bricks", "Cement", "Metal", "Timber", "Tiles", "Blocks", "Plumbing"];
const conditions = ["All", "New", "Like New", "Used"];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortBy, setSortBy] = useState("nearest");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedCondition !== "All",
    searchQuery.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedCondition("All");
    setPriceRange([0, 100]);
    setMaxDistance(50);
  };

  const getPriceValue = (price: string) => price === "Free" ? 0 : parseFloat(price.replace('$', ''));

  const filteredMaterials = useMemo(() => {
    let filtered = mockMaterials.filter(material => {
      if (selectedCategory !== "All" && material.category !== selectedCategory) return false;
      if (selectedCondition !== "All" && material.condition !== selectedCondition) return false;
      const dist = parseFloat(material.distance.split(' ')[0]);
      if (dist > maxDistance) return false;
      if (searchQuery && !material.title.toLowerCase().includes(searchQuery.toLowerCase()) && !material.category.toLowerCase().includes(searchQuery.toLowerCase()) && !material.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "nearest":
          return parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]);
        case "price-low":
          return getPriceValue(a.price) - getPriceValue(b.price);
        case "price-high":
          return getPriceValue(b.price) - getPriceValue(a.price);
        case "rating":
          return b.rating - a.rating;
        case "recent":
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockMaterials, selectedCategory, selectedCondition, maxDistance, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Browse <span className="text-primary">Construction Materials</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover quality reusable materials near you. Save money and reduce waste.
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-2 mt-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search materials, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
             
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Condition Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((cond) => (
                      <SelectItem key={cond} value={cond}>
                        {cond}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Distance Filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Max Distance: {maxDistance} km
                </label>
                <Slider
                  value={[maxDistance]}
                  onValueChange={(val) => setMaxDistance(val[0])}
                  max={50}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Your Location</label>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Harare CBD
                </Button>
              </div>
            </div>
          </aside>

          {/* Materials Grid */}
          <div className="flex-1 space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {filteredMaterials.length} materials found
                </p>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary">{activeFiltersCount} filters</Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search results
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      {/* Same filters as desktop sidebar */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Category</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">Condition</label>
                        <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {conditions.map((cond) => (
                              <SelectItem key={cond} value={cond}>
                                {cond}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Price Range: ${priceRange[0]} - ${priceRange[1]}
                        </label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={100}
                          step={5}
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          Max Distance: {maxDistance} km
                        </label>
                        <Slider
                          value={[maxDistance]}
                          onValueChange={(val) => setMaxDistance(val[0])}
                          max={50}
                          step={5}
                        />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nearest">Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex gap-1 border rounded-md p-1">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Materials Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <MaterialCard key={material.id} {...material} />
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-lg aspect-video overflow-hidden">
                <MapContainer
                  center={[-17.8252, 31.0335]}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredMaterials.map((material) => (
                    <Marker key={material.id} position={material.coordinates as [number, number]}>
                      <Popup>
                        <div className="space-y-2">
                          <h3 className="font-semibold">{material.title}</h3>
                          <p className="text-sm text-muted-foreground">{material.location}</p>
                          <p className="text-sm font-medium">{material.price}</p>
                          <p className="text-sm">{material.category} • {material.condition}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">⭐ {material.rating}</span>
                            <span className="text-sm text-muted-foreground">• CO₂ saved: {material.co2Saved}</span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center pt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
