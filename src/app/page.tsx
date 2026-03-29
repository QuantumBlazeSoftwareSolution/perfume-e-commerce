import HeroSection from "@/components/home/HeroSection";
import BrandTicker from "@/components/home/BrandTicker";
import FeaturedSection from "@/components/home/FeaturedSection";
import StorySection from "@/components/home/StorySection";
import NotesExplorer from "@/components/home/NotesExplorer";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <main className="w-full relative flex flex-col items-center">
      <HeroSection />
      <BrandTicker />
      <FeaturedSection />
      <StorySection />
      <NotesExplorer />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </main>
  );
}
