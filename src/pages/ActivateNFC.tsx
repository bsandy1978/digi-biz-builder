
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useNFCCards } from "@/hooks/useNFCCards";

const ActivateNFC = () => {
  const [activationCode, setActivationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activateNFCCard } = useAuth();
  const { checkCardActivation } = useNFCCards();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if activation code follows the pattern CARD-XXXXXX
      const isValidCode = /^CARD-[0-9A-Z]{6}$/.test(activationCode);
      
      if (!isValidCode) {
        throw new Error("Please enter a valid activation code (format: CARD-XXXXXX)");
      }

      // Check if card is valid and unclaimed
      const card = await checkCardActivation(activationCode);
      
      if (!card) {
        throw new Error("Invalid or already claimed activation code");
      }

      // Store the activation code in localStorage temporarily
      localStorage.setItem('pendingActivationCode', activationCode);
      localStorage.setItem('pendingCardId', card.id);

      toast({
        title: "Card Verified Successfully!",
        description: "Now, please create an account to link this card to your profile.",
      });

      // If user is already logged in, claim card automatically
      if (isAuthenticated) {
        await activateNFCCard(activationCode);
        toast({
          title: "Card Claimed Successfully!",
          description: "Your digital business card has been activated.",
        });
        navigate("/editor/new");
      } else {
        // Navigate to signup page to complete the process
        navigate("/signup");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid or already claimed activation code. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500">
                <path d="M17 3v5H7V3" />
                <path d="M15 12v3m-3-3v3m-3-3v3" />
                <rect width="14" height="18" x="5" y="3" rx="2" />
              </svg>
              Verify Your Business Card
            </CardTitle>
            <CardDescription>
              Enter your card's activation code to verify and claim your digital profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activationCode">Activation Code</Label>
                <Input
                  id="activationCode"
                  placeholder="Enter your activation code (e.g., CARD-ABC123)"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  pattern="CARD-[0-9A-Z]{6}"
                  required
                />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>You can find this code on your physical NFC business card package</p>
                  <p>Format: CARD-XXXXXX (where X can be numbers or letters)</p>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                    Verifying Card...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ActivateNFC;
