import { Header } from "../components/layout/Header";
import { Hero } from "../components/home/Hero";
import { Services } from "../components/home/Services";
import { Products } from "../components/home/Products";
import { Stats } from "../components/home/Stats";
import { Testimonials } from "../components/home/Testimonials";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Products />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
