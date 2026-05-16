'use client';

import { useEffect } from 'react';
import { Button } from '@lush/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-serif text-white mb-4">Something went wrong!</h2>
      <p className="text-white/50 mb-8 max-w-md">
        {error.message || "An unexpected error occurred while rendering this page."}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="primary"
          className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0"
        >
          Try again
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/5"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
