
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getCardsByUserId, BusinessCard } from "@/data/mockData";
import CardPreview from "@/components/cards/CardPreview";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500" />
      </div>
    );
  }

  // Get user's cards
  const userCards = user ? getCardsByUserId(user.id) : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">
              Here's an overview of your digital business cards
            </p>
          </div>
          <Link to="/editor/new">
            <Button>
              <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5v14" />
              </svg>
              Create New Card
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userCards.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +0% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {userCards.reduce((sum, card) => sum + card.views, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userCards.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                All cards are active
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Your Business Cards</h2>
        
        {userCards.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mx-auto max-w-md space-y-4">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="18" height="14" x="3" y="5" rx="2" />
                  <path d="M21 8H8" />
                  <path d="M21 12H8" />
                  <path d="M21 16H8" />
                  <path d="M4 8h.01" />
                  <path d="M4 12h.01" />
                  <path d="M4 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No business cards yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first digital business card to start sharing your contact information professionally.
              </p>
              <Link to="/editor/new">
                <Button>Create Your First Card</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userCards.map((card: BusinessCard) => (
              <Card key={card.id} className="overflow-hidden">
                <div className="p-4">
                  <CardPreview card={card} className="transform scale-90" />
                </div>
                <div className="border-t p-4 bg-muted/50 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{card.name}</p>
                    <p className="text-sm text-muted-foreground">{card.views} views</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/editor/${card.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/card/${card.slug}`}>
                      <Button size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
