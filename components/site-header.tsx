"use client";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCallback, Suspense, useState } from 'react';

function SiteHeaderContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="font-semibold tracking-tight text-lg">
            Favourite Things
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`hover:text-foreground transition-colors ${pathname === '/' ? 'text-foreground' : ''}`}
          >
            Favourites
          </Link>
          <Link
            href="/wishlist"
            aria-current={pathname.startsWith('/wishlist') ? 'page' : undefined}
            className={`hover:text-foreground transition-colors ${pathname.startsWith('/wishlist') ? 'text-foreground' : ''}`}
          >
            Wishlist
          </Link>
        </nav>

        {/* Right: Search + Theme Toggle (desktop) + Mobile Menu Button */}
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
          {/* Theme toggle - hidden on mobile */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-accent rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
          <div className="container py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={`text-sm hover:text-foreground transition-colors ${pathname === '/' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favourites
              </Link>
              <Link
                href="/wishlist"
                aria-current={pathname.startsWith('/wishlist') ? 'page' : undefined}
                className={`text-sm hover:text-foreground transition-colors ${pathname.startsWith('/wishlist') ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <div className="relative md:hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-background border-input"
                defaultValue={searchParams.get('search') || ''}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            {/* Mobile Theme Toggle */}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteHeader() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              Favourite Things
            </Link>
          </div>
          {/* Center: Empty for fallback */}
          <div></div>
          {/* Right: Theme Toggle */}
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
