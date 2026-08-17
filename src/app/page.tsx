import Header from "@/components/HomePage/Header";
import HeroSection from "@/components/HomePage/heroSection";
import VesionSection from "@/components/HomePage/vesionSection";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <HeroSection />
      <VesionSection />
      <Footer />
    </div>
  );
}
