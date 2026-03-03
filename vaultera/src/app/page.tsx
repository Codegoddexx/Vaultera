import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CurrencyTicker from "@/components/landing/CurrencyTicker";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#080B12] overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        <Navbar />
        <Hero />
        <CurrencyTicker />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}
