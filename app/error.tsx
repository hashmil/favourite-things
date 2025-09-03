"use client";
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="mx-auto max-w-lg text-center space-y-4">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">An unexpected error occurred. Try again.</p>
      <div className="flex justify-center">
        <Button onClick={() => reset()}>Retry</Button>
      </div>
    </div>
  );
}

