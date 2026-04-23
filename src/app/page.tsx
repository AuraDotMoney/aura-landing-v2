import GlassNav from "@/components/GlassNav";
import MotionProvider from "@/components/MotionProvider";
import Hero from "@/components/sections/Hero";
import Markets from "@/components/sections/Markets";
import Features from "@/components/sections/Features";
import FooterCTA from "@/components/sections/FooterCTA";

export default function Home() {
  return (
    <MotionProvider>
      <main className="relative">
        <GlassNav />
        <Hero />
        <Markets />
        <Features />
        <FooterCTA />
      </main>
    </MotionProvider>
  );
}
