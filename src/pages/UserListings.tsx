import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, ShoppingBag, Plus, Edit, Trash2, X, Upload, ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Mock data for user's listings and purchases
const initialUserListings = [
  {
    id: "1",
    title: "Premium Clay Bricks",
    category: "Bricks",
    condition: "New",
    price: "$0.50",
    location: "Harare CBD",
    status: "Active",
    views: 45,
    inquiries: 3,
    listedDate: "2024-10-20",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    title: "Steel Reinforcement Bars",
    category: "Metal",
    condition: "Like New",
    price: "$15.00",
    location: "Mbare Industrial",
    status: "Active",
    views: 32,
    inquiries: 1,
    listedDate: "2024-10-18",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
  },
];

const categories = ["Bricks", "Cement", "Metal", "Timber", "Tiles", "Blocks", "Plumbing", "Equipment", "Tools"];
const conditions = ["New", "Like New", "Used"];

const userPurchases = [
  {
    id: "p1",
    title: "Cement Bags (50kg)",
    category: "Cement",
    condition: "New",
    price: "$7.50",
    location: "Borrowdale",
    seller: "John Construction Ltd",
    purchaseDate: "2024-10-15",
    status: "Delivered",
    quantity: 10,
  },
  {
    id: "p2",
    title: "Ceramic Floor Tiles",
    category: "Tiles",
    condition: "Used",
    price: "Free",
    location: "Avondale",
    seller: "Green Materials Co",
    purchaseDate: "2024-10-10",
    status: "Delivered",
    quantity: 50,
  },
];

const UserListings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("listings");
  const [userListings, setUserListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    category: "",
    condition: "New",
    price: "",
    location: "",
    description: "",
    imageFile: null as File | null,
    imagePreview: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserListings();
    }
  }, [user]);

  const fetchUserListings = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewListing({
          ...newListing,
          imageFile: file,
          imagePreview: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddListing = async () => {
    if (!user || !newListing.title || !newListing.category || !newListing.price || !newListing.location || !newListing.imageFile) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      // Upload image to Supabase Storage
      const fileExt = newListing.imageFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('material-image')
        .upload(fileName, newListing.imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('material-image')
        .getPublicUrl(fileName);

      // Save to database
      const { data, error } = await supabase
        .from('materials')
        .insert({
          title: newListing.title,
          category: newListing.category,
          condition: newListing.condition,
          price: newListing.price,
          location: newListing.location,
          description: newListing.description,
          image_url: urlData.publicUrl,
          seller_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setUserListings([data, ...userListings]);
      toast.success('Material listed successfully!');

      // Reset form
      setNewListing({
        title: "",
        category: "",
        condition: "New",
        price: "",
        location: "",
        description: "",
        imageFile: null,
        imagePreview: "",
      });
      setShowListModal(false);
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
           <h1 className="text-3xl font-bold">My Account</h1>
           <Dialog open={showListModal} onOpenChange={setShowListModal}>
             <DialogTrigger asChild>
               <Button className="bg-gradient-primary">
                 <Plus className="h-4 w-4 mr-2" />
                 List New Material
               </Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                 <DialogTitle>List New Material</DialogTitle>
                 <DialogDescription>
                   Add details about your construction material to list it for sale.
                 </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="title" className="text-right">
                     Name
                   </Label>
                   <Input
                     id="title"
                     value={newListing.title}
                     onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                     className="col-span-3"
                     placeholder="e.g., Premium Clay Bricks"
                   />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="category" className="text-right">
                     Category
                   </Label>
                   <Select
                     value={newListing.category}
                     onValueChange={(value) => setNewListing({ ...newListing, category: value })}
                   >
                     <SelectTrigger className="col-span-3">
                       <SelectValue placeholder="Select category" />
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
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="condition" className="text-right">
                     Condition
                   </Label>
                   <Select
                     value={newListing.condition}
                     onValueChange={(value) => setNewListing({ ...newListing, condition: value })}
                   >
                     <SelectTrigger className="col-span-3">
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
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="price" className="text-right">
                     Price
                   </Label>
                   <Input
                     id="price"
                     value={newListing.price}
                     onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                     className="col-span-3"
                     placeholder="e.g., $0.50"
                   />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="location" className="text-right">
                     Location
                   </Label>
                   <Input
                     id="location"
                     value={newListing.location}
                     onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                     className="col-span-3"
                     placeholder="e.g., Harare CBD"
                   />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="description" className="text-right">
                     Description
                   </Label>
                   <textarea
                     id="description"
                     value={newListing.description}
                     onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                     className="col-span-3 px-3 py-2 border border-input rounded-md resize-none"
                     rows={3}
                     placeholder="Describe your material..."
                   />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="imageFile" className="text-right">
                     Photo
                   </Label>
                   <div className="col-span-3">
                     <div className="flex items-center gap-2">
                       <Input
                         id="imageFile"
                         type="file"
                         accept="image/*"
                         onChange={handleFileChange}
                         className="hidden"
                       />
                       <Label
                         htmlFor="imageFile"
                         className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground"
                       >
                         <Upload className="h-4 w-4" />
                         Choose Photo
                       </Label>
                       {newListing.imagePreview && (
                         <div className="flex items-center gap-2">
                           <ImageIcon className="h-4 w-4 text-green-500" />
                           <span className="text-sm text-green-600">Photo selected</span>
                         </div>
                       )}
                     </div>
                     {newListing.imagePreview && (
                       <div className="mt-2">
                         <img
                           src={newListing.imagePreview}
                           alt="Preview"
                           className="w-20 h-20 object-cover rounded-md border"
                         />
                       </div>
                     )}
                   </div>
                 </div>
               </div>
               <div className="flex justify-end gap-2">
                 <Button variant="outline" onClick={() => setShowListModal(false)}>
                   Cancel
                 </Button>
                 <Button onClick={handleAddListing} className="bg-gradient-primary" disabled={saving}>
                   {saving ? (
                     <>
                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                       Creating...
                     </>
                   ) : (
                     'List Material'
                   )}
                 </Button>
               </div>
             </DialogContent>
           </Dialog>
         </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                My Listings ({loading ? '...' : userListings.length})
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                My Purchases ({userPurchases.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="grid gap-6">
                  {userListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <img
                            src={listing.image_url}
                            alt={listing.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />

                          {/* Listing Details */}
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              <Badge
                                variant={listing.status === "Active" ? "default" : "secondary"}
                              >
                                {listing.status}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <Badge variant="outline">{listing.category}</Badge>
                              <Badge variant="secondary">{listing.condition}</Badge>
                              <span>{listing.location}</span>
                              <span>Listed: {new Date(listing.created_at).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center gap-6 text-sm">
                              <span className="font-semibold text-lg text-primary">{listing.price}</span>
                              <span>{listing.views} views</span>
                              <span>{listing.inquiries} inquiries</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                    {userListings.length === 0 && (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Start selling your construction materials and help reduce waste.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )
              }
            </TabsContent>

            <TabsContent value="purchases" className="space-y-6">
              <div className="grid gap-6">
                {userPurchases.map((purchase) => (
                  <Card key={purchase.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          {/* Image Placeholder */}
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0"></div>

                          {/* Purchase Details */}
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{purchase.title}</h3>
                              <Badge variant="default">{purchase.status}</Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <Badge variant="outline">{purchase.category}</Badge>
                              <Badge variant="secondary">{purchase.condition}</Badge>
                              <span>{purchase.location}</span>
                              <span>Qty: {purchase.quantity}</span>
                            </div>

                            <div className="flex items-center gap-6 text-sm">
                              <span className="font-semibold text-lg text-primary">
                                ${(parseFloat(purchase.price.replace('$', '')) * purchase.quantity).toFixed(2)}
                              </span>
                              <span>Seller: {purchase.seller}</span>
                              <span>Purchased: {purchase.purchaseDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Seller
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {userPurchases.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Your purchase history will appear here once you start buying materials.
                      </p>
                      <Button asChild className="bg-gradient-primary">
                        <a href="/marketplace">Browse Marketplace</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserListings;