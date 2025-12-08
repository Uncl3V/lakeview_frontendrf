import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";
import Pricing from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import BookingForm from "@/components/BookingForm";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Team from "@/components/Team";
import TestimonialSection from "@/components/TestimonialSection";
import PortfolioSection from "@/components/PortfolioSection";
import Blogs from "@/components/Blogs";




export default function Home() {
  return (
    <main className="scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Team/>
      <BookingForm />
      <ServiceSection />
      <Pricing />
      <TestimonialSection />
      <FaqSection />
      <PortfolioSection />
      <Blogs />
      <ContactForm />
      <Footer />
    </main>
  );
}
