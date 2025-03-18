
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowLeft, Box, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { LogisticsAnimation } from "@/components/LogisticsAnimation";
import { useAuth } from "@/contexts/AuthContext";
import { Icons } from "@/components/icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await signup(email, password);
      
      if (success) {
        toast.success("Signup successful!");
        // Redirect to user form
        navigate("/user-form");
      } else {
        toast.error("Failed to create account");
      }
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
      toast.success("Google signup successful!");
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
              <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-10"
                      required
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 pr-10"
                      required
                    />
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
              
              <p className="px-8 text-center text-xs text-muted-foreground animate-fade-in">
                By creating an account, you agree to our{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
