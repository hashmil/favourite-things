export type ItemList = 'favourites' | 'wishlist';

export interface Item {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  image: string; // path under /public/images
  list: ItemList;
  category: string;
  tags: string[];
  description: string;
  buyUrl?: string;
  addedAt: string; // ISO date
}

