import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Item } from '@/lib/types';

export function ItemCard({ item }: { item: Item }) {
  const alt = `${item.name}${item.brand ? ` by ${item.brand}` : ''}`;
  return (
    <Link href={`/item/${item.slug}`} className="group block focus:outline-none">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={item.image}
            alt={alt}
            width={1200}
            height={900}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="font-medium leading-tight tracking-tight">{item.name}</div>
              {item.brand && <div className="text-sm text-muted-foreground">{item.brand}</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

