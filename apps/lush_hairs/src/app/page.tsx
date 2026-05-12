import { Button } from "@lush/ui";
import { auth } from "@lush/firebase";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-4xl">
        <h1 className="text-6xl font-black tracking-tighter text-[var(--primary)] uppercase italic">
          Lush Hairs
        </h1>
        <p className="text-2xl font-light text-center sm:text-left text-gray-300">
          Unleash your beauty. Premium extensions, styling, and care for the bold.
        </p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row w-full sm:w-auto">
          <Button variant="primary" size="lg" className="w-full sm:w-64 py-6 text-xl">
            SHOP COLLECTION
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-64 py-6 text-xl border-white text-white hover:bg-white hover:text-black">
            BOOK A STYLIST
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full">
          <div className="aspect-square bg-gray-900 border border-gray-800 flex items-center justify-center p-4 text-center">
            <span className="font-bold text-xs">VIRGIN HUMAN HAIR</span>
          </div>
          <div className="aspect-square bg-gray-900 border border-gray-800 flex items-center justify-center p-4 text-center">
            <span className="font-bold text-xs">EXPERT COLORING</span>
          </div>
          <div className="aspect-square bg-gray-900 border border-gray-800 flex items-center justify-center p-4 text-center">
            <span className="font-bold text-xs">LACE FRONTALS</span>
          </div>
          <div className="aspect-square bg-gray-900 border border-gray-800 flex items-center justify-center p-4 text-center">
            <span className="font-bold text-xs">GLOBAL SHIPPING</span>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-xs tracking-widest uppercase opacity-50">© 2026 LUSH HAIRS EST. 2024</p>
      </footer>
    </div>
  );
}
