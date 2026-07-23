import Header from "@/components/ui/header";
import HeroSection from "@/components/ui/heroSection";
import VesionSection from "@/components/ui/vesionSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <HeroSection />
      <VesionSection />
    </div>
  );
}
