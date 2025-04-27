
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { generateUniqueCode } from "@/lib/cardUtils";
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

  // Mock data for cards (in production, this would come from your backend)
  const cards = [
    {
      id: "1",
      owner: "Unclaimed",
      email: "-",
      nfcId: "NFC001",
      activationCode: "CARD-123ABC",
      status: "unclaimed",
      lastModified: "2025-04-27",
    },
    {
      id: "2",
      owner: "Jane Smith",
      email: "jane@example.com",
      nfcId: "NFC002",
      activationCode: "CARD-456DEF",
      status: "claimed",
      lastModified: "2025-04-26",
    },
  ];

  const handleGenerateCard = () => {
    setGeneratingCard(true);
    
    // Generate a new unique activation code
    const newCode = generateUniqueCode();
    toast({
      title: "New Card Generated",
      description: `Activation code: ${newCode}. Ready to be dispatched.`,
    });
    setGeneratingCard(false);
  };

  if (loading) {
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
                  <TableHead>Email</TableHead>
                  <TableHead>NFC ID</TableHead>
                  <TableHead>Activation Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.owner}</TableCell>
                    <TableCell>{card.email}</TableCell>
                    <TableCell>{card.nfcId}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded">
                        {card.activationCode}
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
                    <TableCell>{card.lastModified}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/editor/${card.id}`)}
                          disabled={card.status === 'unclaimed'}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(card.activationCode);
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManageCards;
