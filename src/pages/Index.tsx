import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TechnologiesSection from "@/components/TechnologiesSection";

import AboutSection from "@/components/AboutSection";
import ComplaintsSection from "@/components/ComplaintsSection";
import ContactSection from "@/components/ContactSection";
import FloatingComplaintButton from "@/components/FloatingComplaintButton";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingComplaintButton />
      <HeroSection />
      <ServicesSection />
      <TechnologiesSection />
      <AboutSection />
      <ComplaintsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
