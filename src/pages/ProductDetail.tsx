import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Phone, MessageCircle, Download, Star, Loader2 } from "lucide-react";

// Sample data - replace with API call in production
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
    images: ["/images/materials/RedClay-bricks.jpg", "/images/materials/RedClay-bricks.jpg"],
    description: "High-quality clay bricks from our CBD project surplus. Perfect for construction with excellent compressive strength and durability.",
    provenance: "Source: Masimba - Harare CBD Commercial Development",
    dateRecovered: "2025-11-15",
    quantity: "5,000 pcs",
    dimensions: "220mm x 110mm x 70mm",
    inspectionReport: "/reports/bricks-inspection-001.pdf",
    sellerContact: {
      phone: "+263 77 123 4567",
      whatsapp: "+263 77 123 4567",
      email: "sales@masimba.co.zw"
    }
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
    images: ["/images/materials/Steel-reinforcement.jpg", "/images/materials/Steel-reinforcement.jpg"],
    description: "High-quality steel reinforcement bars from our recent CBD refurbishment project. Perfect for concrete construction and structural reinforcement.",
    provenance: "Source: Frontline - Mbare Industrial Complex Refurbishment",
    dateRecovered: "2025-11-01",
    quantity: "250 pcs",
    dimensions: "12mm diameter",
    inspectionReport: "/reports/steel-inspection-002.pdf",
    sellerContact: {
      phone: "+263 77 234 5678",
      whatsapp: "+263 77 234 5678",
      email: "materials@frontline.co.zw"
    }
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
    images: ["/images/materials/Cement-bags.jpg", "/images/materials/Cement-bags.jpg"],
    description: "Premium Portland cement in 50kg bags. Fresh stock with full shelf life remaining. Ideal for all construction applications.",
    provenance: "Source: Rock Structure - Borrowdale Residential Project",
    dateRecovered: "2025-11-20",
    quantity: "200 bags",
    dimensions: "50kg bags",
    inspectionReport: "/reports/cement-inspection-003.pdf",
    sellerContact: {
      phone: "+263 77 345 6789",
      whatsapp: "+263 77 345 6789",
      email: "procurement@rockstructure.co.zw"
    }
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
    images: ["/images/materials/Ceramic-tiles.jpg", "/images/materials/Ceramic-tiles.jpg"],
    description: "Beautiful ceramic floor tiles in excellent condition. Removed during renovation project. Various sizes and patterns available.",
    provenance: "Source: Heritage - Avondale Office Renovation",
    dateRecovered: "2025-10-28",
    quantity: "150 m²",
    dimensions: "300mm x 300mm",
    inspectionReport: "/reports/tiles-inspection-004.pdf",
    sellerContact: {
      phone: "+263 77 456 7890",
      whatsapp: "+263 77 456 7890",
      email: "info@heritageconstruction.co.zw"
    }
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
    images: ["/images/materials/Timber-planks.jpg", "/images/materials/Timber-planks.jpg"],
    description: "Premium hardwood timber planks in excellent condition. Perfect for furniture making, construction, or woodworking projects.",
    provenance: "Source: Masimba - Highlands Residential Development",
    dateRecovered: "2025-11-10",
    quantity: "25 m³",
    dimensions: "25mm x 150mm x various lengths",
    inspectionReport: "/reports/timber-inspection-005.pdf",
    sellerContact: {
      phone: "+263 77 123 4567",
      whatsapp: "+263 77 123 4567",
      email: "sales@masimba.co.zw"
    }
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
    images: ["/images/materials/Roofing-sheets.jpg", "/images/materials/Roofing-sheets.jpg"],
    description: "Galvanized roofing sheets in good condition. Removed from commercial building during roof replacement project.",
    provenance: "Source: Frontline - Warren Park Commercial Building",
    dateRecovered: "2025-10-15",
    quantity: "50 sheets",
    dimensions: "2.4m x 0.8m",
    inspectionReport: "/reports/roofing-inspection-006.pdf",
    sellerContact: {
      phone: "+263 77 234 5678",
      whatsapp: "+263 77 234 5678",
      email: "materials@frontline.co.zw"
    }
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
    images: ["/images/materials/Concrete-blocks.jpg", "/images/materials/Concrete-blocks.jpg"],
    description: "Standard concrete blocks from manufacturing overrun. Perfect for wall construction and building projects.",
    provenance: "Source: Rock Structure - Glen Norah Manufacturing Facility",
    dateRecovered: "2025-11-25",
    quantity: "1,000 blocks",
    dimensions: "390mm x 190mm x 140mm",
    inspectionReport: "/reports/blocks-inspection-007.pdf",
    sellerContact: {
      phone: "+263 77 345 6789",
      whatsapp: "+263 77 345 6789",
      email: "procurement@rockstructure.co.zw"
    }
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
    images: ["/images/materials/Pvc pipes-fittings.jpg", "/images/materials/Pvc pipes-fittings.jpg"],
    description: "Complete set of PVC pipes and fittings including elbows, tees, couplings, and valves. Brand new with all original packaging.",
    provenance: "Source: Heritage - Belvedere Plumbing Project",
    dateRecovered: "2025-11-18",
    quantity: "Complete plumbing set",
    dimensions: "Various sizes (20mm-50mm)",
    inspectionReport: "/reports/plumbing-inspection-008.pdf",
    sellerContact: {
      phone: "+263 77 456 7890",
      whatsapp: "+263 77 456 7890",
      email: "info@heritageconstruction.co.zw"
    }
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
    images: ["/images/materials/aluminium-ladder.jpg", "/images/materials/aluminium-ladder.jpg"],
    description: "Heavy-duty aluminium ladder perfect for construction and industrial use. Extendable with safety locks and non-slip feet.",
    provenance: "Source: OK Zimbabwe - Bulawayo Industrial Complex",
    dateRecovered: "2025-11-08",
    quantity: "1 unit",
    dimensions: "3.5m extended, 1.2m closed",
    inspectionReport: "/reports/ladder-inspection-009.pdf",
    sellerContact: {
      phone: "+263 77 567 8901",
      whatsapp: "+263 77 567 8901",
      email: "sales@okzimbabwe.co.zw"
    }
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
    images: ["/images/materials/Paving-tiles.jpg", "/images/materials/Paving-tiles.jpg"],
    description: "Beautiful granite-effect paving tiles with excellent slip resistance. Perfect for driveways, patios, and walkways.",
    provenance: "Source: Lafarge - Borrowdale Manufacturing Surplus",
    dateRecovered: "2025-11-22",
    quantity: "100 m²",
    dimensions: "400mm x 400mm x 30mm",
    inspectionReport: "/reports/paving-inspection-010.pdf",
    sellerContact: {
      phone: "+263 77 678 9012",
      whatsapp: "+263 77 678 9012",
      email: "materials@lafarge.co.zw"
    }
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
    images: ["/images/materials/Cement-bags.jpg", "/images/materials/Cement-bags.jpg"],
    description: "High-quality Portland cement in 50kg bags. Fresh production with guaranteed quality and strength specifications.",
    provenance: "Source: PPC - Harare Industrial Plant",
    dateRecovered: "2025-11-12",
    quantity: "500 bags",
    dimensions: "50kg bags",
    inspectionReport: "/reports/cement-bulk-inspection-011.pdf",
    sellerContact: {
      phone: "+263 77 789 0123",
      whatsapp: "+263 77 789 0123",
      email: "sales@ppc.co.zw"
    }
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
    images: ["/images/materials/Timber-planks.jpg", "/images/materials/Timber-planks.jpg"],
    description: "Premium hardwood timber from sustainable forests. Kiln-dried and ready for immediate use in construction or furniture making.",
    provenance: "Source: Timber Products - Mutare Processing Facility",
    dateRecovered: "2025-10-30",
    quantity: "50 m³",
    dimensions: "50mm x 200mm x 6m lengths",
    inspectionReport: "/reports/hardwood-inspection-012.pdf",
    sellerContact: {
      phone: "+263 77 890 1234",
      whatsapp: "+263 77 890 1234",
      email: "export@timberproducts.co.zw"
    }
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
    images: ["/images/materials/Roofing-sheets.jpg", "/images/materials/Roofing-sheets.jpg"],
    description: "Premium galvanized steel roof sheeting with excellent corrosion resistance. Perfect for roofing applications in various climates.",
    provenance: "Source: Zimbabwe Building Materials - Gweru Manufacturing",
    dateRecovered: "2025-11-05",
    quantity: "100 sheets",
    dimensions: "3m x 0.9m x 0.5mm thick",
    inspectionReport: "/reports/steel-sheeting-inspection-013.pdf",
    sellerContact: {
      phone: "+263 77 901 2345",
      whatsapp: "+263 77 901 2345",
      email: "orders@zbm.co.zw"
    }
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
    images: ["/images/materials/Ceramic-tiles.jpg", "/images/materials/Ceramic-tiles.jpg"],
    description: "Premium interior emulsion paint with excellent coverage and durability. Low VOC formula, suitable for all interior surfaces.",
    provenance: "Source: Sable Chemical - Bulawayo Paint Production",
    dateRecovered: "2025-11-14",
    quantity: "50 x 5L tins",
    dimensions: "5L paint tins",
    inspectionReport: "/reports/paint-inspection-014.pdf",
    sellerContact: {
      phone: "+263 77 012 3456",
      whatsapp: "+263 77 012 3456",
      email: "retail@sablechemicals.co.zw"
    }
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
    images: ["/images/materials/tool-belt.jpg", "/images/materials/tool-belt.jpg"],
    description: "Complete professional toolkit including hammers, screwdrivers, pliers, measuring tools, and safety equipment. Brand new in original packaging.",
    provenance: "Source: Probuild - Harare CBD Store Inventory",
    dateRecovered: "2025-11-16",
    quantity: "Complete tool set",
    dimensions: "Various tool sizes",
    inspectionReport: "/reports/tools-inspection-015.pdf",
    sellerContact: {
      phone: "+263 77 123 4567",
      whatsapp: "+263 77 123 4567",
      email: "tools@probuild.co.zw"
    }
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      // Get the material
      const { data: material, error: materialError } = await supabase
        .from('materials')
        .select('*')
        .eq('id', productId)
        .single();

      if (materialError) {
        console.error('Database error:', materialError);
        throw materialError;
      }

      if (material) {
        // Get the seller profile separately
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('first_name, last_name, phone')
          .eq('id', material.seller_id)
          .single();

        // Transform to match expected format
        const transformedProduct = {
          ...material,
          images: [material.image_url], // For compatibility
          seller: profile ? `${profile.first_name} ${profile.last_name}` : 'Seller',
          sellerContact: {
            phone: profile?.phone || "+263 77 123 4567",
            whatsapp: profile?.phone || "+263 77 123 4567",
            email: "seller@example.com"
          }
        };
        setProduct(transformedProduct);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/marketplace">Back to Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-secondary hover:text-primary">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/marketplace" className="text-secondary hover:text-primary">Marketplace</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/marketplace?category=${product.category}`} className="text-secondary hover:text-primary">{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-secondary">{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Title & Seller Info */}
            <div>
              <h1 className="text-3xl font-bold text-secondary mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-secondary">Listed by {product.seller}</p>
                {product.verified && (
                  <Badge className="bg-primary text-primary-foreground">Verified Seller</Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-medium">{product.rating}</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Tag */}
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
              {product.condition.toUpperCase()}
            </Badge>

            {/* Detailed Description & Metadata */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary mb-3">Description</h2>
                <p className="text-secondary">{product.description || 'No description available.'}</p>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold text-secondary mb-3">Material Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-secondary"><strong>Quantity:</strong> {product.quantity}</p>
                    <p className="text-secondary"><strong>Dimensions:</strong> {product.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-secondary"><strong>Condition:</strong> {product.condition}</p>
                    <p className="text-secondary"><strong>Category:</strong> {product.category}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold text-secondary mb-3">Provenance</h2>
                <p className="text-secondary">Listed on {new Date(product.created_at).toLocaleDateString()}</p>
              </div>

            </div>
          </div>

          {/* Right Column - Call to Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-muted rounded-lg p-6 shadow-lg">
              <div className="space-y-6">
                {/* Price */}
                <div>
                  <p className="text-3xl font-bold text-accent mb-2">{product.price}</p>
                  <p className="text-secondary">In Stock</p>
                </div>

                {/* Main Action Button */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                    onClick={() => {
                      addToCart(product);
                      toast.success('Added to cart!');
                    }}
                  >
                    Buy Now
                  </Button>
                </div>

                <Separator />

                {/* Seller Contact */}
                <div>
                  <h3 className="font-semibold text-secondary mb-3">Contact Seller</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`https://wa.me/${product.sellerContact.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`tel:${product.sellerContact.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}