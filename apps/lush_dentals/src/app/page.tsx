import { Button } from "@lush/ui";
import { auth } from "@lush/firebase";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-[var(--primary)] flex items-center gap-2">
          Lush Dentals
        </h1>
        <p className="text-lg text-center sm:text-left text-[var(--foreground)] opacity-90">
          Professional dental care for a brighter, healthier smile.
        </p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button variant="primary" size="lg">
            Schedule a Visit
          </Button>
          <Button variant="outline" size="lg">
            Our Services
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="p-4 rounded-lg border border-[var(--secondary)] bg-white/50">
            <h3 className="font-bold text-[var(--primary)]">General Dentistry</h3>
            <p className="text-sm">Routine checkups and cleaning for all ages.</p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--secondary)] bg-white/50">
            <h3 className="font-bold text-[var(--primary)]">Cosmetic</h3>
            <p className="text-sm">Teeth whitening and veneers for a perfect smile.</p>
          </div>
          <div className="p-4 rounded-lg border border-[var(--secondary)] bg-white/50">
            <h3 className="font-bold text-[var(--primary)]">Orthodontics</h3>
            <p className="text-sm">Invisalign and traditional braces for alignment.</p>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm opacity-60">© 2026 Lush Dentals • Your smile, our priority.</p>
      </footer>
    </div>
  );
}
