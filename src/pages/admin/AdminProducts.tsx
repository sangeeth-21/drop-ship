
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Check, 
  ChevronDown, 
  Edit, 
  FileImage, 
  Filter,
  Info, 
  MoreHorizontal, 
  Plus, 
  Search, 
  ShoppingBag, 
  Trash, 
  Upload 
} from "lucide-react";
import { toast } from "sonner";

// Types
interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  stockQuantity: number;
  image: string;
  description: string;
  lastUpdated: string;
  featured: boolean;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Gaming Keyboard RGB",
      sku: "KB-001",
      price: 4999,
      category: "Electronics",
      stockStatus: "In Stock",
      stockQuantity: 25,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Mechanical gaming keyboard with RGB backlighting and programmable keys.",
      lastUpdated: "2023-06-15",
      featured: true
    },
    {
      id: "2",
      name: "Wireless Headphones",
      sku: "WH-102",
      price: 8999,
      category: "Electronics",
      stockStatus: "Low Stock",
      stockQuantity: 5,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Noise cancelling wireless headphones with 30 hour battery life.",
      lastUpdated: "2023-07-20",
      featured: true
    },
    {
      id: "3",
      name: "Smart Watch Pro",
      sku: "SW-205",
      price: 15999,
      category: "Wearables",
      stockStatus: "In Stock",
      stockQuantity: 18,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Smart watch with health tracking, GPS and message notifications.",
      lastUpdated: "2023-08-05",
      featured: false
    },
    {
      id: "4",
      name: "Ergonomic Office Chair",
      sku: "OC-115",
      price: 12999,
      category: "Furniture",
      stockStatus: "Out of Stock",
      stockQuantity: 0,
      image: "https://images.unsplash.com/photo-1571722288940-6513456d5617?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Adjustable ergonomic office chair with lumbar support and breathable mesh back.",
      lastUpdated: "2023-06-30",
      featured: false
    },
    {
      id: "5",
      name: "Ultra HD Monitor 32\"",
      sku: "UM-420",
      price: 27999,
      category: "Electronics",
      stockStatus: "In Stock",
      stockQuantity: 10,
      image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "32-inch Ultra HD monitor with HDR and 99% sRGB color accuracy.",
      lastUpdated: "2023-07-12",
      featured: true
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStock, setFilterStock] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    sku: "",
    price: 0,
    category: "",
    stockQuantity: 0,
    image: "",
    description: "",
    featured: false
  });

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    
    // Stock filter
    let matchesStock = true;
    if (filterStock === "inStock") {
      matchesStock = product.stockStatus === "In Stock";
    } else if (filterStock === "lowStock") {
      matchesStock = product.stockStatus === "Low Stock";
    } else if (filterStock === "outOfStock") {
      matchesStock = product.stockStatus === "Out of Stock";
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });
  
  // Calculate stock status based on quantity
  const getStockStatus = (quantity: number): "In Stock" | "Low Stock" | "Out of Stock" => {
    if (quantity <= 0) return "Out of Stock";
    if (quantity < 10) return "Low Stock";
    return "In Stock";
  };

  // Handler to add new product
  const handleAddProduct = () => {
    const stockStatus = getStockStatus(newProduct.stockQuantity || 0);
    
    const productToAdd: Product = {
      id: Math.random().toString(36).substring(2, 9),
      name: newProduct.name || "",
      sku: newProduct.sku || "",
      price: newProduct.price || 0,
      category: newProduct.category || "",
      stockStatus: stockStatus,
      stockQuantity: newProduct.stockQuantity || 0,
      image: newProduct.image || "https://placehold.co/400x400/png",
      description: newProduct.description || "",
      lastUpdated: new Date().toISOString().split('T')[0],
      featured: newProduct.featured || false
    };
    
    setProducts([...products, productToAdd]);
    setIsAddDialogOpen(false);
    setNewProduct({
      name: "",
      sku: "",
      price: 0,
      category: "",
      stockQuantity: 0,
      image: "",
      description: "",
      featured: false
    });
    
    toast.success("Product added successfully");
  };

  // Handler to edit product
  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    const updatedProducts = products.map(product => {
      if (product.id === selectedProduct.id) {
        const stockStatus = getStockStatus(selectedProduct.stockQuantity);
        
        return {
          ...selectedProduct,
          stockStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
    
    toast.success("Product updated successfully");
  };

  // Handler to delete product
  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    
    toast.success("Product deleted successfully");
  };

  // Handler to update stock
  const handleUpdateStock = (productId: string, newQuantity: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          stockQuantity: newQuantity,
          stockStatus: getStockStatus(newQuantity),
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    toast.success("Stock updated successfully");
  };

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and stock</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Category</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Stock Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock</SelectItem>
                <SelectItem value="inStock">In Stock</SelectItem>
                <SelectItem value="lowStock">Low Stock</SelectItem>
                <SelectItem value="outOfStock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center h-32 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/400x400/png";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{product.description}</div>
                        </div>
                        {product.featured && (
                          <Badge variant="default" className="ml-2">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>₹{product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.stockStatus === "In Stock"
                            ? "success"
                            : product.stockStatus === "Low Stock"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {product.stockStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={product.stockQuantity}
                          onChange={(e) => handleUpdateStock(product.id, parseInt(e.target.value))}
                          className="w-16 h-8 text-center"
                          min="0"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStock(product.id, product.stockQuantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{product.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableCaption>
              Showing {filteredProducts.length} of {products.length} products
            </TableCaption>
          </Table>
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Add New Product
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your inventory
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="Enter product SKU"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    value={newProduct.price || ""}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter product category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                  <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop product image here</p>
                  <div className="mt-4">
                    <Input
                      id="imageUrl"
                      placeholder="Or enter image URL"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      className="max-w-md"
                    />
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    placeholder="Enter stock quantity"
                    value={newProduct.stockQuantity || ""}
                    onChange={(e) => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={newProduct.featured}
                    onCheckedChange={(checked) => setNewProduct({...newProduct, featured: checked})}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Product
            </DialogTitle>
            <DialogDescription>
              Update the product details
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <Tabs defaultValue="info" className="mt-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="info">Information</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name</Label>
                    <Input
                      id="edit-name"
                      placeholder="Enter product name"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-sku">SKU</Label>
                    <Input
                      id="edit-sku"
                      placeholder="Enter product SKU"
                      value={selectedProduct.sku}
                      onChange={(e) => setSelectedProduct({...selectedProduct, sku: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Price (₹)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      placeholder="Enter product price"
                      value={selectedProduct.price}
                      onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-category">Category</Label>
                    <Input
                      id="edit-category"
                      placeholder="Enter product category"
                      value={selectedProduct.category}
                      onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      placeholder="Enter product description"
                      value={selectedProduct.description}
                      onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="images" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <Label>Product Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                    {selectedProduct.image && (
                      <div className="mb-4">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="h-40 w-auto object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x400/png";
                          }}
                        />
                      </div>
                    )}
                    <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop product image here</p>
                    <div className="mt-4">
                      <Input
                        id="edit-imageUrl"
                        placeholder="Or enter image URL"
                        value={selectedProduct.image}
                        onChange={(e) => setSelectedProduct({...selectedProduct, image: e.target.value})}
                        className="max-w-md"
                      />
                    </div>
                    <Button variant="outline" className="mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-stockQuantity">Stock Quantity</Label>
                    <Input
                      id="edit-stockQuantity"
                      type="number"
                      placeholder="Enter stock quantity"
                      value={selectedProduct.stockQuantity}
                      onChange={(e) => setSelectedProduct({...selectedProduct, stockQuantity: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-featured"
                      checked={selectedProduct.featured}
                      onCheckedChange={(checked) => setSelectedProduct({...selectedProduct, featured: checked})}
                    />
                    <Label htmlFor="edit-featured">Featured Product</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
