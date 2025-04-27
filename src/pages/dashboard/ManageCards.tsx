
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

const ManageCards = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Mock data for cards (in production, this would come from your backend)
  const cards = [
    {
      id: "1",
      owner: "John Doe",
      email: "john@example.com",
      nfcId: "NFC001",
      status: "active",
      lastModified: "2025-04-27",
    },
    {
      id: "2",
      owner: "Jane Smith",
      email: "jane@example.com",
      nfcId: "NFC002",
      status: "pending",
      lastModified: "2025-04-26",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Manage Business Cards</h1>
          <Button onClick={() => navigate("/editor/new")}>Create New Card</Button>
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
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Last Modified</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card) => (
                      <tr key={card.id} className="border-b">
                        <td className="px-6 py-4">{card.owner}</td>
                        <td className="px-6 py-4">{card.email}</td>
                        <td className="px-6 py-4">{card.nfcId}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            card.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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
