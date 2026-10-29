import { Footer } from "@/components/footer";
import { LenisProvider } from "@/components/LenisProvider";
import { Navbar } from "@/components/navbar";
import { SceneBackdrop } from "@/components/SceneBackdrop";
import { ScrollChrome } from "@/components/scroll-chrome";
import { SiteProvider } from "@/components/site-provider";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Impact } from "@/components/sections/impact";
import { LiveRescues } from "@/components/sections/live-rescues";
import { Partners } from "@/components/sections/partners";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <SiteProvider>
      <div className="relative isolate min-h-screen">
        <SceneBackdrop />
        <LenisProvider />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollChrome />
        <div className="relative z-10">
          <Navbar />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Hero />
            <HowItWorks />
            <LiveRescues />
            <Impact />
            <Partners />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SiteProvider>
  );
}
