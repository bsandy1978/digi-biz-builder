
import React, { useState } from "react";
import { BusinessCard } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { defaultLayouts } from "@/lib/cardUtils";
import CardPreview from "./CardPreview";
import { toast } from "@/components/ui/use-toast";

interface CardEditorProps {
  card: BusinessCard;
  onSave: (updatedCard: BusinessCard) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ card, onSave }) => {
  const [editedCard, setEditedCard] = useState<BusinessCard>({ ...card });
  const [activeTab, setActiveTab] = useState("info");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCard(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCard(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCard(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [name]: value,
      },
    }));
  };

  const handleLayoutChange = (layout: 'modern' | 'classic' | 'minimal') => {
    const layoutTheme = defaultLayouts[layout];
    setEditedCard(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...layoutTheme,
        layout,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedCard);
    toast({
      title: "Card saved",
      description: "Your business card has been updated successfully.",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <TabsContent value="info" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editedCard.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={editedCard.title}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={editedCard.company}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={editedCard.bio}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedCard.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={editedCard.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={editedCard.website}
                  onChange={handleChange}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={editedCard.socialLinks.linkedin || ''}
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={editedCard.socialLinks.twitter || ''}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  name="github"
                  value={editedCard.socialLinks.github || ''}
                  onChange={handleSocialChange}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={editedCard.socialLinks.instagram || ''}
                  onChange={handleSocialChange}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="space-y-6">
              <div>
                <Label className="block mb-3">Layout Style</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    type="button"
                    variant={editedCard.theme.layout === 'modern' ? 'default' : 'outline'} 
                    className="h-auto py-3 flex flex-col" 
                    onClick={() => handleLayoutChange('modern')}
                  >
                    <div className="w-full h-12 rounded-md mb-2 bg-brand-500"></div>
                    <span>Modern</span>
                  </Button>
                  
                  <Button 
                    type="button"
                    variant={editedCard.theme.layout === 'classic' ? 'default' : 'outline'} 
                    className="h-auto py-3 flex flex-col" 
                    onClick={() => handleLayoutChange('classic')}
                  >
                    <div className="w-full h-12 rounded-md mb-2 border-2 border-dark-500 bg-secondary"></div>
                    <span>Classic</span>
                  </Button>
                  
                  <Button 
                    type="button"
                    variant={editedCard.theme.layout === 'minimal' ? 'default' : 'outline'} 
                    className="h-auto py-3 flex flex-col" 
                    onClick={() => handleLayoutChange('minimal')}
                  >
                    <div className="w-full h-12 rounded-md mb-2 bg-muted"></div>
                    <span>Minimal</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary"
                    name="primary"
                    type="color"
                    value={editedCard.theme.primary}
                    onChange={handleThemeChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={editedCard.theme.primary}
                    onChange={handleThemeChange}
                    name="primary"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary"
                    name="secondary"
                    type="color"
                    value={editedCard.theme.secondary}
                    onChange={handleThemeChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={editedCard.theme.secondary}
                    onChange={handleThemeChange}
                    name="secondary"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    name="textColor"
                    type="color"
                    value={editedCard.theme.textColor}
                    onChange={handleThemeChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={editedCard.theme.textColor}
                    onChange={handleThemeChange}
                    name="textColor"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    name="backgroundColor"
                    type="color"
                    value={editedCard.theme.backgroundColor}
                    onChange={handleThemeChange}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={editedCard.theme.backgroundColor}
                    onChange={handleThemeChange}
                    name="backgroundColor"
                    className="flex-1"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  value={editedCard.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter URL for your profile picture</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Card URL Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={editedCard.slug}
                  onChange={handleChange}
                  placeholder="your-name"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your card will be accessible at: {window.location.origin}/card/{editedCard.slug}
                </p>
              </div>
            </TabsContent>
            
            <div className="mt-6 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Tabs>
      </div>
      
      <div className="flex flex-col">
        <h2 className="text-lg font-medium mb-4">Preview</h2>
        <div className="flex-1 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
          <CardPreview card={editedCard} />
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
