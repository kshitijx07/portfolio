import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import DevOpsPipeline from "@/components/sections/DevOpsPipeline";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Interests from "@/components/sections/Interests";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <About />
      <Skills />
      <DevOpsPipeline />
      <Projects />
      <Experience />
      <Achievements />
      <Interests />
      <Contact />

      <footer className="py-8 text-center border-t border-white/10 bg-black/50 backdrop-blur-md relative z-10">
        <p className="text-neutral-500 text-sm font-mono flex items-center justify-center gap-2">
          Designed & Built by Kshitij Kumbhar
        </p>
      </footer>
    </main>
  );
}
