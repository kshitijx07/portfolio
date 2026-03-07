"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
    {
        role: "Full Stack Developer Intern",
        company: "Campus Credential",
        duration: "Jan 2024 - Present",
        description: [
            "Designed and implemented RESTful APIs using Node.js and Express.",
            "Engineered frontend interfaces with React, improving site load performance by 30%.",
            "Collaborated on designing database schemas reducing query latency."
        ]
    }
];

import ParallaxText from "@/components/ui/ParallaxText";

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="py-32 px-6 relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/5" id="experience">
            <div className="max-w-4xl mx-auto" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <ParallaxText offset={30} direction="up">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-neutral-500 font-mono">05.</span>
                            <div className="h-[1px] w-12 bg-neutral-600" />
                            <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Career</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-shadow-3d">
                            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-white">Experience</span>
                        </h2>
                    </ParallaxText>
                </motion.div>

                <div className="relative pl-8 md:pl-12 ml-4">
                    {/* Background faint line */}
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10" />

                    {/* Active dynamic scroll line */}
                    <motion.div
                        style={{ height: lineHeight } as any}
                        className="absolute top-0 left-0 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-transparent via-white to-white shadow-[0_0_15px_rgba(255,255,255,0.8)] origin-top"
                    />

                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative mb-16 last:mb-0"
                        >
                            <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-white border-4 border-black box-content z-10" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                <span className="text-lg text-neutral-400 font-medium tracking-wide">@ {exp.company}</span>
                            </div>

                            <div className="text-sm font-mono text-neutral-500 mb-6 uppercase tracking-widest bg-white/5 inline-block px-3 py-1 rounded">
                                {exp.duration}
                            </div>

                            <ul className="space-y-4">
                                {exp.description.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                        className="flex gap-4 text-neutral-300 leading-relaxed text-base md:text-lg"
                                    >
                                        <span className="text-neutral-600 mt-1">▹</span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
