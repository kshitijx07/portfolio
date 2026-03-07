"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiGit, SiDocker, SiJenkins, SiKubernetes } from "react-icons/si";
import { FiArrowRight } from "react-icons/fi";

const pipelineSteps = [
    { id: 1, name: "Source Code", icon: SiGit, color: "text-neutral-300", desc: "Git / GitHub" },
    { id: 2, name: "Containerize", icon: SiDocker, color: "text-neutral-300", desc: "Docker Build" },
    { id: 3, name: "CI / Testing", icon: SiJenkins, color: "text-neutral-300", desc: "Jenkins Pipeline" },
    { id: 4, name: "Orchestration", icon: SiKubernetes, color: "text-neutral-300", desc: "K8s Deployment" }
];

import ParallaxText from "@/components/ui/ParallaxText";

export default function DevOpsPipeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Scale the laser line width from 0% to 100% based on scroll
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="py-24 px-6 relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/5" id="devops">
            <div className="max-w-6xl mx-auto" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <ParallaxText offset={30} direction="up">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-neutral-500 font-mono">03.</span>
                            <div className="h-[1px] w-12 bg-neutral-600" />
                            <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Infrastructure</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-shadow-3d">
                            Automated <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-white">CI/CD Pipelines</span>
                        </h2>
                    </ParallaxText>
                    <ParallaxText offset={20} direction="down">
                        <p className="text-neutral-400 mt-6 max-w-2xl text-lg">
                            My philosophy revolves around automation. I design robust pipelines that ensure code goes from a local machine to a production cluster reliably, securely, and instantly.
                        </p>
                    </ParallaxText>
                </motion.div>

                {/* Pipeline Visualizer */}
                <div className="relative mt-20 py-10 glass-card rounded-3xl px-4 overflow-hidden border border-white/10">
                    {/* Animated background laser line connecting nodes */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0 hidden md:block">
                        <motion.div
                            style={{ width: lineWidth } as any}
                            className="h-full bg-gradient-to-r from-white/10 via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)] origin-left"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 max-w-5xl mx-auto uppercase">
                        {pipelineSteps.map((step, idx) => (
                            <div key={step.name} className="flex flex-col md:flex-row items-center gap-4 md:gap-0 w-full md:w-auto relative">

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    className="flex flex-col items-center z-10 group"
                                >
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:border-white/50 transition-colors duration-500 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <step.icon size={36} className={`${step.color} drop-shadow-lg transition-transform duration-500 group-hover:scale-110`} />
                                    </div>
                                    <h4 className="mt-6 font-bold text-white tracking-wider text-sm md:text-base text-center">{step.name}</h4>
                                    <p className="text-neutral-500 text-xs mt-2 font-mono">{step.desc}</p>
                                </motion.div>

                                {/* Arrow between nodes on desktop */}
                                {idx !== pipelineSteps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        whileInView={{ opacity: 1, width: "auto" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                                        className="hidden md:flex flex-1 items-center justify-center px-4"
                                    >
                                        <FiArrowRight size={24} className="text-neutral-600" />
                                    </motion.div>
                                )}

                                {/* Arrow down on mobile */}
                                {idx !== pipelineSteps.length - 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        whileInView={{ opacity: 1, height: "auto" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                                        className="md:hidden flex items-center justify-center py-2"
                                    >
                                        <div className="h-8 w-[1px] bg-neutral-700" />
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
