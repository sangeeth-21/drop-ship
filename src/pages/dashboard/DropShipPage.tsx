
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WarehouseCard from "@/components/dropship/WarehouseCard";

const DropShipPage = () => {
  const warehouses = [
    {
      id: "ds001",
      name: "Singapore",
      location: "Velam Admin - AX5@pHa",
      address1: "123,Hello Street 1st cross",
      address2: "Street opp. hello house",
      city: "Salem",
      state: "Tamil Nadu",
      zipcode: "666999",
      country: "Singapore",
      phone: "+91 99999 99999",
      items: 1234,
      revenue: "$45,678",
      status: "active" as const,
    },
    {
      id: "ds002",
      name: "Malaysia",
      location: "John Admin - BX7@rTy",
      address1: "456 Main Avenue",
      address2: "Building 7, Floor 3",
      city: "Kuala Lumpur",
      state: "Federal Territory",
      zipcode: "50088",
      country: "Malaysia",
      phone: "+60 12345 6789",
      items: 890,
      revenue: "$34,567",
      status: "active" as const,
    },
    {
      id: "ds003",
      name: "Thailand",
      location: "Sarah Manager - TH8@kLm",
      address1: "789 Sukhumvit Road",
      address2: "Suite 12",
      city: "Bangkok",
      state: "Bangkok Province",
      zipcode: "10110",
      country: "Thailand",
      phone: "+66 98765 4321",
      items: 567,
      revenue: "$23,456",
      status: "inactive" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Drop & Ship</h1>
          </div>
          <Link to="/dashboard/new-order">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id} {...warehouse} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DropShipPage;
