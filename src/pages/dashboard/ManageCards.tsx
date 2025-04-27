
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { generateUniqueCode } from "@/lib/cardUtils";

const ManageCards = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [generatingCard, setGeneratingCard] = useState(false);

  // Mock data for cards (in production, this would come from your backend)
  const cards = [
    {
      id: "1",
      owner: "John Doe",
      email: "john@example.com",
      nfcId: "NFC001",
      activationCode: "CARD-123",
      status: "unclaimed",
      lastModified: "2025-04-27",
    },
    {
      id: "2",
      owner: "Jane Smith",
      email: "jane@example.com",
      nfcId: "NFC002",
      activationCode: "CARD-456",
      status: "claimed",
      lastModified: "2025-04-26",
    },
  ];

  const handleGenerateCard = () => {
    setGeneratingCard(true);
    
    // Simulate API call to generate new card
    setTimeout(() => {
      const newCode = generateUniqueCode();
      toast({
        title: "New Card Generated",
        description: `Activation code: ${newCode}. Ready to be dispatched.`,
      });
      setGeneratingCard(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Manage Business Cards</h1>
          <div className="flex gap-3">
            <Button 
              variant="outline"
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
            <Button onClick={() => navigate("/editor/new")}>Create Template</Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>All Business Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted">
                    <tr>
                      <th className="px-6 py-3">Owner</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">NFC ID</th>
                      <th className="px-6 py-3">Activation Code</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Last Modified</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card) => (
                      <tr key={card.id} className="border-b">
                        <td className="px-6 py-4">{card.owner || "Unclaimed"}</td>
                        <td className="px-6 py-4">{card.email || "-"}</td>
                        <td className="px-6 py-4">{card.nfcId}</td>
                        <td className="px-6 py-4">{card.activationCode}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            card.status === 'claimed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {card.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{card.lastModified}</td>
                        <td className="px-6 py-4">
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
                              onClick={() => navigate(`/card/${card.id}`)}
                            >
                              Preview
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageCards;
