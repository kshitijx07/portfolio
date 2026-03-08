"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { useState, useEffect } from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
    ssr: false,
});

import ParallaxText from "@/components/ui/ParallaxText";

export default function Hero() {
    // PERFORMANCE FIX: Only render Spline when at the top of the page
    const [isHeroVisible, setIsHeroVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Unmount Spline if scrolled more than 100vh down
            if (window.scrollY > window.innerHeight) {
                if (isHeroVisible) setIsHeroVisible(false);
            } else {
                if (!isHeroVisible) setIsHeroVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHeroVisible]);

    return (
        <section className="relative w-full h-screen bg-[#050505] overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                {isHeroVisible ? (
                    <Spline scene="https://prod.spline.design/ttqM0KOYQHfnmQwm/scene.splinecode" />
                ) : (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
                )}
            </div>

            {/* Foreground Content - Pointer Events None to allow clicking Spline */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none">

                {/* Masked Text Container */}
                <div className="text-center max-w-5xl mx-auto flex flex-col items-center gap-1">
                    <div className="overflow-hidden mb-4 py-2">
                        <motion.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="text-neutral-400 tracking-[0.2em] uppercase text-sm font-medium"
                        >
                            Welcome to my universe
                        </motion.p>
                    </div>

                    <div className="overflow-hidden py-2">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="text-6xl md:text-8xl lg:text-[7rem] font-black italic tracking-tighter leading-none text-white drop-shadow-2xl text-shadow-3d"
                        >
                            KSHITIJ KUMBHAR
                        </motion.h1>
                    </div>

                    <ParallaxText offset={30} direction="down">
                        <div className="overflow-hidden py-2 mt-2">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                                className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600 font-mono tracking-wide"
                            >
                                DevOps & Full Stack Engineer
                            </motion.p>
                        </div>
                    </ParallaxText>

                    {/* CTA Buttons - Restore pointer events */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pointer-events-auto"
                    >
                        <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} suppressHydrationWarning className="group relative px-8 py-4 bg-white text-black font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 w-full sm:w-auto">
                            <span className="relative z-10">Explore Work</span>
                            <FiArrowDown className="relative z-10 group-hover:translate-y-1 transition-transform" />
                            <div className="absolute inset-0 bg-neutral-200 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 z-0" />
                        </button>

                        <button onClick={() => alert("Resume PDF requires hosting link. Please add your drive link here.")} suppressHydrationWarning className="glass-card group px-8 py-4 text-white font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 w-full sm:w-auto backdrop-blur-md">
                            <span>Resume</span>
                            <FiDownload className="group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-500 pointer-events-none z-10"
            >
                <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <div className="w-[1px] h-16 bg-neutral-800 overflow-hidden relative">
                    <motion.div
                        animate={{
                            y: ["-100%", "100%"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
