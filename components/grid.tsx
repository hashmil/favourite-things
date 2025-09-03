"use client";
import { useMemo, useState } from 'react';
import type { Item } from '@/lib/types';
import { ItemCard } from '@/components/item-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type SortKey = 'newest' | 'az' | 'brand';

export function Grid({ items }: { items: Item[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('newest');

  const { categories, tags } = useMemo(() => {
    const categories = Array.from(new Set(items.map((i) => i.category))).sort((a, b) => a.localeCompare(b));
    const tags = Array.from(new Set(items.flatMap((i) => i.tags))).sort((a, b) => a.localeCompare(b));
    return { categories, tags };
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let out = items.filter((i) => {
      const matchesQuery = !q || `${i.name} ${i.brand ?? ''} ${i.category} ${i.tags.join(' ')}`.toLowerCase().includes(q);
      const matchesCategory = !category || i.category === category;
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => i.tags.includes(t));
      return matchesQuery && matchesCategory && matchesTags;
    });
    switch (sort) {
      case 'az':
        out = out.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'brand':
        out = out.sort((a, b) => (a.brand ?? '').localeCompare(b.brand ?? ''));
        break;
      default:
        out = out.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }
    return out;
  }, [items, search, category, activeTags, sort]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
          <div className="w-full md:w-80">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" aria-label="Search items" />
          </div>
          <div className="flex gap-3">
            <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort items">
              <option value="newest">Newest</option>
              <option value="az">A–Z</option>
              <option value="brand">Brand</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className="focus-visible:outline-none"
              aria-pressed={activeTags.includes(t)}
            >
              <Badge variant={activeTags.includes(t) ? 'secondary' : 'outline'}>#{t}</Badge>
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No items match your filters.</p>
      )}
    </div>
  );
}
