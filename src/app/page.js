import { AnimatedCursor } from "@/components/layout/animated-cursor";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export default function Home() {
  return (
    <>
      <AnimatedCursor />
      <ScrollProgress />
      <SmoothScroll />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="section-clip bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]">
          <About />
        </div>
        <div className="section-clip-alt bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0))]">
          <Stack />
        </div>
        <div className="section-clip bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]">
          <Projects />
        </div>
        <div className="section-clip-alt bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0))]">
          <Experience />
        </div>
        <div className="section-clip bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
