
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CardEditor from "@/components/cards/CardEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { mockCards, BusinessCard } from "@/data/mockData";
import { createNewCard } from "@/lib/cardUtils";

const Editor = () => {
  const { id } = useParams();
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const isNewCard = id === "new";

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
      return;
    }

    // If user is authenticated, then check for card
    if (isAuthenticated && user) {
      if (isNewCard) {
        // Create a new card
        setCard(createNewCard(user.id));
      } else {
        // Find existing card
        const foundCard = mockCards.find(c => c.id === id);
        if (foundCard) {
          if (foundCard.userId === user.id) {
            setCard(foundCard);
          } else {
            toast({
              variant: "destructive",
              title: "Access denied",
              description: "You don't have permission to edit this card.",
            });
            navigate("/dashboard");
          }
        } else {
          toast({
            variant: "destructive",
            title: "Card not found",
            description: "The requested card could not be found.",
          });
          navigate("/dashboard");
        }
      }
    }
  }, [loading, isAuthenticated, user, id, navigate, isNewCard]);

  const handleSave = (updatedCard: BusinessCard) => {
    setSaving(true);
    
    // Simulating API call
    setTimeout(() => {
      if (isNewCard) {
        // Add the new card to mockCards (in a real app, this would be an API call)
        mockCards.push(updatedCard);
        toast({
          title: "Card created",
          description: "Your new digital business card has been created successfully!",
        });
      } else {
        // Update existing card (in a real app, this would be an API call)
        const index = mockCards.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCards[index] = updatedCard;
        }
        toast({
          title: "Card updated",
          description: "Your digital business card has been updated successfully!",
        });
      }
      
      setSaving(false);
      
      // Redirect to dashboard after saving
      navigate("/dashboard");
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  if (loading || !card) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isNewCard ? "Create New Card" : "Edit Card"}
            </h1>
            <p className="text-muted-foreground">
              {isNewCard 
                ? "Design your new digital business card" 
                : "Update your digital business card information"
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button 
              disabled={saving}
              onClick={() => {
                if (card) handleSave(card);
              }}
            >
              {saving ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                  Saving...
                </>
              ) : (
                'Save & Publish'
              )}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="py-6">
            <CardEditor card={card} onSave={handleSave} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Editor;
