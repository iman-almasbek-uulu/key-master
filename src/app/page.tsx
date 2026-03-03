import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Hero } from "@/src/components/sections/Hero";
import { ServicesSection } from "@/src/components/sections/ServicesSection";
import { StepsSection } from "@/src/components/sections/StepsSection";
import { WhyUsSection } from "@/src/components/sections/WhyUsSection";
import { BrandsSection } from "@/src/components/sections/BrandsSection";
import { FaqSection } from "@/src/components/sections/FaqSection";
import { ContactSection } from "@/src/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <StepsSection />
        <WhyUsSection />
        <BrandsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
