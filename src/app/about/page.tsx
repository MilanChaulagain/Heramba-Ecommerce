import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurPromise from "@/components/about/OurPromise";
import TrustStats from "@/components/about/TrustStatus";
import Connections from "@/components/about/Connections";
import SidebarCTA from "@/components/about/SidebarCTA";

export default function About() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <OurPromise />
      <TrustStats />
      
      {/* Connections with Sidebar CTA */}
      <section className="relative bg-gradient-to-b from-rose-50 to-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Connections Content - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Connections />
            </div>
            
            {/* Sidebar CTA - Takes 1 column */}
            <div className="lg:col-span-1">
              <SidebarCTA />
            </div>
          </div>
        </div>
      </section>
      
    </main>
  )
}