import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Item } from '@/lib/types';

export function SimpleItemCard({ item }: { item: Item }) {
  const alt = `${item.name}${item.brand ? ` by ${item.brand}` : ''}`;
  return (
    <Link href={`/item/${item.slug}`} className="group block focus:outline-none">
      <div className="relative bg-card rounded-lg overflow-hidden transition-all hover:shadow-sm">
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={item.image}
            alt={alt}
            width={600}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            priority={false}
          />
        </div>
        <div className="p-4">
          <div className="space-y-1">
            <div className="font-medium leading-tight text-card-foreground">{item.name}</div>
            {item.brand && <div className="text-sm text-muted-foreground">{item.brand} · {item.category}</div>}
          </div>
        </div>
      </div>
    </Link>
  );
}