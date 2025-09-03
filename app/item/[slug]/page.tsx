import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getItemBySlug } from '@/lib/content';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'error';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getItemBySlug(params.slug);
  if (!item) return { title: 'Item not found · Favourite Things' };
  const title = `${item.name}${item.brand ? ` · ${item.brand}` : ''} · Favourite Things`;
  const description = item.description;
  const url = `/item/${item.slug}`;
  const images = [{ url: item.image }];
  return {
    title,
    description,
    openGraph: { title, description, images, url },
    twitter: { card: 'summary_large_image', title, description, images }
  };
}

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const item = await getItemBySlug(params.slug);
  if (!item) return notFound();
  const alt = `${item.name}${item.brand ? ` by ${item.brand}` : ''}`;
  return (
    <article className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-2xl bg-muted">
        <Image
          src={item.image}
          alt={alt}
          width={1600}
          height={900}
          className="h-auto w-full object-cover"
          priority={false}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8 space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">{item.name}</h1>
          {item.brand && <p className="text-muted-foreground">by {item.brand}</p>}
          <p className="leading-relaxed">{item.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">{item.category}</Badge>
            {item.tags.map((t) => (
              <Badge key={t} variant="outline">#{t}</Badge>
            ))}
          </div>
        </div>
        <aside className="md:col-span-4 space-y-3">
          {item.buyUrl && (
            <a
              href={item.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full h-10 items-center justify-center rounded-md bg-primary px-4 text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Buy / View Product
            </a>
          )}
        </aside>
      </div>
    </article>
  );
}
