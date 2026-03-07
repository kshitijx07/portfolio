"use client";

import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { useState } from "react";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSent(true);
            setTimeout(() => setIsSent(false), 3000);
        }, 1500);
    };

    return (
        <section className="py-32 px-6 relative z-10 bg-black/50 backdrop-blur-md border-t border-white/5" id="contact">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <span className="uppercase tracking-[0.2em] text-xs text-neutral-400">What&apos;s Next?</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">Touch</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Although I&apos;m not currently looking for any new opportunities, my inbox is always open.
                        Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Links */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6 justify-center"
                    >
                        <a href="mailto:kumbharkshitij2003@gmail.com" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <FiMail size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Email</h4>
                                <p className="text-sm text-neutral-400 font-mono">kumbharkshitij2003@gmail.com</p>
                            </div>
                        </a>

                        <a href="https://github.com/kshitijx07" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <FiGithub size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">GitHub</h4>
                                <p className="text-sm text-neutral-400 font-mono">@kshitijx07</p>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/kshitij-kumbhar-4129712a3" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0A66C2] group-hover:text-white transition-all">
                                <FiLinkedin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">LinkedIn</h4>
                                <p className="text-sm text-neutral-400 font-mono">Kshitij Kumbhar</p>
                            </div>
                        </a>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 glass-card p-8 rounded-2xl border border-white/10"
                        suppressHydrationWarning
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                suppressHydrationWarning
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                suppressHydrationWarning
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                required
                                suppressHydrationWarning
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isSent}
                            suppressHydrationWarning
                            className="mt-4 group relative px-6 py-3 bg-white text-black font-bold tracking-wide rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            <span className="relative z-10">
                                {isSubmitting ? "Sending..." : isSent ? "Message Sent!" : "Send Message"}
                            </span>
                            {!isSubmitting && !isSent && <FiSend className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                            <div className="absolute inset-0 bg-neutral-300 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 z-0" />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
