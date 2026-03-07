"use client";

import { motion } from "framer-motion";
import { SiGithub, SiLeetcode, SiCodeforces } from "react-icons/si";
import TiltCard from "@/components/ui/TiltCard";

const profiles = [
    {
        platform: "GitHub",
        icon: SiGithub,
        link: "https://github.com/kshitijx07",
        handle: "kshitijx07",
        color: "group-hover:text-white"
    },
    {
        platform: "LeetCode",
        icon: SiLeetcode,
        link: "https://leetcode.com/u/kshitij72",
        handle: "kshitij72",
        color: "group-hover:text-[#FFA116]"
    },
    {
        platform: "Codeforces",
        icon: SiCodeforces,
        link: "https://codeforces.com/profile/kshitij___x07",
        handle: "kshitij___x07",
        color: "group-hover:text-blue-500"
    }
];

export default function Achievements() {
    return (
        <section className="py-24 px-6 relative z-10" id="achievements">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-neutral-500 font-mono">06.</span>
                        <div className="h-[1px] w-12 bg-neutral-600" />
                        <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">Coding Profiles</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Competitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">Programming</span>
                    </h2>
                </motion.div>

                import TiltCard from "@/components/ui/TiltCard";

                // ... existing code ...

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profiles.map((profile, idx) => (
                        <motion.div
                            key={profile.platform}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                        >
                            <TiltCard>
                                <a
                                    href={profile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card group p-6 rounded-2xl flex items-center justify-between transition-all duration-300 border border-white/5 hover:border-white/20 w-full h-full"
                                >
                                    <div className="flex items-center gap-4">
                                        <profile.icon size={32} className={`text-neutral-500 transition-colors duration-300 ${profile.color}`} />
                                        <div>
                                            <h4 className="font-bold text-lg">{profile.platform}</h4>
                                            <p className="text-sm font-mono text-neutral-400">@{profile.handle}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        ↗
                                    </div>
                                </a>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
