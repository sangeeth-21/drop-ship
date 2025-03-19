import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowLeft, Box, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { LogisticsAnimation } from "@/components/LogisticsAnimation";
import Cookies from "js-cookie"; // For handling cookies
import { jwtDecode } from "jwt-decode"; // For decoding JWT tokens

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's a redirect path in the location state
  const from = location.state?.from?.pathname || "/dashboard/store";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make API call to login
      const response = await fetch("https://drop.ksangeeth76.workers.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { token } = data;

      // Decode the JWT token
      const decodedToken: {
        uid: string;
        role: string;
        status: string;
        poistatus: string;
        iat: number;
        exp: number;
      } = jwtDecode(token);

      // Log the decoded token
      console.log("Decoded Token:", decodedToken);

      // Save uid and poistatus in cookies
      Cookies.set("uid", decodedToken.uid, { expires: 1 }); // Expires in 1 day
      Cookies.set("poistatus", decodedToken.poistatus, { expires: 1 });

      // Redirect based on role
      if (decodedToken.role === "admin") {
        navigate("/admin/dashboard"); // Redirect admin to admin dashboard
      } else {
        // Redirect non-admin users based on poistatus
        if (decodedToken.poistatus === "pending") {
          navigate("/userform");
        } else if (decodedToken.poistatus === "uploaded") {
          navigate("/wait-for-approval");
        } else if (decodedToken.poistatus === "success") {
          navigate("/dashboard/store");
        } else {
          throw new Error("Unknown poistatus");
        }
      }

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    // Simulate Google login process
    setTimeout(() => {
      setLoading(false);
      toast.success("Google login successful!");
      navigate("/dashboard/store");
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
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4 animate-slide-up">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
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

                <Button type="submit" disabled={loading} className="w-full h-12 bg-primary hover:bg-primary/90 transition-all">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="relative flex items-center animate-fade-in">
                <div className="flex-grow border-t border-border"></div>
                <span className="mx-4 text-xs text-muted-foreground">OR</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                variant="outline"
                className="w-full relative bg-card h-12 animate-slide-up"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Continue with Google
              </Button>

              <div className="text-center text-sm animate-fade-in">
                <span className="text-muted-foreground">Don't have an account?</span>{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;