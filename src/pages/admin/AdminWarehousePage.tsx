
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Plus, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import WarehouseCard from "@/components/dropship/WarehouseCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export type WarehouseType = {
  id: string;
  name: string;
  location: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
  items: number;
  revenue: string;
  status: "active" | "inactive";
};

const AdminWarehousePage = () => {
  const [warehouses, setWarehouses] = useState<WarehouseType[]>([
    {
      id: "wh001",
      name: "Malaysia Central",
      location: "Admin - WH001",
      address1: "123 Industrial Avenue",
      address2: "Warehouse District",
      city: "Kuala Lumpur",
      state: "Federal Territory",
      zipcode: "50450",
      country: "Malaysia",
      phone: "+60 3 1234 5678",
      items: 2458,
      revenue: "$78,942",
      status: "active",
    },
    {
      id: "wh002",
      name: "Singapore Hub",
      location: "Admin - WH002",
      address1: "456 Logistics Park",
      address2: "Building B, Unit 7",
      city: "Singapore",
      state: "Central Region",
      zipcode: "608550",
      country: "Singapore",
      phone: "+65 6789 1234",
      items: 1876,
      revenue: "$65,321",
      status: "active",
    },
    {
      id: "wh003",
      name: "Bangkok Storage",
      location: "Admin - WH003",
      address1: "789 Distribution Road",
      address2: "Warehouse Complex",
      city: "Bangkok",
      state: "Bangkok Province",
      zipcode: "10330",
      country: "Thailand",
      phone: "+66 2 345 6789",
      items: 1234,
      revenue: "$45,678",
      status: "inactive",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteWarehouseId, setDeleteWarehouseId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<WarehouseType>>({
    name: "",
    location: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    status: "active",
    items: 0,
    revenue: "$0"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddWarehouse = () => {
    const newWarehouse: WarehouseType = {
      id: `wh${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: formData.name || "",
      location: formData.location || "",
      address1: formData.address1 || "",
      address2: formData.address2,
      city: formData.city || "",
      state: formData.state || "",
      zipcode: formData.zipcode || "",
      country: formData.country || "",
      phone: formData.phone || "",
      items: formData.items || 0,
      revenue: formData.revenue || "$0",
      status: formData.status || "active",
    };

    setWarehouses([...warehouses, newWarehouse]);
    setIsAddDialogOpen(false);
    setFormData({
      name: "",
      location: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
      status: "active",
      items: 0,
      revenue: "$0"
    });
    toast.success("Warehouse added successfully");
  };

  const handleDeleteWarehouse = () => {
    if (deleteWarehouseId) {
      const updatedWarehouses = warehouses.filter(warehouse => warehouse.id !== deleteWarehouseId);
      setWarehouses(updatedWarehouses);
      setDeleteWarehouseId(null);
      toast.success("Warehouse deleted successfully");
    }
  };

  const openAddDialog = () => {
    setFormData({
      name: "",
      location: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
      status: "active",
      items: 0,
      revenue: "$0"
    });
    setIsAddDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Warehouse className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Warehouse Management</h1>
          </div>
          <Button className="w-full md:w-auto" onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Warehouse
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <WarehouseCard 
              key={warehouse.id} 
              {...warehouse} 
              onDelete={() => setDeleteWarehouseId(warehouse.id)}
            />
          ))}
        </div>
      </div>

      {/* Add Warehouse Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Warehouse</DialogTitle>
            <DialogDescription>
              Fill in the details for the new warehouse. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Warehouse Name</Label>
                <Input id="name" name="name" value={formData.name || ""} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location ID</Label>
                <Input id="location" name="location" value={formData.location || ""} onChange={handleInputChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Address Line 1</Label>
              <Input id="address1" name="address1" value={formData.address1 || ""} onChange={handleInputChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address2">Address Line 2 (Optional)</Label>
              <Input id="address2" name="address2" value={formData.address2 || ""} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city || ""} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" name="state" value={formData.state || ""} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zipcode/Postalcode</Label>
                <Input id="zipcode" name="zipcode" value={formData.zipcode || ""} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country || ""} onChange={handleInputChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status" 
                  name="status" 
                  value={formData.status || "active"} 
                  onChange={handleInputChange as any}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddWarehouse}>Add Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Warehouse Confirmation Dialog */}
      <AlertDialog open={!!deleteWarehouseId} onOpenChange={(open) => !open && setDeleteWarehouseId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              warehouse and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteWarehouse}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminWarehousePage;
