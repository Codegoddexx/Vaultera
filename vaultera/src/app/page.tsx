import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HeroContent from "@/components/landing/HeroContent";
import CurrencyTicker from "@/components/landing/CurrencyTicker";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="w-full" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <Hero />
      <HeroContent />
      <CurrencyTicker />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}