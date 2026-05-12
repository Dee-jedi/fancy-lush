import { Button } from "@lush/ui";
import { auth } from "@lush/firebase";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-serif bg-[var(--background)]">
      <main className="flex flex-col gap-12 row-start-2 items-center text-center max-w-3xl">
        <div className="space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--primary)] font-sans">Discover the Essence</span>
          <h1 className="text-7xl font-light text-[var(--foreground)] tracking-tight">
            Lush <span className="italic">Perfs</span>
          </h1>
        </div>
        
        <p className="text-xl font-light text-[var(--foreground)] leading-relaxed italic opacity-80">
          "A fragrance is more than a scent; it is a memory captured in a bottle."
        </p>
        
        <div className="flex gap-6 items-center flex-col sm:flex-row">
          <Button variant="primary" size="lg" className="rounded-full px-12 py-7 text-sm tracking-widest uppercase bg-[var(--primary)] hover:bg-[var(--accent)]">
            Explore Scents
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-12 py-7 text-sm tracking-widest uppercase border-[var(--primary)] text-[var(--primary)]">
            Our Story
          </Button>
        </div>

        <div className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-30"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full pt-8">
          <div className="space-y-2">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--primary)]">Signature Blend</h4>
            <p className="text-sm font-light">Notes of Amber, Saffron, and Oud.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--primary)]">The Collection</h4>
            <p className="text-sm font-light">Hand-poured luxury in every drop.</p>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center font-sans">
        <p className="text-[10px] tracking-[0.5em] uppercase opacity-40">Paris • London • Dubai • New York</p>
      </footer>
    </div>
  );
}
