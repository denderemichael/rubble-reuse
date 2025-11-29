import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Navbar } from "@/components/Navbar";
import { MaterialCard } from "@/components/MaterialCard";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, MapPin, Grid3x3, Map, X, Home, TreePine, Wrench, Square, Package, Box } from "lucide-react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  seller: string;
  verified: boolean;
}

// Sample data for demonstration - replace with API calls in production
const sampleMaterials = [
  {
    id: "1",
    title: "Premium Clay Bricks - Surplus from CBD Project",
    category: "Bricks",
    condition: "New",
    price: "ZWL 150/pc",
    location: "Harare CBD",
    distance: "2.3 km",
    rating: 4.8,
    co2Saved: "12kg",
    coordinates: [-17.8252, 31.0335],
    imageUrl: "/images/materials/RedClay-bricks.jpg",
    seller: "Masimba Holdings Limited",
    verified: true,
  },
  {
    id: "2",
    title: "Steel Reinforcement Bars 12mm",
    category: "Metal",
    condition: "Like New",
    price: "ZWL 37,500/lot",
    location: "Mbare Industrial",
    distance: "5.1 km",
    rating: 4.6,
    co2Saved: "45kg",
    coordinates: [-17.8587, 31.0295],
    imageUrl: "/images/materials/Steel-reinforcement.jpg",
    seller: "Frontline Contracting",
    verified: true,
  },
  {
    id: "3",
    title: "Cement Bags (50kg) - Bulk Lot",
    category: "Cement",
    condition: "New",
    price: "ZWL 2,500/bag",
    location: "Borrowdale",
    distance: "8.7 km",
    rating: 4.9,
    co2Saved: "8kg",
    coordinates: [-17.7600, 31.1000],
    imageUrl: "/images/materials/Cement-bags.jpg",
    seller: "Rock Structure Construction (Pvt) Ltd",
    verified: true,
  },
  {
    id: "4",
    title: "Ceramic Floor Tiles - Refurbished",
    category: "Tiles",
    condition: "Used",
    price: "Free",
    location: "Avondale",
    distance: "4.2 km",
    rating: 4.3,
    co2Saved: "18kg",
    coordinates: [-17.7958, 31.0378],
    imageUrl: "/images/materials/Ceramic-tiles.jpg",
    seller: "Heritage Construction",
    verified: true,
  },
  {
    id: "5",
    title: "Timber Planks - Hardwood Surplus",
    category: "Timber",
    condition: "Like New",
    price: "ZWL 8,000/m³",
    location: "Highlands",
    distance: "6.5 km",
    rating: 4.7,
    co2Saved: "32kg",
    coordinates: [-17.7858, 31.0378],
    imageUrl: "/images/materials/Timber-planks.jpg",
    seller: "Masimba Holdings Limited",
    verified: true,
  },
  {
    id: "6",
    title: "Roofing Sheets - Galvanized",
    category: "Metal",
    condition: "Used",
    price: "ZWL 2,800/sheet",
    location: "Warren Park",
    distance: "7.8 km",
    rating: 4.4,
    co2Saved: "28kg",
    coordinates: [-17.8200, 31.0500],
    imageUrl: "/images/materials/Roofing-sheets.jpg",
    seller: "Frontline Contracting",
    verified: true,
  },
  {
    id: "7",
    title: "Concrete Blocks - Project Overrun",
    category: "Blocks",
    condition: "New",
    price: "ZWL 400/block",
    location: "Glen Norah",
    distance: "9.2 km",
    rating: 4.5,
    co2Saved: "15kg",
    coordinates: [-17.8500, 31.0500],
    imageUrl: "/images/materials/Concrete-blocks.jpg",
    seller: "Rock Structure Construction (Pvt) Ltd",
    verified: true,
  },
  {
    id: "8",
    title: "PVC Pipes & Fittings - Complete Set",
    category: "Plumbing",
    condition: "New",
    price: "ZWL 4,000/set",
    location: "Belvedere",
    distance: "3.8 km",
    rating: 4.8,
    co2Saved: "6kg",
    coordinates: [-17.8250, 31.0335],
    imageUrl: "/images/materials/Pvc pipes-fittings.jpg",
    seller: "Heritage Construction",
    verified: true,
  },
  {
    id: "9",
    title: "Aluminium Ladder - Industrial Grade",
    category: "Tools",
    condition: "Like New",
    price: "ZWL 15,000",
    location: "Bulawayo Industrial",
    distance: "12.1 km",
    rating: 4.9,
    co2Saved: "22kg",
    coordinates: [-20.1500, 28.5833],
    imageUrl: "/images/materials/aluminium-ladder.jpg",
    seller: "OK Zimbabwe Ltd",
    verified: true,
  },
  {
    id: "10",
    title: "Paving Tiles - Granite Effect",
    category: "Tiles",
    condition: "New",
    price: "ZWL 1,200/m²",
    location: "Borrowdale",
    distance: "6.3 km",
    rating: 4.6,
    co2Saved: "35kg",
    coordinates: [-17.7600, 31.1000],
    imageUrl: "/images/materials/Paving-tiles.jpg",
    seller: "Lafarge Cement Zimbabwe",
    verified: true,
  },
  {
    id: "11",
    title: "Cement Bags 50kg - Bulk Supply",
    category: "Cement",
    condition: "New",
    price: "ZWL 2,800/bag",
    location: "Harare Industrial",
    distance: "8.5 km",
    rating: 4.7,
    co2Saved: "12kg",
    coordinates: [-17.8150, 31.0335],
    imageUrl: "/images/materials/Cement-bags.jpg",
    seller: "PPC Zimbabwe",
    verified: true,
  },
  {
    id: "12",
    title: "Hardwood Timber Planks",
    category: "Timber",
    condition: "New",
    price: "ZWL 12,000/m³",
    location: "Mutare Timber Yard",
    distance: "15.2 km",
    rating: 4.8,
    co2Saved: "45kg",
    coordinates: [-18.9700, 32.6700],
    imageUrl: "/images/materials/Timber-planks.jpg",
    seller: "Timber Products Zimbabwe",
    verified: true,
  },
  {
    id: "13",
    title: "Steel Roof Sheeting - Galvanized",
    category: "Metal",
    condition: "Like New",
    price: "ZWL 3,500/sheet",
    location: "Gweru Industrial",
    distance: "18.7 km",
    rating: 4.5,
    co2Saved: "28kg",
    coordinates: [-19.4500, 29.8200],
    imageUrl: "/images/materials/Roofing-sheets.jpg",
    seller: "Zimbabwe Building Materials",
    verified: true,
  },
  {
    id: "14",
    title: "Interior Paint - Premium Quality",
    category: "Paint",
    condition: "New",
    price: "ZWL 8,500/5L",
    location: "Bulawayo CBD",
    distance: "14.3 km",
    rating: 4.9,
    co2Saved: "5kg",
    coordinates: [-20.1600, 28.5800],
    imageUrl: "/images/materials/Ceramic-tiles.jpg", // Placeholder
    seller: "Sable Chemical Industries",
    verified: true,
  },
  {
    id: "15",
    title: "Hardware Tools Set - Complete",
    category: "Tools",
    condition: "New",
    price: "ZWL 25,000/set",
    location: "Harare CBD",
    distance: "3.2 km",
    rating: 4.6,
    co2Saved: "15kg",
    coordinates: [-17.8252, 31.0335],
    imageUrl: "/images/materials/tool-belt.jpg",
    seller: "Probuild Hardware",
    verified: true,
  },
];

const categories = ["All", "Bricks", "Cement", "Metal", "Timber", "Tiles", "Blocks", "Plumbing"];
const conditions = ["All", "New", "Like New", "Used"];

export default function Marketplace() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortBy, setSortBy] = useState("nearest");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('status', 'Active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match the expected format
      const transformedData = data.map(material => ({
        id: material.id,
        title: material.title,
        category: material.category,
        condition: material.condition,
        price: material.price,
        location: material.location,
        distance: "5 km", // Placeholder - could calculate based on user location
        rating: 4.5, // Placeholder
        co2Saved: "10kg", // Placeholder
        coordinates: [-17.8252, 31.0335], // Placeholder
        imageUrl: material.image_url,
        seller: "Seller", // Would need to join with user_profiles
        verified: true, // Placeholder
      }));

      setMaterials(transformedData);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Failed to load materials');
    } finally {
      setLoading(false);
    }
  };

  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedCondition !== "All",
    selectedLocation !== "All",
    searchQuery.length > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All");
    setSelectedCategory("All");
    setSelectedCondition("All");
    setPriceRange([0, 100]);
    setMaxDistance(50);
  };

  const getPriceValue = (price: string) => price === "Free" ? 0 : parseFloat(price.replace('$', ''));

  // Filter and sort materials based on user selections
  const filteredMaterials = useMemo(() => {
    // First, apply filters to narrow down the list
    let filtered = materials.filter(material => {
      // Category filter: only include if matches selected or "All"
      if (selectedCategory !== "All" && material.category !== selectedCategory) return false;
      // Condition filter: similar logic
      if (selectedCondition !== "All" && material.condition !== selectedCondition) return false;
      // Location filter: check if location matches selected location
      if (selectedLocation !== "All" && !material.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      // Distance filter: parse distance and check against max
      const dist = parseFloat(material.distance.split(' ')[0]);
      if (dist > maxDistance) return false;
      // Search query: check title, category, or location
      if (searchQuery && !material.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !material.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !material.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    // Sort the filtered results based on user preference
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "nearest":
          // Sort by distance ascending
          return parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]);
        case "price-low":
          // Sort by price ascending
          return getPriceValue(a.price) - getPriceValue(b.price);
        case "price-high":
          // Sort by price descending
          return getPriceValue(b.price) - getPriceValue(a.price);
        case "rating":
          // Sort by rating descending
          return b.rating - a.rating;
        case "recent":
          // Sort by ID descending (assuming higher ID is more recent)
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [materials, selectedCategory, selectedCondition, selectedLocation, maxDistance, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b min-h-[60vh] flex items-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-[url('/image/Hero1.jpg')] bg-cover bg-center"></div>
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Find Your Next <span className="text-primary">Building Treasure</span>
            </h1>
            <p className="text-lg text-white">
              Building a sustainable future, one material at a time.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 mt-8 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
                <Input
                  placeholder="Find concrete blocks, steel, timber, or bulk lots near you..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:bg-white/20"
                />
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-40 h-12 bg-white/10 border-white/30 text-white">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Locations</SelectItem>
                  <SelectItem value="harare">Harare</SelectItem>
                  <SelectItem value="bulawayo">Bulawayo</SelectItem>
                  <SelectItem value="mutare">Mutare</SelectItem>
                  <SelectItem value="gweru">Gweru</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lots Carousel */}
      <section className="bg-muted pt-16 pb-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary text-center mb-8">Featured Project Lots</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {filteredMaterials.slice(0, 6).map((material) => (
                <CarouselItem key={material.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link to={`/product/${material.id}`}>
                    <div className="bg-background rounded-lg shadow-md p-4 h-full cursor-pointer hover:shadow-lg transition-shadow">
                      <img
                        src={material.imageUrl}
                        alt={material.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-secondary mb-2 line-clamp-2">{material.title}</h3>
                      <p className="text-sm text-secondary mb-1">{material.seller}</p>
                      {material.verified && (
                        <Badge className="bg-primary text-primary-foreground text-xs mb-2">Verified Seller</Badge>
                      )}
                      <p className="text-lg font-bold text-accent mb-2">{material.price}</p>
                      <p className="text-sm text-secondary">{material.category} • {material.condition}</p>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/90">View Lot</Button>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>


      {/* Main Content */}
      <section className="container mx-auto px-4 pt-0 pb-8">
        <div className={`flex flex-col gap-6 ${showFilters ? 'lg:flex-row' : ''}`}>
          {/* Filters Sidebar - Desktop */}
          <aside className={`hidden lg:block w-80 shrink-0 space-y-6 transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
                {/* Desktop Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden lg:flex"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

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

      <Footer />
    </div>
  );
}
