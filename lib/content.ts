import fs from 'node:fs/promises';
import path from 'node:path';
import type { Item, ItemList } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'items');

async function readItemFile(file: string): Promise<Item> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), 'utf8');
  return JSON.parse(raw) as Item;
}

export async function getAllItems(): Promise<Item[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));
  const items = await Promise.all(jsonFiles.map((f) => readItemFile(f)));
  // Sort newest first by default
  return items.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
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

