
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCardBySlug } from "@/data/mockData";
import CardPreview from "@/components/cards/CardPreview";
import { toast } from "@/components/ui/use-toast";
import { copyToClipboard, generateCardLink } from "@/lib/cardUtils";

const ViewCard = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState(null);

  useEffect(() => {
    // Simulate API call to get card by slug
    setTimeout(() => {
      if (slug) {
        const foundCard = getCardBySlug(slug);
        if (foundCard) {
          setCard(foundCard);
        }
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleCopyLink = () => {
    if (card) {
      const link = generateCardLink(slug);
      copyToClipboard(link).then(success => {
        if (success) {
          toast({
            title: "Link copied!",
            description: "Card link copied to clipboard",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Couldn't copy link",
            description: "Please try again or copy it manually",
          });
        }
      });
    }
  };

  const handleAddToContacts = () => {
    toast({
      title: "Contact saved",
      description: "Contact information has been saved to your device",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="text-5xl mb-6">😕</div>
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <p className="text-gray-600 mb-6">
            The digital business card you're looking for doesn't exist or may have been removed.
          </p>
          <Button asChild>
            <a href="/">Return to Homepage</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Card display area */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full">
          <CardPreview card={card} className="shadow-lg" />
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="bg-white border-t p-4 flex justify-center">
        <div className="flex gap-3 flex-wrap justify-center max-w-md w-full">
          <Button className="flex-1" onClick={handleAddToContacts}>
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
            Save Contact
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleCopyLink}>
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Copy Link
          </Button>
          <Button variant="ghost" className="flex-1" onClick={() => window.print()}>
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect width="12" height="8" x="6" y="14" />
            </svg>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
