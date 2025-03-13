
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calculator, Download, Upload, ArrowRight, FileType, FileSpreadsheet, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for shipping providers
const SHIPPING_PROVIDERS = [
  {
    id: 1,
    name: "Colombo Mail Express",
    logo: "public/lovable-uploads/5c504b98-0758-4fac-a9d0-505dd256c833.png",
    deliveryTime: "3 - 5 Working Days",
    rate: 12560.00
  },
  {
    id: 2,
    name: "Express Global",
    logo: "public/lovable-uploads/5c504b98-0758-4fac-a9d0-505dd256c833.png",
    deliveryTime: "2 - 3 Working Days",
    rate: 15890.00
  },
  {
    id: 3,
    name: "Swift Parcels",
    logo: "public/lovable-uploads/5c504b98-0758-4fac-a9d0-505dd256c833.png",
    deliveryTime: "4 - 7 Working Days",
    rate: 9450.00
  }
];

// List of countries
const COUNTRIES = [
  "Australia", "Bangladesh", "Canada", "China", "France", 
  "Germany", "India", "Japan", "Malaysia", "Pakistan", 
  "Singapore", "Srilanka", "Thailand", "United Kingdom", "United States"
];

const CalculatorPage = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("Grams");
  const [calculatedResults, setCalculatedResults] = useState<boolean>(false);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [showShipmentDetails, setShowShipmentDetails] = useState(false);

  const handleCalculate = () => {
    if (!weight || parseFloat(weight) <= 0) {
      setWeightError("Please enter a valid weight");
      return;
    }
    
    const weightValue = parseFloat(weight);
    if (weightValue > 30000) {
      setWeightError("Weight must be less than or equal to 30000");
      return;
    }
    
    setWeightError(null);
    setCalculatedResults(true);
  };

  const handleExportClick = () => {
    setShowShipmentDetails(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Shipping Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Input Form */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90" size="lg">
                      <Download className="mr-2 h-5 w-5" />
                      Import
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-4">
                      <h4 className="font-medium">Import Shipments</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="csv-import" />
                          <Label htmlFor="csv-import">From CSV</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="excel-import" />
                          <Label htmlFor="excel-import">From Excel</Label>
                        </div>
                      </div>
                      <Button className="w-full">Import File</Button>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button 
                  className="bg-primary/20 text-primary hover:bg-primary/30" 
                  size="lg"
                  onClick={handleExportClick}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Export
                </Button>
                
                {showShipmentDetails && (
                  <Popover open={showShipmentDetails} onOpenChange={setShowShipmentDetails}>
                    <PopoverContent className="w-56">
                      <div className="space-y-4">
                        <h4 className="font-medium">Shipment Details</h4>
                        <div className="space-y-2">
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium">From:</span>
                            <span className="text-sm">{fromCountry || "Not selected"}</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium">To:</span>
                            <span className="text-sm">{toCountry || "Not selected"}</span>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm font-medium">Weight:</span>
                            <span className="text-sm">{weight ? `${weight} ${unit}` : "Not specified"}</span>
                          </div>
                        </div>
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pdf-export" />
                            <Label htmlFor="pdf-export">PDF</Label>
                            <FileType className="h-4 w-4 text-primary ml-auto" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="excel-export" />
                            <Label htmlFor="excel-export">Excel</Label>
                            <FileSpreadsheet className="h-4 w-4 text-primary ml-auto" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="csv-export" />
                            <Label htmlFor="csv-export">CSV</Label>
                            <File className="h-4 w-4 text-primary ml-auto" />
                          </div>
                          <div className="flex items-center space-x-2 pt-2 border-t">
                            <Checkbox id="include-headers" />
                            <Label htmlFor="include-headers">Include Headers</Label>
                          </div>
                        </div>
                        <Button className="w-full">Export Selected</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="from">From</Label>
                  <Select value={fromCountry} onValueChange={setFromCountry}>
                    <SelectTrigger id="from" className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="to">To</Label>
                  <Select value={toCountry} onValueChange={setToCountry}>
                    <SelectTrigger id="to" className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      id="weight"
                      className="col-span-2"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      type="number"
                      placeholder="Enter weight"
                    />
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grams">Grams</SelectItem>
                        <SelectItem value="Kg">Kg</SelectItem>
                        <SelectItem value="Lbs">Lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {weightError && (
                    <p className="text-destructive text-sm mt-1 flex items-center">
                      <span className="h-1 w-1 bg-destructive rounded-full mr-2"></span>
                      {weightError}
                    </p>
                  )}
                  {!weightError && (
                    <p className="text-destructive text-sm mt-1 flex items-center">
                      <span className="h-1 w-1 bg-destructive rounded-full mr-2"></span>
                      Weight must be less than or equal to 30000
                    </p>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
                  onClick={handleCalculate}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right side - Results */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 px-4 py-2 font-medium text-muted-foreground">
              <div className="col-span-2">Courier Service Provider</div>
              <div>Delivery Duration</div>
              <div>Rate (INR)</div>
            </div>

            {/* Results */}
            {calculatedResults && SHIPPING_PROVIDERS.map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 items-center">
                    <div className="col-span-2 flex items-center space-x-4">
                      <div className="h-12 w-16 relative flex-shrink-0">
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                      </div>
                    </div>
                    
                    <div className="md:hidden font-medium text-sm text-muted-foreground">Delivery Duration</div>
                    <div className="text-gray-700">{provider.deliveryTime}</div>
                    
                    <div className="md:hidden font-medium text-sm text-muted-foreground">Rate</div>
                    <div className="font-bold text-primary text-lg flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      {provider.rate.toFixed(2)}
                      <Button size="sm" className="bg-primary text-white hover:bg-primary/90 w-full md:w-auto">
                        ADD SHIPMENT
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-border p-4">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1 h-6 bg-primary mr-2 rounded"></span>
                      Add Shipment: End to end tracking update.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {!calculatedResults && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ArrowRight className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Enter details and calculate to see shipping options</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalculatorPage;
