import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowLeft, Box, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { LogisticsAnimation } from "@/components/LogisticsAnimation";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch("https://drop.ksangeeth76.workers.dev/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      const token = data.token; // Assuming the token is returned in the response

      // Save the JWT token as a cookie
      Cookies.set("jwt_token", token, { expires: 7 }); // Expires in 7 days

      toast.success("Account created successfully!");
      navigate("/user-form");
    } catch (error) {
      toast.error("An error occurred during signup");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    
    // Simulate Google signup process
    setTimeout(() => {
      setLoading(false);
      toast.success("Google account connected!");
      navigate("/user-form");
    }, 1500);
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
      
      <div className="flex-1 flex lg:flex-row flex-col items-stretch">
        <div className="lg:w-1/2 hidden lg:block bg-gradient-to-br from-purple-600/10 to-purple-800/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <LogisticsAnimation />
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto animate-scale-in">
            <div className="text-center mb-8 animate-fade-in">
              <Link to="/" className="inline-flex items-center justify-center mb-6">
                <Box className="h-8 w-8 text-primary mr-2" />
                <span className="text-2xl font-bold">Drop & Ship</span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Create an account</h1>
              <p className="text-muted-foreground">Sign up to get started with Drop & Ship</p>
            </div>
            
            <div className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-4 animate-slide-up">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-10"
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" disabled={loading} className="w-full h-12 bg-primary hover:bg-primary/90 transition-all">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>
              
              <div className="relative flex items-center animate-fade-in">
                <div className="flex-grow border-t border-border"></div>
                <span className="mx-4 text-xs text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              
              <Button 
                onClick={handleGoogleSignup} 
                disabled={loading} 
                variant="outline" 
                className="w-full relative bg-card h-12 animate-slide-up"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>
              
              <div className="text-center text-sm animate-fade-in">
                <span className="text-muted-foreground">Already have an account?</span>{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;