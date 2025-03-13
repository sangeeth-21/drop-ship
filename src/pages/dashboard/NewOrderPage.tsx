import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Package, 
  Plus, 
  ChevronDown, 
  User, 
  ArrowRight, 
  Box, 
  CreditCard, 
  X,
  Check,
  Copy,
  CreditCard as PaymentIcon,
  IndianRupee
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define Razorpay for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

const NewOrderPage = () => {
  const [activeTab, setActiveTab] = useState("receiver");
  const [shipments, setShipments] = useState([{ id: 1, name: "Shipment 1" }]);
  const [activeShipment, setActiveShipment] = useState(1);
  const [orderTotal, setOrderTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showDepositDetails, setShowDepositDetails] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    vatTax: "",
    phone: "",
    email: "",
    company: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    addressLine4: "",
    zipcode: "",
    country: "",
    courierService: "",
    itemName: "",
    weight: "",
    purpose: "",
    value: "",
    packagingMethod: "",
    width: "",
    length: "",
    height: ""
  });

  useEffect(() => {
    // Update bank details visibility based on selected payment method
    setShowBankDetails(paymentMethod === "bank-transfer");
    setShowDepositDetails(paymentMethod === "bank-deposit");
  }, [paymentMethod]);

  const toggleBodyScrolling = (disable: boolean) => {
    if (disable) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Restore the scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addShipment = () => {
    const newId = shipments.length + 1;
    setShipments([...shipments, { id: newId, name: `Shipment ${newId}` }]);
    setActiveShipment(newId);
  };

  const removeShipment = (id: number) => {
    if (shipments.length > 1) {
      const newShipments = shipments.filter(shipment => shipment.id !== id);
      setShipments(newShipments);
      setActiveShipment(newShipments[0].id);
    } else {
      toast.error("You must have at least one shipment");
    }
  };

  const generateOrderNumber = () => {
    const prefix = "ORD";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const initRazorpay = () => {
    // Calculate order amount
    const total = formData.value ? parseFloat(formData.value) : 0;
    setOrderTotal(total);
    
    // Disable scrolling when Razorpay is opened
    toggleBodyScrolling(true);
    
    const options = {
      key: "rzp_test_yourtestkey", // Replace with your test key
      amount: total * 100, // Amount in smallest currency unit (e.g., paise for INR)
      currency: "INR",
      name: "Drop & Ship",
      description: "Payment for shipping order",
      image: "https://example.com/your_logo.png",
      handler: function(response: any) {
        // Re-enable scrolling after payment is complete
        toggleBodyScrolling(false);
        
        const generatedOrderNumber = generateOrderNumber();
        setOrderNumber(generatedOrderNumber);
        setShowSuccessDialog(true);
      },
      modal: {
        ondismiss: function() {
          // Re-enable scrolling if the modal is dismissed
          toggleBodyScrolling(false);
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#3399cc"
      }
    };

    try {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      // Re-enable scrolling in case of error
      toggleBodyScrolling(false);
      
      console.error("Razorpay initialization failed:", error);
      toast.error("Payment gateway initialization failed. Please try again.");
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "online") {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          initRazorpay();
        };
        document.body.appendChild(script);
      } else {
        initRazorpay();
      }
    } else {
      // For other payment methods, just show success
      const generatedOrderNumber = generateOrderNumber();
      setOrderNumber(generatedOrderNumber);
      setShowSuccessDialog(true);
    }
  };

  const handleSectionNavigation = (section: string) => {
    setActiveTab(section);
  };

  const copyBankDetails = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Bank details copied to clipboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/dashboard/drop-ship" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
            <span className="font-semibold">Back to Drop & Ship</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight">New Order</h1>
            </div>
          </div>

          {/* Shipment Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto hide-scrollbar">
            {shipments.map((shipment) => (
              <div 
                key={shipment.id}
                className={`flex items-center ${activeShipment === shipment.id ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-md overflow-hidden`}
              >
                <button
                  onClick={() => setActiveShipment(shipment.id)}
                  className="px-4 py-2 text-sm font-medium"
                >
                  {shipment.name}
                </button>
                {shipments.length > 1 && (
                  <button
                    onClick={() => removeShipment(shipment.id)}
                    className="p-2 hover:bg-primary/90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addShipment}
              className="p-2 bg-muted rounded-md hover:bg-muted/80"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Receiver Information Section */}
              <Card className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={() => handleSectionNavigation("receiver")}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Receiver Information</h2>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${activeTab === "receiver" ? "rotate-180" : ""}`} 
                  />
                </div>
                
                {activeTab === "receiver" && (
                  <CardContent className="pb-6 pt-0 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("country", value)} 
                          value={formData.country}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="singapore">Singapore</SelectItem>
                            <SelectItem value="malaysia">Malaysia</SelectItem>
                            <SelectItem value="thailand">Thailand</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courierService">Courier Service</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("courierService", value)} 
                          value={formData.courierService}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Courier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dhl">DHL</SelectItem>
                            <SelectItem value="fedex">FedEx</SelectItem>
                            <SelectItem value="ups">UPS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          className="h-12"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          className="h-12"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Phone Number"
                          className="h-12"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vatTax">VAT/TAX</Label>
                        <Input
                          id="vatTax"
                          name="vatTax"
                          placeholder="VAT/TAX"
                          className="h-12"
                          value={formData.vatTax}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="h-12"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Company"
                          className="h-12"
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="addressLine1">Address line 1</Label>
                        <Input
                          id="addressLine1"
                          name="addressLine1"
                          placeholder="Address"
                          className="h-12"
                          value={formData.addressLine1}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressLine2">Address line 2</Label>
                        <Input
                          id="addressLine2"
                          name="addressLine2"
                          placeholder="Address"
                          className="h-12"
                          value={formData.addressLine2}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="addressLine3">Address line 3 (Optional)</Label>
                        <Input
                          id="addressLine3"
                          name="addressLine3"
                          placeholder="Address"
                          className="h-12"
                          value={formData.addressLine3}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressLine4">Address line 4 (Optional)</Label>
                        <Input
                          id="addressLine4"
                          name="addressLine4"
                          placeholder="Address"
                          className="h-12"
                          value={formData.addressLine4}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="zipcode">Zipcode/Postalcode</Label>
                        <Input
                          id="zipcode"
                          name="zipcode"
                          placeholder="Zipcode"
                          className="h-12"
                          value={formData.zipcode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleSectionNavigation("item")}
                        className="flex items-center gap-2"
                      >
                        <span>Item Information</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Item Information Section */}
              <Card className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={() => handleSectionNavigation("item")}
                >
                  <div className="flex items-center gap-2">
                    <Box className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Item Information</h2>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${activeTab === "item" ? "rotate-180" : ""}`} 
                  />
                </div>
                
                {activeTab === "item" && (
                  <CardContent className="pb-6 pt-0 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      To add multiple items in one shipment press + button
                    </p>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="weight">Total Weight (grams)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        placeholder="Weight"
                        className="h-12"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="itemName">Item name</Label>
                      <Input
                        id="itemName"
                        name="itemName"
                        placeholder="Mention item name"
                        className="h-12"
                        value={formData.itemName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="purpose">Purpose</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("purpose", value)} 
                          value={formData.purpose}
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select Purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gift">Gift</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="sample">Sample</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <div className="relative">
                          <Input
                            id="value"
                            name="value"
                            placeholder="0.00"
                            className="h-12 pl-12"
                            value={formData.value}
                            onChange={handleInputChange}
                          />
                          <div className="absolute left-0 top-0 h-full flex items-center pl-3 text-muted-foreground">
                            LKR
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mb-6">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        <span>Add Item</span>
                      </Button>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleSectionNavigation("package")}
                        className="flex items-center gap-2"
                      >
                        <span>Package Information</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Package Information Section */}
              <Card className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={() => handleSectionNavigation("package")}
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Package Information</h2>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${activeTab === "package" ? "rotate-180" : ""}`} 
                  />
                </div>
                
                {activeTab === "package" && (
                  <CardContent className="pb-6 pt-0 border-t">
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="packagingMethod">Packaging method</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange("packagingMethod", value)} 
                        value={formData.packagingMethod}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select packaging method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="box">Box</SelectItem>
                          <SelectItem value="envelope">Envelope</SelectItem>
                          <SelectItem value="tube">Tube</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between mb-4">
                        <div className="w-full md:w-1/3 mb-4 md:mb-0 space-y-2">
                          <Label htmlFor="width">Width</Label>
                          <div className="relative">
                            <Input
                              id="width"
                              name="width"
                              placeholder="0"
                              className="h-12 pr-12"
                              value={formData.width}
                              onChange={handleInputChange}
                            />
                            <div className="absolute right-0 top-0 h-full flex items-center pr-3 text-muted-foreground">
                              cm
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0 space-y-2">
                          <Label htmlFor="length">Length</Label>
                          <div className="relative">
                            <Input
                              id="length"
                              name="length"
                              placeholder="0"
                              className="h-12 pr-12"
                              value={formData.length}
                              onChange={handleInputChange}
                            />
                            <div className="absolute right-0 top-0 h-full flex items-center pr-3 text-muted-foreground">
                              cm
                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 space-y-2">
                          <Label htmlFor="height">Height</Label>
                          <div className="relative">
                            <Input
                              id="height"
                              name="height"
                              placeholder="0"
                              className="h-12 pr-12"
                              value={formData.height}
                              onChange={handleInputChange}
                            />
                            <div className="absolute right-0 top-0 h-full flex items-center pr-3 text-muted-foreground">
                              cm
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <img 
                          src="/public/lovable-uploads/6199e3c9-b00f-42e9-b277-78c15a2d3619.png" 
                          alt="Package box dimensions" 
                          className="max-w-[200px] opacity-80"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleSectionNavigation("payment")}
                        className="flex items-center gap-2"
                      >
                        <span>Payment Information</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Payment Information Section */}
              <Card className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={() => handleSectionNavigation("payment")}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${activeTab === "payment" ? "rotate-180" : ""}`} 
                  />
                </div>
                
                {activeTab === "payment" && (
                  <CardContent className="pb-6 pt-0 border-t">
                    <h3 className="font-medium mb-4">Select Preferred Payment Information</h3>
                    
                    <RadioGroup
                      defaultValue="bank-transfer"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="flex items-center gap-2">
                          <span>Online Payment</span>
                        </Label>
                      </div>

                      {paymentMethod === "online" && (
                        <div className="ml-7 p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="razorpay" checked />
                            <Label htmlFor="razorpay" className="flex items-center gap-2">
                              <span>Razorpay</span>
                              <div className="flex items-center gap-1">
                                <IndianRupee className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-600 font-semibold">Pay</span>
                              </div>
                            </Label>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank-deposit" id="bank-deposit" />
                        <Label htmlFor="bank-deposit">Bank Deposit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash-payment" id="cash-payment" />
                        <Label htmlFor="cash-payment">Cash Payment</Label>
                      </div>
                    </RadioGroup>

                    {/* Bank Transfer Details */}
                    {showBankDetails && (
                      <div className="mt-4 p-4 border rounded-md bg-muted/50">
                        <h4 className="font-medium mb-2">Bank Account Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account Name:</span>
                            <div className="flex items-center gap-1">
                              <span>Drop & Ship Ltd</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("Drop & Ship Ltd")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account Number:</span>
                            <div className="flex items-center gap-1">
                              <span>12345678901234</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("12345678901234")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank Name:</span>
                            <div className="flex items-center gap-1">
                              <span>International Bank</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("International Bank")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Branch:</span>
                            <div className="flex items-center gap-1">
                              <span>Main Branch</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("Main Branch")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">SWIFT/BIC:</span>
                            <div className="flex items-center gap-1">
                              <span>INTLBANK123</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("INTLBANK123")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bank Deposit Details */}
                    {showDepositDetails && (
                      <div className="mt-4 p-4 border rounded-md bg-muted/50">
                        <h4 className="font-medium mb-2">Deposit Account Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account Name:</span>
                            <div className="flex items-center gap-1">
                              <span>Drop & Ship Deposits</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("Drop & Ship Deposits")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account Number:</span>
                            <div className="flex items-center gap-1">
                              <span>98765432109876</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("98765432109876")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank Name:</span>
                            <div className="flex items-center gap-1">
                              <span>Local National Bank</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("Local National Bank")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Branch:</span>
                            <div className="flex items-center gap-1">
                              <span>City Center Branch</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-5 w-5"
                                onClick={() => copyBankDetails("City Center Branch")}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-center mt-8">
                      <Button 
                        className="w-full md:w-auto px-8 py-6 text-base"
                        onClick={handlePlaceOrder}
                      >
                        <Check className="h-5 w-5 mr-2" />
                        Done
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="bg-muted p-3 rounded-lg flex items-center justify-between">
                        <span>Shipment {activeShipment}</span>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                          LKR {formData.value || 0}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-sm text-muted-foreground">Weight</span>
                          <span className="font-medium">{formData.weight || "0"}g</span>
                        </div>
                        <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-sm text-muted-foreground">Country</span>
                          <span className="font-medium capitalize">{formData.country || "N/A"}</span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-sm text-muted-foreground">Courier Service</span>
                        <span className="font-medium capitalize">{formData.courierService || "N/A"}</span>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center font-semibold">
                          <span>Order Total:</span>
                          <span>LKR {formData.value || "0"}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full py-6" 
                        onClick={handlePlaceOrder}
                      >
                        <Check className="h-5 w-5 mr-2" />
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-xl">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              Order Placed Successfully
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your order has been placed successfully
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">LKR {formData.value || "0"}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/dashboard/orders">View Orders</Link>
              </Button>
              <Button onClick={() => setShowSuccessDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewOrderPage;
