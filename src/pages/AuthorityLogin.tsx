import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/language";

const AuthorityLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - replace with actual auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to the Authority Dashboard",
      });
      // Redirect to admin dashboard - replace with actual navigation
      window.location.href = "/admin/dashboard";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float [animation-delay:3s]"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-success/10 rounded-full blur-2xl animate-float [animation-delay:6s]"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Enhanced Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow ios-card-large flex items-center justify-center mx-auto mb-6 shadow-glow animate-pulse-soft">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary-hover bg-clip-text text-transparent animate-gradient-shift">
              Authority Portal
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Secure access for municipal staff and administrators
            </p>
          </div>

          {/* Enhanced Login Form */}
          <Card className="ios-card-large glass-card border-0 shadow-elegant animate-slide-up">
            <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-border/50 text-center pb-8">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Sign In
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Enter your credentials to access the dashboard
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-8">
                {/* Email Field */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 ios-card-small border-2 border-border/50 focus:border-primary/50 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-14 ios-card-small border-2 border-border/50 focus:border-primary/50 transition-all duration-300 text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-primary-glow hover:from-primary-hover hover:to-primary text-white ios-card-large transition-all duration-300 hover:scale-105 hover:shadow-elegant shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Back to Citizen Portal */}
              <div className="mt-8 text-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 ios-card-small px-4 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Citizen Portal
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorityLogin;