import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About"), { ssr: true });
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: true });
const DevOpsPipeline = dynamic(() => import("@/components/sections/DevOpsPipeline"), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: true });
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: true });
const Achievements = dynamic(() => import("@/components/sections/Achievements"), { ssr: true });
const Interests = dynamic(() => import("@/components/sections/Interests"), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: true });

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
