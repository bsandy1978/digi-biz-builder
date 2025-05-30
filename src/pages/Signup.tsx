
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingActivationCode, setPendingActivationCode] = useState<string | null>(null);
  const [pendingCardId, setPendingCardId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if there's a pending card activation
  useEffect(() => {
    const storedActivationCode = localStorage.getItem('pendingActivationCode');
    const storedCardId = localStorage.getItem('pendingCardId');
    
    if (storedActivationCode) {
      setPendingActivationCode(storedActivationCode);
    }
    
    if (storedCardId) {
      setPendingCardId(storedCardId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) throw error;

      // If there's a pending card activation, link it to the user
      if (data.user && pendingActivationCode) {
        try {
          const { error: cardError } = await supabase
            .from('nfc_cards')
            .update({ 
              user_id: data.user.id,
              status: 'claimed'
            })
            .eq('activation_code', pendingActivationCode);

          if (cardError) {
            console.error("Error claiming NFC card:", cardError);
            toast({
              variant: "destructive",
              title: "Card linking failed",
              description: "Your account was created but we couldn't link your NFC card. Please try activating it again.",
            });
          } else {
            // Clear stored activation data
            localStorage.removeItem('pendingActivationCode');
            localStorage.removeItem('pendingCardId');
            
            toast({
              title: "Account created with NFC card",
              description: "Your account is created and your NFC card is now linked to your profile.",
            });
          }
        } catch (cardError) {
          console.error("Error processing card linking:", cardError);
        }
      } else {
        toast({
          title: "Account created",
          description: "You can now log in with your credentials.",
        });
      }

      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
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
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create your account
              </CardDescription>
              
              {pendingActivationCode && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription>
                    NFC card is ready to be linked to your new account
                  </AlertDescription>
                </Alert>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center">
                By clicking Sign Up, you agree to our{" "}
                <Link to="/terms" className="underline">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline">Privacy Policy</Link>.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-600 hover:text-brand-700">
                  Log in
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

export default Signup;
