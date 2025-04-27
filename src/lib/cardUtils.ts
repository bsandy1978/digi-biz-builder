import { BusinessCard } from "@/data/mockData";

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
};

export const generateCardLink = (slug: string): string => {
  return `${window.location.origin}/card/${slug}`;
};

export const createNewCard = (userId: string): BusinessCard => {
  const timestamp = new Date().toISOString();
  return {
    id: Math.random().toString(36).substring(2, 11),
    userId,
    name: 'Your Name',
    title: 'Your Title',
    company: 'Your Company',
    email: 'email@example.com',
    phone: '',
    website: '',
    bio: 'Tell something about yourself',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${timestamp}`,
    socialLinks: {},
    theme: {
      primary: '#00b9cd',
      secondary: '#2f3759',
      textColor: '#333333',
      backgroundColor: '#ffffff',
      layout: 'modern',
    },
    createdAt: timestamp,
    updatedAt: timestamp,
    slug: `card-${Math.random().toString(36).substring(2, 7)}`,
    views: 0,
  };
};

export const defaultLayouts = {
  modern: {
    primary: '#00b9cd',
    secondary: '#2f3759',
    textColor: '#333333',
    backgroundColor: '#ffffff',
  },
  classic: {
    primary: '#7e69ab',
    secondary: '#f2fce2',
    textColor: '#222222',
    backgroundColor: '#f8f9fa',
  },
  minimal: {
    primary: '#6e59a5',
    secondary: '#ffdee2',
    textColor: '#2c2c2c',
    backgroundColor: '#f0f4f8',
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const getInitials = (name: string): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const generateUniqueCode = (): string => {
  const prefix = 'CARD';
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = `${prefix}-`;
  
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};
