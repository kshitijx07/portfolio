"use client";

import { m, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiArrowDown, FiDownload } from "react-icons/fi";

import ParallaxText from "@/components/ui/ParallaxText";

export default function Hero() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.1, margin: "-100px 0px -100px 0px" });
    const [loadSpline, setLoadSpline] = useState(false);
    const [SplineComponent, setSplineComponent] = useState<any>(null);

    useEffect(() => {
        // Defer WebGL Spline initialization by 1.5s to let the main layout and fonts load first
        const timer = setTimeout(async () => {
            setLoadSpline(true);
            try {
                const module = await import("@splinetool/react-spline");
                setSplineComponent(() => module.default);
            } catch (e) {
                console.error("Error loading Spline:", e);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
            <div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ display: isInView && loadSpline ? "block" : "none" }}
            >
                {isInView && loadSpline && (
                    SplineComponent ? (
                        <SplineComponent scene="https://prod.spline.design/ttqM0KOYQHfnmQwm/scene.splinecode" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30 tracking-widest text-sm font-mono animate-pulse">Initializing WebGL Engine...</div>
                    )
                )}
            </div>

            {/* Foreground Content - Pointer Events None to allow clicking Spline */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pointer-events-none">

                {/* Masked Text Container */}
                <div className="text-center max-w-5xl mx-auto flex flex-col items-center gap-1">
                    <div className="overflow-hidden mb-4 py-2">
                        <m.p
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="text-neutral-400 tracking-[0.2em] uppercase text-sm font-medium"
                        >
                            Welcome to my universe
                        </m.p>
                    </div>

                    <div className="overflow-hidden py-2">
                        <m.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="text-6xl md:text-8xl lg:text-[7rem] font-black italic tracking-tighter leading-none text-white drop-shadow-2xl text-shadow-3d"
                        >
                            KSHITIJ KUMBHAR
                        </m.h1>
                    </div>

                    <ParallaxText offset={30} direction="down">
                        <div className="overflow-hidden py-2 mt-2">
                            <m.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                                className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600 font-mono tracking-wide"
                            >
                                DevOps & Full Stack Engineer
                            </m.p>
                        </div>
                    </ParallaxText>

                    {/* CTA Buttons - Restore pointer events */}
                    <m.div
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

                        <a href="/Kshitij_Kumbhar_Resume.pdf" download="Kshitij_Kumbhar_Resume.pdf" suppressHydrationWarning className="glass-card group px-8 py-4 text-white font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 w-full sm:w-auto">
                            <span>Resume</span>
                            <FiDownload className="group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </m.div>
                </div>
            </div>

        </section>
    );
}
