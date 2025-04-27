
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

const ActivateNFC = () => {
  const [activationCode, setActivationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activateNFCCard } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if activation code follows the pattern CARD-XXXXXX
      const isValidCode = /^CARD-[0-9A-Z]{6}$/.test(activationCode);
      
      if (!isValidCode) {
        throw new Error("Invalid activation code format");
      }

      await activateNFCCard(activationCode);
      toast({
        title: "Card Activated",
        description: "Your digital business card has been successfully activated. You can now customize it.",
      });
      navigate("/editor/new");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Activation Failed",
        description: error instanceof Error ? error.message : "Invalid or already used activation code. Please try again.",
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
              Activate Your Business Card
            </CardTitle>
            <CardDescription>
              Enter your card's activation code to set up your digital profile
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
                <p className="text-sm text-muted-foreground">
                  You can find this code on your physical NFC business card package
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
                    Activating...
                  </>
                ) : (
                  "Activate Card"
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
