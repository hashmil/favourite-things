import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Favourite Things',
  description: 'A minimal, premium showcase of my favourite products.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-dvh flex flex-col">
            <SiteHeader />
            <main className="flex-1 container py-8">{children}</main>
            <footer className="border-t py-6 text-sm text-muted-foreground">
              <div className="container">© {new Date().getFullYear()} Favourite Things</div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
