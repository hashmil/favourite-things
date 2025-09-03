import { getItemsByList } from '@/lib/content';
import { Grid } from '@/components/grid';

export const dynamic = 'error';

export default async function WishlistPage() {
  const items = await getItemsByList('wishlist');
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground">Things I’m eyeing or plan to try soon.</p>
      </header>
      <Grid items={items} />
    </section>
  );
}
export const metadata = {
  title: 'Wishlist · Favourite Things',
  description: 'Things I’m eyeing or plan to try soon.'
};
