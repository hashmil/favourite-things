"use client";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname();
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
