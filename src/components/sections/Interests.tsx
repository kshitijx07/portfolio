"use client";

import { motion } from "framer-motion";
import { FiStar, FiCamera, FiCompass, FiCoffee } from "react-icons/fi";
import { FaGlobeAsia } from "react-icons/fa";
import { MdOutlineSportsCricket } from "react-icons/md";
import Magnetic from "@/components/ui/Magnetic";

const interests = [
    { name: "Astrophysics", icon: FiStar },
    { name: "Geopolitics", icon: FaGlobeAsia },
    { name: "Photography", icon: FiCamera },
    { name: "Cricket", icon: MdOutlineSportsCricket },
    { name: "Cooking", icon: FiCoffee },
    { name: "Off-roading", icon: FiCompass },
];

export default function Interests() {
    return (
        <section className="py-24 px-6 relative z-10" id="interests">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Beyond Code</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">Interests</span>
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {interests.map((interest, idx) => (
                        <motion.div
                            key={interest.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                            <Magnetic>
                                <div className="glass-card px-6 py-4 rounded-full flex items-center gap-3 cursor-default border border-white/5 hover:border-white/20 transition-colors group text-nowrap">
                                    <interest.icon className="text-neutral-500 group-hover:text-white transition-colors" size={20} />
                                    <span className="font-medium tracking-wide text-neutral-300 group-hover:text-white transition-colors select-none">
                                        {interest.name}
                                    </span>
                                </div>
                            </Magnetic>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
