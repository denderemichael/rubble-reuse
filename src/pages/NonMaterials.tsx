import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const NonMaterials = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('status', 'Active')
        .in('category', ['Bricks', 'Cement', 'Metal', 'Timber', 'Tiles', 'Blocks', 'Plumbing', 'Sand', 'Aggregate'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match expected format
      const transformedData = data.map(material => ({
        id: material.id,
        title: material.title,
        category: material.category,
        condition: material.condition,
        price: material.price,
        location: material.location,
        distance: "5 km", // Placeholder
        rating: 4.5, // Placeholder
        co2Saved: "10kg", // Placeholder
        coordinates: [-17.8252, 31.0335], // Placeholder
        imageUrl: material.image_url,
        seller: "Seller", // Would need join with user_profiles
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

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fallback to mock data if no real data
  const displayMaterials = filteredMaterials.length > 0 ? filteredMaterials : [];

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Materials Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayMaterials.map((material, index) => (
                  <MaterialCard key={material.id || index} {...material} />
                ))}
                {displayMaterials.length === 0 && !loading && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No materials found. Check back later!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NonMaterials;
