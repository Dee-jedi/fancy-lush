import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
