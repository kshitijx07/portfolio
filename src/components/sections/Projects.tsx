"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import React, { useRef } from "react";
import Magnetic from "@/components/ui/Magnetic";

const projects = [
    {
        title: "HostelHub",
        description: "A comprehensive scalable hostel management system built to handle large scale bookings, payments, and student records with robust architecture.",
        tech: ["Next.js", "Node.js", "Express", "MongoDB", "AWS", "Docker", "Jenkins"],
        github: "https://github.com/kshitijx07/Hostelhub",
        demo: "https://hostelhub-ruby.vercel.app",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Grocito",
        description: "Full-fleged online grocery delivery platform featuring real-time inventory management, secure payments, and an intuitive user interface.",
        tech: ["React.js", "Spring Boot", "MySQL", "TailwindCSS"],
        github: "https://github.com/kshitijx07/Grocito-Copy",
        demo: "https://grocito-user.vercel.app/",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "Pet Management Platform",
        description: "A comprehensive, full-stack web application designed for pet lovers. This platform streamlines pet adoptions, daycare scheduling, and medical record tracking with integrated Razorpay payments.",
        tech: ["React.js", "TailwindCSS", "Node.js", "Express", "MySQL", "JWT"],
        github: "https://github.com/kshitijx07/pet-managment.git",
        demo: "#",
        image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop"
    },
    {
        title: "MechItEasy",
        description: "Automotive service booking system that connects vehicle owners with nearby verified mechanics, complete with live tracking.",
        tech: ["Next.js", "Express", "PostgreSQL", "Google Maps API"],
        github: "#",
        demo: "https://mechiteasy.vercel.app/",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2066&auto=format&fit=crop"
    }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax / Masking Reveal Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "center center"]
    });

    const maskHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

    return (
        <div ref={containerRef} className="w-full flex flex-col gap-6 group mb-24 last:mb-0" style={{ perspective: 1000 }}>
            {/* Image Reveal Container */}
            <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden rounded-2xl bg-[#050505] border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]" style={{ willChange: "transform" }}>
                <motion.div
                    className="absolute bottom-0 left-0 w-full overflow-hidden"
                    style={{ height: maskHeight } as any}
                >
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        style={{ scale: imageScale }}
                        className="w-full h-[400px] md:h-[600px] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />
                </motion.div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xl font-mono text-neutral-500">0{index + 1}</span>
                        <div className="h-[1px] w-12 bg-neutral-800" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-500 transition-all duration-300">
                        {project.title}
                    </h3>
                    <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed mb-6">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1 text-[11px] uppercase tracking-widest font-mono rounded-full bg-white/5 border border-white/10 text-neutral-300">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Magnetic>
                        <a href={project.github} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 bg-black">
                            <FiGithub size={20} />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href={project.demo} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 bg-black">
                            <FiExternalLink size={20} />
                        </a>
                    </Magnetic>
                </div>
            </div>
        </div>
    );
}

import ParallaxText from "@/components/ui/ParallaxText";

export default function Projects() {
    return (
        <section className="py-32 px-6 relative z-10 bg-[#050505]" id="projects">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <ParallaxText offset={40} direction="up">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-neutral-500 font-mono">04.</span>
                                <div className="h-[1px] w-12 bg-neutral-600" />
                                <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Selected Work</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">Projects</span>
                            </h2>
                        </div>
                    </ParallaxText>
                </motion.div>

                <div className="flex flex-col">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.title} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
