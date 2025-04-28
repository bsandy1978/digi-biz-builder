
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: string;
  user_id: string;
  name: string;
  job_title: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  bio: string | null;
  avatar_url: string | null;
  social_links: Record<string, string>;
  theme: string;
  created_at: string;
  updated_at: string;
  slug: string | null;
  views: number;
}

export interface NFCCard {
  id: string;
  nfc_id: string | null;
  activation_code: string;
  user_id: string | null;
  card_id: string | null;
  status: 'unclaimed' | 'claimed';
  created_at: string;
  updated_at: string;
}
