
import React from "react";
import { BusinessCard } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/cardUtils";

interface CardPreviewProps {
  card: BusinessCard;
  className?: string;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, className }) => {
  // Set inline styles based on the card's theme
  const cardStyle = {
    "--card-bg": card.theme.backgroundColor,
    "--card-color": card.theme.textColor,
    "--card-primary": card.theme.primary,
    "--card-secondary": card.theme.secondary,
  } as React.CSSProperties;

  const getLayoutClasses = () => {
    switch (card.theme.layout) {
      case "modern":
        return "rounded-xl overflow-hidden";
      case "classic":
        return "rounded-lg border-2";
      case "minimal":
        return "rounded-none shadow-none";
      default:
        return "rounded-xl";
    }
  };

  return (
    <Card 
      className={`w-full max-w-md mx-auto overflow-hidden ${getLayoutClasses()} ${className}`}
      style={cardStyle}
    >
      <div 
        className="h-24 bg-gradient-to-r"
        style={{ 
          backgroundImage: `linear-gradient(to right, ${card.theme.primary}, ${card.theme.secondary})` 
        }}
      />
      <CardContent className="pt-0">
        <div className="flex flex-col items-center -mt-12 mb-4">
          <Avatar className="h-24 w-24 border-4 shadow-md" style={{ borderColor: card.theme.backgroundColor }}>
            <AvatarImage src={card.avatar} alt={card.name} />
            <AvatarFallback className="text-xl" style={{ backgroundColor: card.theme.primary, color: 'white' }}>
              {getInitials(card.name)}
            </AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-2xl font-bold" style={{ color: card.theme.textColor }}>{card.name}</h1>
          <p className="text-sm opacity-90" style={{ color: card.theme.textColor }}>{card.title}</p>
          {card.company && (
            <Badge className="mt-1" style={{ backgroundColor: card.theme.primary, color: 'white' }}>
              {card.company}
            </Badge>
          )}
        </div>

        {card.bio && (
          <p className="text-sm text-center mb-6 opacity-80" style={{ color: card.theme.textColor }}>
            {card.bio}
          </p>
        )}

        <div className="grid gap-3">
          {card.email && (
            <a 
              href={`mailto:${card.email}`}
              className="flex items-center gap-2 p-2 rounded-md transition-colors"
              style={{ backgroundColor: `${card.theme.secondary}20`, color: card.theme.textColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{card.email}</span>
            </a>
          )}
          
          {card.phone && (
            <a 
              href={`tel:${card.phone}`}
              className="flex items-center gap-2 p-2 rounded-md transition-colors"
              style={{ backgroundColor: `${card.theme.secondary}20`, color: card.theme.textColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{card.phone}</span>
            </a>
          )}
          
          {card.website && (
            <a 
              href={card.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-md transition-colors"
              style={{ backgroundColor: `${card.theme.secondary}20`, color: card.theme.textColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
              <span>{card.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        {Object.keys(card.socialLinks).length > 0 && (
          <div className="mt-6 flex justify-center gap-4">
            {card.socialLinks.linkedin && (
              <a 
                href={card.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: card.theme.primary, color: 'white' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            
            {card.socialLinks.twitter && (
              <a 
                href={card.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: card.theme.primary, color: 'white' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            )}
            
            {card.socialLinks.github && (
              <a 
                href={card.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: card.theme.primary, color: 'white' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
            
            {card.socialLinks.instagram && (
              <a 
                href={card.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: card.theme.primary, color: 'white' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardPreview;
