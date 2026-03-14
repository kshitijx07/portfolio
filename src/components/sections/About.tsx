"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FiTerminal, FiDatabase, FiCloud } from "react-icons/fi";
import Magnetic from "@/components/ui/Magnetic";

import TextReveal from "@/components/ui/TextReveal";

const stats = [
    { label: "Projects Built", value: 12, suffix: "+" },
    { label: "Technologies", value: 25, suffix: "+" },
    { label: "Hours Coding", value: 1500, suffix: "+" }
];

const focusAreas = [
    { icon: FiCloud, title: "DevOps & Cloud", desc: "Building scalable AWS infrastructure and automated CI/CD pipelines." },
    { icon: FiTerminal, title: "Full Stack", desc: "Developing end-to-end applications with Next.js, Node.js, and Spring Boot." },
    { icon: FiDatabase, title: "System Design", desc: "Architecting reliable, distributed systems with modern architectural patterns." }
];

function Counter({ from, to, suffix }: { from: number; to: number; suffix: string }) {
    const [count, setCount] = useState(from);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start: number | null = null;
            const duration = 2000; // 2 seconds

            const animate = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const currentCount = Math.floor(progress * (to - from) + from);
                
                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, from, to]);

    return <span ref={ref}>{count}{suffix}</span>;
}

import SpotlightCard from "@/components/ui/SpotlightCard";

import ParallaxText from "@/components/ui/ParallaxText";

export default function About() {
    return (
        <section className="py-32 px-6 relative z-10 bg-[#080808] border-t border-white/5" id="about">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-24"
                >
                    <ParallaxText offset={20} direction="up">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-neutral-500 font-mono">01.</span>
                            <div className="h-[1px] w-12 bg-neutral-600" />
                            <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">About Me</span>
                        </div>
                    </ParallaxText>

                    <ParallaxText offset={40} direction="up">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic mb-8 tracking-tighter text-shadow-3d">
                            <TextReveal text="Engineering Digital Systems" className="inline-block relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-white" />
                        </h2>
                    </ParallaxText>

                    <ParallaxText offset={20} direction="down">
                        <p className="text-neutral-400 text-lg md:text-xl max-w-3xl leading-relaxed relative z-10 pointer-events-none">
                            I am a Computer Engineering Student based in Pune, India, driven by the challenge of designing robust, scalable architectures.
                            My expertise bridges the gap between sophisticated frontend interfaces and rock-solid backend infrastructure, with a deep specialization in DevOps and Cloud Automation.
                        </p>
                    </ParallaxText>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {focusAreas.map((area, idx) => (
                        <motion.div
                            key={area.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: Math.min(idx * 0.2, 0.6) }}
                        >
                            <SpotlightCard className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-500 hover:border-white/20 h-full">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-500 relative z-10">
                                    <area.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 relative z-10">{area.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed relative z-10">{area.desc}</p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 border-y border-white/10 py-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="text-center"
                        >
                            <Magnetic>
                                <div className="text-5xl md:text-7xl font-bold mb-3 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 cursor-default">
                                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                                </div>
                            </Magnetic>
                            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
