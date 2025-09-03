import { getItemsByList } from '@/lib/content';
import { Grid } from '@/components/grid';

export const dynamic = 'error';

export default async function HomePage() {
  const items = await getItemsByList('favourites');
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Favourites</h1>
        <p className="text-muted-foreground">A curated list of things I genuinely love.</p>
      </header>
      <Grid items={items} />
    </section>
  );
}
export const metadata = {
  title: 'Favourites · Favourite Things',
  description: 'A curated list of things I genuinely love.'
};
