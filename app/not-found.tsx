import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg text-center space-y-4">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">Couldn’t find what you’re looking for.</p>
      <Link href="/" className="underline underline-offset-4">Go back home</Link>
    </div>
  );
}

