'use client';

import { usePathname } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isKeystatic = pathname?.startsWith('/keystatic');

  if (isKeystatic) {
    // Keystatic layout - no navigation, full screen
    return (
      <div className="min-h-dvh">
        {children}
      </div>
    );
  }

  // Main site layout - with navigation and footer
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8">{children}</main>
      <footer className="border-t py-6 text-sm text-muted-foreground">
        <div className="container">© {new Date().getFullYear()} Favourite Things</div>
      </footer>
    </div>
  );
}