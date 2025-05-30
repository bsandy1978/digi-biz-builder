
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoInstructions, setShowDemoInstructions] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting login form with email:', email);
      await login(email, password);
      // If login is successful, navigate will happen automatically due to the useEffect above
    } catch (error) {
      console.error("Login error caught in form:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle demo login for test accounts
  const handleDemoLogin = async (demoEmail: string) => {
    try {
      setIsSubmitting(true);
      console.log('Using demo credentials:', demoEmail);
      
      // First check if the demo account exists
      const { data } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: "password"
      });
      
      if (data.user) {
        // User exists, proceed with login
        await login(demoEmail, "password");
      } else {
        // User doesn't exist, show instructions
        setShowDemoInstructions(true);
        toast({
          title: "Demo account not found",
          description: "Please create the demo accounts first using the instructions below.",
        });
      }
    } catch (error) {
      console.error("Demo login error:", error);
      setShowDemoInstructions(true);
      toast({
        title: "Demo accounts not set up",
        description: "Please create the demo accounts first using the instructions below.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const createDemoAccounts = async () => {
    setIsSubmitting(true);
    try {
      // Create user account
      const { error: userError } = await supabase.auth.signUp({
        email: "user@example.com",
        password: "password",
        options: {
          data: {
            first_name: "Demo",
            last_name: "User"
          }
        }
      });
      
      if (userError) throw userError;
      
      // Create admin account
      const { error: adminError } = await supabase.auth.signUp({
        email: "admin@example.com",
        password: "password",
        options: {
          data: {
            first_name: "Demo",
            last_name: "Admin"
          }
        }
      });
      
      if (adminError) throw adminError;
      
      toast({
        title: "Demo accounts created",
        description: "The demo accounts have been created. Please check your Supabase dashboard to confirm the email addresses or disable email confirmation in your Supabase settings.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create demo accounts",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <div className="w-full max-w-md">
          <Card className="shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showDemoInstructions && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Demo accounts don't exist yet. Click the "Create Demo Accounts" button below to create them.
                  </AlertDescription>
                </Alert>
              )}
            
              <div className="space-y-2">
                <GoogleLoginButton className="w-full" />
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-brand-600 hover:text-brand-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Loading...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="mt-4 text-center text-sm">
                  For demo purposes:
                  <div className="mt-1 flex space-x-2 justify-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDemoLogin("user@example.com")}
                      disabled={isSubmitting}
                      type="button"
                    >
                      User Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDemoLogin("admin@example.com")}
                      disabled={isSubmitting}
                      type="button"
                    >
                      Admin Demo
                    </Button>
                  </div>
                  {showDemoInstructions && (
                    <Button
                      variant="secondary"
                      className="mt-3 w-full"
                      disabled={isSubmitting}
                      onClick={createDemoAccounts}
                    >
                      Create Demo Accounts
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-brand-600 hover:text-brand-700">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
