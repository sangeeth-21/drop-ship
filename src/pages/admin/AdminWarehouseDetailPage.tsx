
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import { Warehouse, ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { WarehouseType } from "./AdminWarehousePage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminWarehouseDetailPage = () => {
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<WarehouseType>>({});
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching data from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const mockWarehouseData: WarehouseType[] = [
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
    ];

    setTimeout(() => {
      const warehouse = mockWarehouseData.find(w => w.id === warehouseId);
      if (warehouse) {
        setFormData(warehouse);
      } else {
        toast.error("Warehouse not found");
        navigate("/admin/warehouse");
      }
      setLoading(false);
    }, 500); // Simulate API delay
  }, [warehouseId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success("Warehouse updated successfully");
      navigate("/admin/warehouse");
    }, 500);
  };

  const handleDelete = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      toast.success("Warehouse deleted successfully");
      navigate("/admin/warehouse");
    }, 500);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-pulse">Loading warehouse details...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Warehouse className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Edit Warehouse</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/admin/warehouse")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Warehouses
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Warehouse</Button>
              </AlertDialogTrigger>
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
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Warehouse Information</CardTitle>
            <CardDescription>
              Update the warehouse details below. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Warehouse Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name || ""} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location ID</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location || ""} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Address Line 1</Label>
              <Input 
                id="address1" 
                name="address1" 
                value={formData.address1 || ""} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address2">Address Line 2 (Optional)</Label>
              <Input 
                id="address2" 
                name="address2" 
                value={formData.address2 || ""} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city || ""} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state || ""} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zipcode/Postalcode</Label>
                <Input 
                  id="zipcode" 
                  name="zipcode" 
                  value={formData.zipcode || ""} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  name="country" 
                  value={formData.country || ""} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone || ""} 
                onChange={handleInputChange} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status" 
                  name="status" 
                  value={formData.status || "active"} 
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => navigate("/admin/warehouse")}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminWarehouseDetailPage;
