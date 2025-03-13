
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown, Package, User, DollarSign, Plus, X, Check, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

interface ShipmentItem {
  id: string;
  name: string;
  weight: string;
  purpose: string;
  value: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

const AdminWalkingPage = () => {
  const [isReceiverOpen, setIsReceiverOpen] = useState(true);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [shipments, setShipments] = useState([{ id: "1", items: [] as ShipmentItem[] }]);
  const [currentShipmentIndex, setCurrentShipmentIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [users] = useState<UserData[]>([
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com" },
  ]);
  
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      vatTax: "",
      company: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      addressLine4: "",
      zipcode: "",
      country: "",
      courierService: "",
      paymentMethod: "bankTransfer",
    }
  });

  const removeShipment = (index: number) => {
    if (shipments.length === 1) return; // Keep at least one shipment
    const newShipments = [...shipments];
    newShipments.splice(index, 1);
    setShipments(newShipments);
    if (currentShipmentIndex >= newShipments.length) {
      setCurrentShipmentIndex(newShipments.length - 1);
    }
  };

  const addShipment = () => {
    const newId = (shipments.length + 1).toString();
    setShipments([...shipments, { id: newId, items: [] }]);
    setCurrentShipmentIndex(shipments.length);
  };

  const addItemToShipment = () => {
    const newShipments = [...shipments];
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: "",
      weight: "",
      purpose: "",
      value: "",
    };
    newShipments[currentShipmentIndex].items.push(newItem);
    setShipments(newShipments);
  };

  const selectUser = (user: UserData) => {
    setSelectedUser(user);
    form.setValue("firstName", user.name.split(" ")[0]);
    form.setValue("lastName", user.name.split(" ")[1] || "");
    form.setValue("email", user.email);
  };

  const handleNext = (section: string) => {
    switch (section) {
      case "receiver":
        setIsReceiverOpen(false);
        setIsItemOpen(true);
        break;
      case "item":
        setIsItemOpen(false);
        setIsPackageOpen(true);
        break;
      case "package":
        setIsPackageOpen(false);
        setIsPaymentOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Walking Shipment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* User Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-800 hover:bg-purple-900">Select User</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Select User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 max-h-[60vh] overflow-auto p-1">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center justify-between p-3 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-md cursor-pointer"
                            onClick={() => selectUser(user)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                                <User className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                selectUser(user);
                              }}
                            >
                              Select
                            </Button>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <span className="text-gray-600 dark:text-gray-400">Or</span>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-purple-900/20">
                        ADD User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="new-first-name">First Name</Label>
                            <Input id="new-first-name" />
                          </div>
                          <div>
                            <Label htmlFor="new-last-name">Last Name</Label>
                            <Input id="new-last-name" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="new-email">Email</Label>
                          <Input id="new-email" type="email" />
                        </div>
                        <div>
                          <Label htmlFor="new-phone">Phone Number</Label>
                          <Input id="new-phone" />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button className="bg-purple-800 hover:bg-purple-900">Add User</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {selectedUser && (
                  <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                    <div className="font-medium">Selected User:</div>
                    <div className="text-sm">{selectedUser.name} ({selectedUser.email})</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipment Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
              {shipments.map((shipment, index) => (
                <div
                  key={shipment.id}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md cursor-pointer",
                    currentShipmentIndex === index
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  )}
                  onClick={() => setCurrentShipmentIndex(index)}
                >
                  <span>SHIPMENT {shipment.id}</span>
                  {shipments.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeShipment(index);
                      }}
                      className="text-white hover:text-red-200"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addShipment}
                className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Receiver Information */}
              <Card className={cn(isReceiverOpen ? "ring-2 ring-purple-500" : "")}>
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setIsReceiverOpen(!isReceiverOpen)}
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-medium">Receiver Information</h3>
                  </div>
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform", isReceiverOpen ? "transform rotate-180" : "")}
                  />
                </div>
                {isReceiverOpen && (
                  <CardContent className="pt-0">
                    <Form {...form}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="country"
                            {...form.register("country")}
                          >
                            <option value="">Select Country</option>
                            <option value="kenya">Kenya</option>
                            <option value="uganda">Uganda</option>
                            <option value="tanzania">Tanzania</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="courierService">Courier Service</Label>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="courierService"
                            {...form.register("courierService")}
                          >
                            <option value="">Select Service</option>
                            <option value="standard">Standard</option>
                            <option value="express">Express</option>
                            <option value="priority">Priority</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" {...form.register("firstName")} />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" {...form.register("lastName")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input id="phoneNumber" {...form.register("phoneNumber")} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" {...form.register("email")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="vatTax">VAT/TAX</Label>
                          <Input id="vatTax" {...form.register("vatTax")} />
                        </div>
                        <div>
                          <Label htmlFor="company">Company (Optional)</Label>
                          <Input id="company" {...form.register("company")} />
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="addressLine1">Address line 1</Label>
                          <Input id="addressLine1" {...form.register("addressLine1")} />
                        </div>
                        <div>
                          <Label htmlFor="addressLine2">Address line 2</Label>
                          <Input id="addressLine2" {...form.register("addressLine2")} />
                        </div>
                        <div>
                          <Label htmlFor="addressLine3">Address line 3 (Optional)</Label>
                          <Input id="addressLine3" {...form.register("addressLine3")} />
                        </div>
                        <div>
                          <Label htmlFor="addressLine4">Address line 4 (Optional)</Label>
                          <Input id="addressLine4" {...form.register("addressLine4")} />
                        </div>
                      </div>

                      <div className="mb-6">
                        <Label htmlFor="zipcode">Zipcode/Postalcode</Label>
                        <Input id="zipcode" {...form.register("zipcode")} />
                      </div>
                    </Form>

                    <div className="flex justify-end">
                      <Button 
                        className="bg-purple-800 hover:bg-purple-900"
                        onClick={() => handleNext("receiver")}
                      >
                        Item Information <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Item Information */}
              <Card className={cn(isItemOpen ? "ring-2 ring-purple-500" : "")}>
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setIsItemOpen(!isItemOpen)}
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-medium">Item Information</h3>
                  </div>
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform", isItemOpen ? "transform rotate-180" : "")}
                  />
                </div>
                {isItemOpen && (
                  <CardContent>
                    <p className="text-sm text-purple-600 mb-4">To add multiple items in one shipment press + button</p>
                    
                    <div className="space-y-6">
                      {shipments[currentShipmentIndex].items.length === 0 ? (
                        <div className="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">No items added yet. Add an item below.</p>
                        </div>
                      ) : (
                        shipments[currentShipmentIndex].items.map((item, index) => (
                          <div key={item.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Item details fields */}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label>Total Weight (grams)</Label>
                        <Input placeholder="Weight" />
                      </div>
                      
                      <div>
                        <Label>Item name</Label>
                        <Input placeholder="Mention item name" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="purpose">Purpose</Label>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="purpose"
                          >
                            <option value="">Select Purpose</option>
                            <option value="gift">Gift</option>
                            <option value="sample">Sample</option>
                            <option value="commercial">Commercial</option>
                          </select>
                        </div>
                        <div>
                          <Label>Value</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                              LKR
                            </span>
                            <Input className="rounded-l-none" placeholder="Value" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-dashed border-gray-300 dark:border-gray-700"
                          onClick={addItemToShipment}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Another Item
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        className="bg-purple-800 hover:bg-purple-900"
                        onClick={() => handleNext("item")}
                      >
                        Package Information <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Package Information */}
              <Card className={cn(isPackageOpen ? "ring-2 ring-purple-500" : "")}>
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setIsPackageOpen(!isPackageOpen)}
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-medium">Package Information</h3>
                  </div>
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform", isPackageOpen ? "transform rotate-180" : "")}
                  />
                </div>
                {isPackageOpen && (
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <Label>Packaging method</Label>
                        <Input placeholder="Packaging method" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Width</Label>
                          <div className="flex items-center">
                            <Input placeholder="Width" />
                            <span className="ml-2">cm</span>
                          </div>
                        </div>
                        <div>
                          <Label>Length</Label>
                          <div className="flex items-center">
                            <Input placeholder="Length" />
                            <span className="ml-2">cm</span>
                          </div>
                        </div>
                        <div>
                          <Label>Height</Label>
                          <div className="flex items-center">
                            <Input placeholder="Height" />
                            <span className="ml-2">cm</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="w-64 h-auto">
                          <img 
                            src="/public/lovable-uploads/41741d7a-6657-4da2-9187-c56012f2900e.png" 
                            alt="Package dimensions illustration" 
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        className="bg-purple-800 hover:bg-purple-900"
                        onClick={() => handleNext("package")}
                      >
                        Payment Information <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Payment Information */}
              <Card className={cn(isPaymentOpen ? "ring-2 ring-purple-500" : "")}>
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                >
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-medium">Payment Information</h3>
                  </div>
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform", isPaymentOpen ? "transform rotate-180" : "")}
                  />
                </div>
                {isPaymentOpen && (
                  <CardContent>
                    <div className="space-y-6">
                      <h4 className="font-medium">Select Preferred Payment Information</h4>
                      
                      <RadioGroup defaultValue="bankTransfer">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online" className="cursor-pointer">Online</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                          <Label htmlFor="bankTransfer" className="cursor-pointer">Bank Transfer</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="bankDeposit" id="bankDeposit" />
                          <Label htmlFor="bankDeposit" className="cursor-pointer">Bank Deposit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cashPayment" id="cashPayment" />
                          <Label htmlFor="cashPayment" className="cursor-pointer">Cash Payment</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button className="bg-purple-800 hover:bg-purple-900">
                        Done <Check className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment {shipments[currentShipmentIndex]?.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between bg-purple-100 dark:bg-purple-900/20 p-3 rounded-md">
                  <span className="font-medium">Weight:</span>
                  <span>0</span>
                </div>
                
                <div className="flex justify-between bg-purple-100 dark:bg-purple-900/20 p-3 rounded-md">
                  <span className="font-medium">Country</span>
                  <span></span>
                </div>
                
                <div className="flex justify-between bg-purple-100 dark:bg-purple-900/20 p-3 rounded-md">
                  <span className="font-medium">Courier Service</span>
                  <span></span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Order Total:</span>
                  <span>LKR 0.00</span>
                </div>
                
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-5 w-5" /> Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWalkingPage;
