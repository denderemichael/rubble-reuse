import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, ShoppingBag, Plus, Edit, Trash2, X } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("listings");
  const [userListings, setUserListings] = useState(initialUserListings);
  const [showListModal, setShowListModal] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    category: "",
    condition: "New",
    price: "",
    location: "",
    imageUrl: "",
  });

  const handleAddListing = () => {
    if (!newListing.title || !newListing.category || !newListing.price || !newListing.location || !newListing.imageUrl) {
      return;
    }

    const listing = {
      id: (userListings.length + 1).toString(),
      ...newListing,
      status: "Active",
      views: 0,
      inquiries: 0,
      listedDate: new Date().toISOString().split('T')[0],
    };

    setUserListings([...userListings, listing]);
    setNewListing({
      title: "",
      category: "",
      condition: "New",
      price: "",
      location: "",
      imageUrl: "",
    });
    setShowListModal(false);
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
                   <Label htmlFor="imageUrl" className="text-right">
                     Image URL
                   </Label>
                   <Input
                     id="imageUrl"
                     value={newListing.imageUrl}
                     onChange={(e) => setNewListing({ ...newListing, imageUrl: e.target.value })}
                     className="col-span-3"
                     placeholder="https://example.com/image.jpg"
                   />
                 </div>
               </div>
               <div className="flex justify-end gap-2">
                 <Button variant="outline" onClick={() => setShowListModal(false)}>
                   Cancel
                 </Button>
                 <Button onClick={handleAddListing} className="bg-gradient-primary">
                   List Material
                 </Button>
               </div>
             </DialogContent>
           </Dialog>
         </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                My Listings ({userListings.length})
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                My Purchases ({userPurchases.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-6">
              <div className="grid gap-6">
                {userListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          {/* Image Placeholder */}
                          <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0"></div>

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
                              <span>Listed: {listing.listedDate}</span>
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
                      <Button className="bg-gradient-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        List Your First Material
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
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
    </div>
  );
};

export default UserListings;