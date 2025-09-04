"use client";
import { useMemo, Suspense } from 'react';
import type { Item } from '@/lib/types';
import { SimpleItemCard } from '@/components/simple-item-card';
import { useSearchParams } from 'next/navigation';

function SimpleGridContent({ items }: { items: Item[] }) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;
    
    return items.filter((i) => 
      `${i.name} ${i.brand ?? ''} ${i.category} ${i.tags.join(' ')}`
        .toLowerCase()
        .includes(q)
    );
  }, [items, search]);

  return (
    <>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <SimpleItemCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No items match your search.</p>
      )}
    </>
  );
}

export function SimpleGrid({ items }: { items: Item[] }) {
  return (
    <Suspense fallback={<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {items.slice(0, 8).map((item) => (
        <SimpleItemCard key={item.slug} item={item} />
      ))}
    </div>}>
      <SimpleGridContent items={items} />
    </Suspense>
  );
}