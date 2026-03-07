"use client";

import { motion } from "framer-motion";
import {
    SiDocker, SiKubernetes, SiJenkins, SiGit, SiGithub,
    SiReact, SiTailwindcss, SiNextdotjs, SiJavascript,
    SiNodedotjs, SiExpress, SiSpringboot,
    SiMongodb, SiMysql, SiLinux
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import KineticText from "@/components/ui/KineticText";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxText from "@/components/ui/ParallaxText";

const skillCategories = [
    {
        title: "DevOps & Infrastructure",
        skills: [
            { name: "Docker", icon: SiDocker, color: "group-hover:text-[#2496ED]" },
            { name: "Kubernetes", icon: SiKubernetes, color: "group-hover:text-[#326CE5]" },
            { name: "Jenkins", icon: SiJenkins, color: "group-hover:text-[#D24939]" },
            { name: "AWS", icon: FaAws, color: "group-hover:text-[#FF9900]" },
            { name: "Linux OS", icon: SiLinux, color: "group-hover:text-[#FCC624]" },
            { name: "Git", icon: SiGit, color: "group-hover:text-[#F05032]" }
        ]
    },
    {
        title: "Backend Core",
        skills: [
            { name: "Node.js", icon: SiNodedotjs, color: "group-hover:text-[#339933]" },
            { name: "Express", icon: SiExpress, color: "group-hover:text-white" },
            { name: "Spring Boot", icon: SiSpringboot, color: "group-hover:text-[#6DB33F]" },
            { name: "MongoDB", icon: SiMongodb, color: "group-hover:text-[#47A248]" },
            { name: "MySQL", icon: SiMysql, color: "group-hover:text-[#4479A1]" }
        ]
    },
    {
        title: "Frontend Engineering",
        skills: [
            { name: "React", icon: SiReact, color: "group-hover:text-[#61DAFB]" },
            { name: "Next.js", icon: SiNextdotjs, color: "group-hover:text-white" },
            { name: "TailwindCSS", icon: SiTailwindcss, color: "group-hover:text-[#06B6D4]" },
            { name: "JavaScript", icon: SiJavascript, color: "group-hover:text-[#F7DF1E]" }
        ]
    }
];

export default function Skills() {
    return (
        <section className="py-32 px-6 relative z-10 overflow-hidden bg-[#050505]" id="skills">
            <KineticText text="TECHNOLOGIES" direction="right" speed={0.5} yOffset={200} />
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <ParallaxText offset={30} direction="up">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-neutral-500 font-mono">02.</span>
                            <div className="h-[1px] w-12 bg-neutral-600" />
                            <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Arsenals</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            <TextReveal text="Technology Stack" className="inline-block relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white" />
                        </h2>
                    </ParallaxText>
                </motion.div>

                <div className="flex flex-col gap-16">
                    {skillCategories.map((category, catIdx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-neutral-300 tracking-tight">{category.title}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {category.skills.map((skill, idx) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    >
                                        <SpotlightCard className="group relative h-32 glass-card rounded-2xl flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 overflow-hidden w-full">
                                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            <skill.icon size={36} className={`text-neutral-500 transition-colors duration-300 relative z-10 ${skill.color}`} />
                                            <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors duration-300 relative z-10 font-mono">
                                                {skill.name}
                                            </span>
                                        </SpotlightCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
