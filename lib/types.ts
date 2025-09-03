export type ItemList = 'favourites' | 'wishlist';

export interface Item {
  slug: string;
  name: string;
  brand?: string;
  image: string; // path under /public/images (extracted from Keystatic image object)
  list: ItemList;
  category: string;
  tags: string[];
  description: string;
  buyUrl?: string;
}

