export interface Highlight {
  id: string;
  label: string;
  cover: string;
}

export interface Photo {
  id: string;
  uri: string;
  isMultiple?: boolean;
  isVideo?: boolean;
}

export interface Reel {
  id: string;
  thumbnail: string;
  views: string;
  duration: string;
}

export interface ShopStats {
  posts: number;
  followers: number;
  following: number;
}

export interface Shop {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  category: string;
  isVerified: boolean;
  stats: ShopStats;
  highlights: Highlight[];
}

export type ActiveTab = 'posts' | 'reels';