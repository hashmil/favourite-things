import { ThemeProvider } from 'next-themes';

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="w-full min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}