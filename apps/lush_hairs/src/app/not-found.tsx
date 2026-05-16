import Link from 'next/link';
import { Button } from '@lush/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">
        Page Not <span className="italic text-[var(--primary)]">Found</span>
      </h2>
      <p className="text-white/50 mb-10 max-w-md font-light leading-relaxed">
        The boutique section you're looking for doesn't exist or has moved to a new collection.
      </p>
      <Link href="/">
        <Button
          variant="primary"
          rounded="full"
          className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] border-0 px-12"
        >
          Return to Boutique
        </Button>
      </Link>
    </div>
  );
}
