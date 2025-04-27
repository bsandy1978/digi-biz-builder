
export interface BusinessCard {
  id: string;
  userId: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  bio: string;
  avatar: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
  theme: {
    primary: string;
    secondary: string;
    textColor: string;
    backgroundColor: string;
    layout: 'modern' | 'classic' | 'minimal';
  };
  createdAt: string;
  updatedAt: string;
  slug: string;
  views: number;
}

export const mockCards: BusinessCard[] = [
  {
    id: '1',
    userId: '2',
    name: 'John Doe',
    title: 'Full Stack Developer',
    company: 'Tech Innovators Inc.',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    website: 'https://johndoe.example.com',
    bio: 'Passionate full-stack developer with 5+ years of experience building web apps.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
    },
    theme: {
      primary: '#00b9cd',
      secondary: '#2f3759',
      textColor: '#333333',
      backgroundColor: '#ffffff',
      layout: 'modern',
    },
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z',
    slug: 'john-doe',
    views: 156,
  },
  {
    id: '2',
    userId: '2',
    name: 'Sarah Johnson',
    title: 'Marketing Director',
    company: 'Growth Strategies LLC',
    email: 'sarah@example.com',
    phone: '+1 555-987-6543',
    website: 'https://sarahjohnson.example.com',
    bio: 'Results-driven marketing professional specializing in digital transformation.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      instagram: 'https://instagram.com/sarahjohnson',
    },
    theme: {
      primary: '#7e69ab',
      secondary: '#f2fce2',
      textColor: '#222222',
      backgroundColor: '#f8f9fa',
      layout: 'classic',
    },
    createdAt: '2023-02-20T14:45:00Z',
    updatedAt: '2023-03-15T09:20:00Z',
    slug: 'sarah-johnson',
    views: 89,
  },
  {
    id: '3',
    userId: '2',
    name: 'David Chen',
    title: 'UX/UI Designer',
    company: 'Visionary Designs Co.',
    email: 'david@example.com',
    phone: '+1 555-345-6789',
    website: 'https://davidchen.example.com',
    bio: 'Creative designer focused on crafting beautiful and functional user experiences.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/davidchen',
      github: 'https://github.com/davidchen',
      instagram: 'https://instagram.com/davidchen',
    },
    theme: {
      primary: '#6e59a5',
      secondary: '#ffdee2',
      textColor: '#2c2c2c',
      backgroundColor: '#f0f4f8',
      layout: 'minimal',
    },
    createdAt: '2023-03-05T08:15:00Z',
    updatedAt: '2023-03-10T11:30:00Z',
    slug: 'david-chen',
    views: 122,
  },
];

export const getCardBySlug = (slug: string): BusinessCard | undefined => {
  return mockCards.find(card => card.slug === slug);
};

export const getCardsByUserId = (userId: string): BusinessCard[] => {
  return mockCards.filter(card => card.userId === userId);
};
