
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
  const [nfcCode, setNfcCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activateNFCCard } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await activateNFCCard(nfcCode);
      toast({
        title: "NFC Card Activated",
        description: "Your card has been successfully linked to your account.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Activation Failed",
        description: "Invalid or already used NFC code. Please try again.",
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
              Activate NFC Card
            </CardTitle>
            <CardDescription>
              Enter your NFC card activation code to link it with your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nfcCode">NFC Activation Code</Label>
                <Input
                  id="nfcCode"
                  placeholder="Enter your activation code"
                  value={nfcCode}
                  onChange={(e) => setNfcCode(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  You can find this code on your physical NFC card
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
