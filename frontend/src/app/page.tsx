import Banner from "@/components/Banner";
import CategoryShowcase from "@/components/CategoryShowcase";
import FlashDeals from "@/components/FlashDeals";
import ProductSection from "@/components/ProductSection";
import RewardCards from "@/components/RewardCards";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-rose-50/20 to-white">
      {/* Hero Banner */}
      <Banner />

      {/* Flash Deals with Countdown */}
      <FlashDeals />

      {/* Shop by Category */}
      <CategoryShowcase />

      {/* Featured Products */}
      <ProductSection />

      {/* Rewards & Perks */}
      <RewardCards />

      {/* Testimonials */}
      <Testimonials />
    </main>
  );
}