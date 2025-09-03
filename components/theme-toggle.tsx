"use client";
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = (theme === 'system' ? resolvedTheme : theme) ?? 'light';
  return (
    <Button
      aria-label="Toggle theme"
      variant="outline"
      size="icon"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {mounted && current === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

