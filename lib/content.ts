import fs from 'node:fs/promises';
import path from 'node:path';
import type { Item, ItemList } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'items');

async function readItemFile(file: string): Promise<Item> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf8');
  const rawItem = JSON.parse(raw);
  
  // Handle Keystatic image field format
  let image: string;
  if (typeof rawItem.image === 'string') {
    // Old format - direct string path
    image = rawItem.image;
  } else if (rawItem.image && typeof rawItem.image === 'object') {
    // New Keystatic format - extract path from object
    image = rawItem.image.src || rawItem.image.value?.src || '/images/placeholder.svg';
  } else {
    image = '/images/placeholder.svg';
  }
  
  // Ensure slug exists - if not, generate from filename
  const slug = rawItem.slug || file.replace('.json', '');
  
  if (!slug) {
    throw new Error(`Item missing slug field: ${file}`);
  }
  
  return {
    slug,
    name: rawItem.name,
    brand: rawItem.brand || '',
    image,
    list: rawItem.list,
    category: rawItem.category,
    tags: rawItem.tags || [],
    description: rawItem.description,
    buyUrl: rawItem.buyUrl
  } as Item;
}

export async function getAllItems(): Promise<Item[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  const items = await Promise.all(jsonFiles.map((f) => readItemFile(f)));
  // Sort alphabetically by name since we no longer have addedAt
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getItemsByList(list: ItemList): Promise<Item[]> {
  const items = await getAllItems();
  return items.filter((i) => i.list === list);
}

export async function getItemBySlug(slug: string): Promise<Item | null> {
  const files = await fs.readdir(CONTENT_DIR);
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const item = await readItemFile(f);
    if (item.slug === slug) return item;
  }
  return null;
}

export async function getAllSlugs(): Promise<string[]> {
  const items = await getAllItems();
  return items.map((i) => i.slug);
}

export async function getCategoriesAndTags(list?: ItemList): Promise<{ categories: string[]; tags: string[] }> {
  const items = list ? await getItemsByList(list) : await getAllItems();
  const categories = Array.from(new Set(items.map((i) => i.category))).sort((a, b) => a.localeCompare(b));
  const tags = Array.from(new Set(items.flatMap((i) => i.tags))).sort((a, b) => a.localeCompare(b));
  return { categories, tags };
}

