import Header from "@/components/ui/headertest";
import HeroSection from "@/components/ui/heroSection";
import VesionSection from "@/components/ui/vesionSection";
import Footer from "@/components/ui/Footer";

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
