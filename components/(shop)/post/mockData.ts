import { Shop, Photo, Reel } from '../../../types/shop/shopSocial';

export const shopData: Shop = {
  id: 'shop_001',
  name: 'Bloom & Co.',
  username: '@bloom.store',
  avatar: 'https://i.pravatar.cc/200?img=47',
  bio: '✨ Handcrafted fashion & accessories\n🌸 New drops every Friday\n📦 Free shipping over ₹999',
  category: 'Fashion & Accessories',
  isVerified: true,
  stats: {
    posts: 284,
    followers: 128400,
    following: 312,
  },
  highlights: [
    { id: 'h1', label: 'New In',   cover: 'https://picsum.photos/seed/h1/100/100' },
    { id: 'h2', label: 'Sale 🔥',  cover: 'https://picsum.photos/seed/h2/100/100' },
    { id: 'h3', label: 'Bags',     cover: 'https://picsum.photos/seed/h3/100/100' },
    { id: 'h4', label: 'Jewels',   cover: 'https://picsum.photos/seed/h4/100/100' },
    { id: 'h5', label: 'Reviews',  cover: 'https://picsum.photos/seed/h5/100/100' },
    { id: 'h6', label: 'Lookbook', cover: 'https://picsum.photos/seed/h6/100/100' },
  ],
};

export const photosData: Photo[] = Array.from({ length: 18 }, (_, i) => ({
  id: `photo_${i + 1}`,
  uri: `https://picsum.photos/seed/photo${i + 1}/400/400`,
  isMultiple: i % 5 === 0,
  isVideo: i % 9 === 0,
}));

export const reelsData: Reel[] = Array.from({ length: 12 }, (_, i) => ({
  id: `reel_${i + 1}`,
  thumbnail: `https://picsum.photos/seed/reel${i + 1}/300/500`,
  views: `${Math.floor(Math.random() * 900 + 10)}K`,
  duration: `0:${String(Math.floor(Math.random() * 50 + 10)).padStart(2, '0')}`,
}));