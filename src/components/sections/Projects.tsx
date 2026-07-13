"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import React from "react";
import Magnetic from "@/components/ui/Magnetic";

const projects = [
    {
        title: "HostelHub",
        description: "Decoupled cloud-native hostel management platform with a React frontend on Amazon S3 and a Node.js REST API on AWS EKS (Kubernetes), with role-based access control.",
        tech: ["AWS EKS", "Kubernetes", "CloudFront", "S3", "ALB", "Jenkins", "Docker", "React.js", "Node.js", "MongoDB Atlas"],
        github: "https://github.com/kshitijx07/Hostelhub",
        demo: "https://hostelhub-ruby.vercel.app",
        image: "/hostelhub_ui.png"
    },
    {
        title: "Grocito",
        description: "A three-portal grocery ordering system (Customer, Admin, Delivery Partner) featuring real-time order tracking, payment processing, and live map integration.",
        tech: ["Spring Boot", "React.js", "MySQL", "REST APIs", "Real-Time Tracking"],
        github: "https://github.com/kshitijx07/Grocito-Copy",
        demo: "https://grocito-user.vercel.app/",
        image: "/grocito_ui.png"
    },
    {
        title: "Serverless AI X-Ray",
        description: "An AI-powered serverless observability tool that leverages AWS Lambda, AWS X-Ray, and OpenAI to analyze request traces and automatically generate performance diagnoses.",
        tech: ["AWS Lambda", "AWS X-Ray", "OpenAI API", "Node.js", "Serverless Framework"],
        github: "https://github.com/kshitijx07/serverless-ai-xray",
        demo: "#",
        image: "/serverless_xray_ui.png"
    }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    return (
        <div className="w-full flex flex-col gap-6 group mb-24 last:mb-0 relative">
            {/* Image Reveal Container */}
            <div className="w-full h-[400px] md:h-[600px] relative overflow-hidden rounded-2xl bg-[#050505] border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
                <motion.div
                    className="absolute inset-0 w-full h-full overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <ParallaxText offset={40} direction="up">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-neutral-500 font-mono">04.</span>
                                <div className="h-[1px] w-12 bg-neutral-600" />
                                <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Selected Work</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-shadow-3d">
                                Featured <span className="text-gradient-3d">Projects</span>
                            </h2>
                        </div>
                    </ParallaxText>
                </div>

                <div className="flex flex-col">
                    {projects.map((project, idx) => (
                        <ProjectCard key={project.title} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
