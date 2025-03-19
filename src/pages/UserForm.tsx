import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowLeft, Box, Check, Upload } from "lucide-react";
import { toast } from "sonner";
import { LogisticsAnimation } from "@/components/LogisticsAnimation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UserForm = () => {
  const navigate = useNavigate();
  const [email] = useState("abc@gmail.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [addressLine4, setAddressLine4] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [poiType, setPoiType] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendOTP = () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }
    
    toast.success("OTP sent to your phone number");
    setTimeout(() => {
      setIsVerified(true);
      toast.success("Phone number verified successfully");
    }, 1500);
  };

  const handleFileChange = (type: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'front') {
        setFrontFile(file);
        toast.success("Front file selected");
      } else {
        setBackFile(file);
        toast.success("Back file selected");
      }
    }
  };

  const uploadImages = async (): Promise<{ frontUrl: string; backUrl: string }> => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      throw new Error("No token found");
    }

    const formData = new FormData();
    if (frontFile) formData.append("file1", frontFile);
    if (backFile) formData.append("file2", backFile);

    const response = await fetch("https://drop.ksangeeth76.workers.dev/upload/uploadpoi", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    const data = await response.json();
    return { frontUrl: data.urls[0], backUrl: data.urls[1] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!firstName || !lastName || !phoneNumber || !addressLine1 || !postalCode || !country || !poiType) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!isVerified) {
      toast.error("Please verify your phone number");
      setLoading(false);
      return;
    }

    if (!frontFile || !backFile) {
      toast.error("Please upload proof of identification");
      setLoading(false);
      return;
    }

    try {
      // Upload images and get URLs
      const { frontUrl, backUrl } = await uploadImages();

      // Get the JWT token from cookies
      const token = Cookies.get("jwt_token");
      if (!token) {
        throw new Error("No token found");
      }

      // Decode the token to get the UID
      const decodedToken: { uid: string } = jwtDecode(token);
      const uid = decodedToken.uid;

      // Prepare the request body
      const requestBody = {
        firstname: firstName,
        lastname: lastName,
        phonenumber: phoneNumber,
        addresslane1: addressLine1,
        addresslane2: addressLine2,
        addresslane3: addressLine3,
        addresslane4: addressLine4,
        postalcode: postalCode,
        country: country,
        state: "", // Add state if required
        frontcopy: frontUrl,
        backcopy: backUrl,
      };

      // Send the request to update user profile
      const response = await fetch(`https://drop.ksangeeth76.workers.dev/userupdate/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      toast.success("User profile updated successfully!");
      navigate("/dashboard/store");
    } catch (error) {
      toast.error("An error occurred while updating the profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex lg:flex-row flex-col items-stretch h-screen">
        <div className="lg:w-1/2 hidden lg:block bg-gradient-to-br from-purple-600/10 to-purple-800/20 relative overflow-hidden h-screen lg:fixed lg:left-0">
          <div className="absolute inset-0">
            <LogisticsAnimation />
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full lg:ml-[50%] flex items-center justify-center">
          <ScrollArea className="h-screen w-full">
            <div className="w-full max-w-md mx-auto animate-scale-in p-4 py-8">
              <div className="text-center mb-8 animate-fade-in">
                <Link to="/" className="inline-flex items-center justify-center mb-6">
                  <Box className="h-8 w-8 text-primary mr-2" />
                  <span className="text-2xl font-bold">Drop & Ship</span>
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter mb-2">Your Details</h1>
                <p className="text-muted-foreground">{email}</p>
              </div>
              
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center w-full max-w-[90px] h-12 bg-background border rounded-md text-foreground px-3">
                        <span>+94</span>
                      </div>
                      
                      <div className="relative flex-1">
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      
                      {isVerified && (
                        <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full">
                          <Check size={16} />
                          <span className="text-xs font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!isVerified && (
                    <Button 
                      type="button" 
                      className="w-full h-12"
                      onClick={handleSendOTP}
                    >
                      GET OTP SMS
                    </Button>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      type="text"
                      placeholder="Address line 1"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      type="text"
                      placeholder="Address line 2"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="addressLine3">Address Line 3</Label>
                      <Input
                        id="addressLine3"
                        type="text"
                        placeholder="Address line 3"
                        value={addressLine3}
                        onChange={(e) => setAddressLine3(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="addressLine4">Address Line 4</Label>
                      <Input
                        id="addressLine4"
                        type="text"
                        placeholder="Address line 4"
                        value={addressLine4}
                        onChange={(e) => setAddressLine4(e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        type="text"
                        placeholder="Postal Code / Zip Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <h2 className="text-xl font-semibold">Proof of identification</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="poiType">Type of Identification</Label>
                      <Select value={poiType} onValueChange={setPoiType}>
                        <SelectTrigger id="poiType" className="h-12 w-full">
                          <SelectValue placeholder="Select your POI" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="driving-license">Driving License</SelectItem>
                          <SelectItem value="national-id">National ID Card</SelectItem>
                          <SelectItem value="voter-id">Voter ID Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="front-copy">Front Copy</Label>
                        <div className="relative border border-input rounded-md p-4 flex flex-col items-center justify-center bg-muted/10 h-[100px]">
                          <input
                            type="file"
                            id="front-copy"
                            className="hidden"
                            onChange={(e) => handleFileChange('front', e)}
                            accept="image/*"
                          />
                          <label 
                            htmlFor="front-copy" 
                            className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                          >
                            <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Upload Front</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="back-copy">Back Copy</Label>
                        <div className="relative border border-input rounded-md p-4 flex flex-col items-center justify-center bg-muted/10 h-[100px]">
                          <input
                            type="file"
                            id="back-copy"
                            className="hidden"
                            onChange={(e) => handleFileChange('back', e)}
                            accept="image/*"
                          />
                          <label 
                            htmlFor="back-copy" 
                            className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                          >
                            <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Upload Back</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 mt-6"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default UserForm;