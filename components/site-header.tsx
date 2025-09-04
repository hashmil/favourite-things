"use client";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCallback, Suspense } from 'react';

function SiteHeaderContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold tracking-tight text-lg">
            Favourite Things
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`hover:text-foreground ${pathname === '/' ? 'text-foreground' : ''}`}
            >
              Favourites
            </Link>
            <Link
              href="/wishlist"
              aria-current={pathname.startsWith('/wishlist') ? 'page' : undefined}
              className={`hover:text-foreground ${pathname.startsWith('/wishlist') ? 'text-foreground' : ''}`}
            >
              Wishlist
            </Link>
            <Link
              href="/about"
              aria-current={pathname.startsWith('/about') ? 'page' : undefined}
              className={`hover:text-foreground ${pathname.startsWith('/about') ? 'text-foreground' : ''}`}
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-background border-input"
              defaultValue={searchParams.get('search') || ''}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteHeader() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              Favourite Things
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>
    }>
      <SiteHeaderContent />
    </Suspense>
  );
}
