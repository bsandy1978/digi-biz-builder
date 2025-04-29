
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { useNFCCards } from "@/hooks/useNFCCards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManageCards = () => {
  const { isAdmin, loading } = useAuth();
  const { nfcCards, isLoading: cardsLoading, generateCard } = useNFCCards();
  const navigate = useNavigate();
  const [generatingCard, setGeneratingCard] = useState(false);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to view this page.",
      });
      navigate("/dashboard");
    }
  }, [loading, isAdmin, navigate]);

  const handleGenerateCard = async () => {
    setGeneratingCard(true);
    
    try {
      // Pass undefined to make it clear we're intentionally not providing an NFC ID
      await generateCard.mutateAsync(undefined);
    } catch (error) {
      console.error("Error generating card:", error);
    } finally {
      setGeneratingCard(false);
    }
  };

  if (loading || cardsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Business Cards</h1>
            <p className="text-muted-foreground">
              Generate and manage NFC business cards
            </p>
          </div>
          <Button 
            onClick={handleGenerateCard}
            disabled={generatingCard}
          >
            {generatingCard ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                Generating...
              </>
            ) : (
              'Generate New Card'
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Business Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner</TableHead>
                  <TableHead>NFC ID</TableHead>
                  <TableHead>Activation Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nfcCards && nfcCards.length > 0 ? (
                  nfcCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell>{card.user_id ? card.user_id.substring(0, 8) + "..." : "Unclaimed"}</TableCell>
                      <TableCell>{card.nfc_id || "Not set"}</TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded">
                          {card.activation_code}
                        </code>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          card.status === 'claimed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {card.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(card.created_at || "").toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(card.activation_code);
                              toast({
                                title: "Copied!",
                                description: "Activation code copied to clipboard",
                              });
                            }}
                          >
                            Copy Code
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No NFC cards found. Generate one to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageCards;
