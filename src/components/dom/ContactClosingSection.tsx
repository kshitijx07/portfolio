"use client";

import React, { useState, useEffect } from "react";
import ContactGlassScene from "@/components/canvas/ContactGlassScene";
import { subscribePointer } from "@/lib/bus";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Download,
  Terminal,
  ShieldCheck,
  Globe,
  ExternalLink,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { ScrambleText } from "@/components/ui/scramble-text";

export default function ContactClosingSection() {
  const [coords, setCoords] = useState("0799 X 0613 Y");
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [timeUtc, setTimeUtc] = useState("");

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "DevOps Infrastructure",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [charCount, setCharCount] = useState(0);

  const email = "kshitijkumbhar007@gmail.com";
  const phone = "+91-7058157357";
  const location = "Pune, Maharashtra, India";

  // Real-time Coordinate & Time Telemetry
  useEffect(() => {
    const unsubPointer = subscribePointer((state) => {
      const x = Math.round(state.x * 1000).toString().padStart(4, "0");
      const y = Math.round((1.0 - state.y) * 1000).toString().padStart(4, "0");
      setCoords(`${x} X ${y} Y`);
    });

    const updateClock = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTimeUtc(`${istTime} IST (UTC+5:30)`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      unsubPointer();
      clearInterval(interval);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus("sending");

    const subject = encodeURIComponent(
      `[Portfolio Contact // ${formState.category}] from ${formState.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCategory: ${formState.category}\n\nMessage:\n${formState.message}`
    );
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setFormStatus("success");
      window.location.href = mailtoUrl;
      setTimeout(() => {
        setFormStatus("idle");
        setFormState({
          name: "",
          email: "",
          category: "DevOps Infrastructure",
          message: "",
        });
        setCharCount(0);
      }, 5000);
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-[#00104A] text-white selection:bg-[#B4F342] selection:text-black border-t border-white/15"
    >
      {/* ── 1. 3D Stacked Glass Letters & Optical Star 6 Canvas ──── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <ContactGlassScene />
      </div>

      {/* ── 2. Retro HUD Wireframe Crosshairs ─────────────────────── */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none z-0 opacity-15">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="relative border-[0.5px] border-white/30">
            <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-xs text-white/40 font-mono">
              +
            </span>
          </div>
        ))}
      </div>

      {/* ── 3. Main Content Container ─────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-14 py-20 lg:py-28 flex flex-col justify-between min-h-screen space-y-16">
        {/* Top Header Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6 bg-[#00104A]/80 backdrop-blur-md p-6 rounded-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#4DEEEA] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#B4F342] animate-pulse" />
              <span>07 // SECURE DISPATCH GATEWAY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Initiate Contact
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-xs border border-white/15 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-[#B4F342]" />
              <span className="font-semibold">{timeUtc || "00:00:00 IST"}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-xs border border-white/15 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-[#4DEEEA]" />
              <span className="font-semibold">TLS 1.3 SECURED</span>
            </div>
          </div>
        </div>

        {/* Middle Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Coordinates & Status Directory */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <ScrambleText
                text="SYSTEMS ARCHITECTURE & CLOUD INFRASTRUCTURE"
                className="text-xs sm:text-sm font-mono text-[#B4F342] tracking-wider font-bold"
              />
              <h3 className="text-4xl sm:text-5xl font-black uppercase leading-[1.08] tracking-tight text-white">
                Let's Build
                <br />
                Something
                <br />
                Scalable & Resilient
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed max-w-md pt-2">
                Available for full-time DevOps, Cloud Infrastructure, and
                Distributed Systems engineering roles. Open to technical
                consulting and production pipeline optimizations.
              </p>
            </div>

            {/* Direct Action Cards */}
            <div className="space-y-3.5 font-mono text-sm">
              {/* Email Trigger */}
              <div className="p-4 sm:p-5 bg-black/70 border border-white/15 rounded-sm hover:border-[#4DEEEA] transition-colors flex items-center justify-between group backdrop-blur-md shadow-lg min-h-[72px]">
                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-[#4DEEEA] shrink-0" />
                  <div>
                    <div className="text-xs text-white/50 uppercase font-semibold">
                      Direct Email Inquiries
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="min-h-[44px] px-4 py-2 bg-white/10 hover:bg-[#4DEEEA] hover:text-black rounded-xs transition-colors flex items-center gap-2 text-xs font-bold shrink-0 ml-2 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#B4F342]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Trigger */}
              <div className="p-4 sm:p-5 bg-black/70 border border-white/15 rounded-sm hover:border-[#B4F342] transition-colors flex items-center justify-between group backdrop-blur-md shadow-lg min-h-[72px]">
                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-[#B4F342] shrink-0" />
                  <div>
                    <div className="text-xs text-white/50 uppercase font-semibold">
                      Voice / WhatsApp Channel
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{phone}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="min-h-[44px] px-4 py-2 bg-white/10 hover:bg-[#B4F342] hover:text-black rounded-xs transition-colors flex items-center gap-2 text-xs font-bold shrink-0 ml-2 cursor-pointer"
                  title="Copy phone to clipboard"
                >
                  {phoneCopied ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Badge */}
              <div className="p-4 sm:p-5 bg-black/70 border border-white/15 rounded-sm flex items-center justify-between backdrop-blur-md shadow-lg min-h-[72px]">
                <div className="flex items-center gap-3.5">
                  <MapPin className="w-5 h-5 text-[#FF3E1D] shrink-0" />
                  <div>
                    <div className="text-xs text-white/50 uppercase font-semibold">
                      Operations Base
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{location}</div>
                  </div>
                </div>
                <span className="bg-[#B4F342]/15 text-[#B4F342] border border-[#B4F342]/40 px-3 py-1 rounded-xs text-xs font-bold">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Resume Download CTA */}
            <a
              href="/Kshitij_Kumbhar_Resume.pdf"
              download="Kshitij_Kumbhar_Resume.pdf"
              className="inline-flex items-center justify-center gap-3 w-full min-h-[52px] py-3.5 px-6 bg-white/10 hover:bg-[#B4F342] hover:text-black border border-white/25 font-mono text-sm font-black uppercase tracking-wider rounded-sm transition-all shadow-xl cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>Download Verified Resume (PDF)</span>
            </a>
          </div>

          {/* Right Column: Interactive Dispatch Terminal Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/20 bg-black/80 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-sm shadow-2xl space-y-7">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF3E1D]" />
                  <span className="w-3 h-3 rounded-full bg-[#E5B53B]" />
                  <span className="w-3 h-3 rounded-full bg-[#B4F342]" />
                  <span className="ml-2 text-white/60 font-semibold">
                    TERMINAL_DISPATCH // v2.6.4
                  </span>
                </div>
                <div className="text-[#4DEEEA] font-bold">
                  STATUS: 200 READY
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleFormSubmit} className="space-y-6 font-mono">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/80 uppercase font-bold tracking-wider">
                      // 01. Operator Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="e.g. Alex Chen"
                      className="w-full min-h-[48px] bg-white/5 border border-white/20 px-4 py-3 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4DEEEA] focus:ring-1 focus:ring-[#4DEEEA] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/80 uppercase font-bold tracking-wider">
                      // 02. Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="alex@enterprise.com"
                      className="w-full min-h-[48px] bg-white/5 border border-white/20 px-4 py-3 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4DEEEA] focus:ring-1 focus:ring-[#4DEEEA] transition-all"
                    />
                  </div>
                </div>

                {/* Scope Category */}
                <div className="space-y-2">
                  <label className="text-xs text-white/80 uppercase font-bold tracking-wider">
                    // 03. Engagement Scope
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({ ...formState, category: e.target.value })
                    }
                    className="w-full min-h-[48px] bg-[#0D0D0D] border border-white/20 px-4 py-3 rounded-sm text-sm text-white focus:outline-none focus:border-[#B4F342] focus:ring-1 focus:ring-[#B4F342] transition-all"
                  >
                    <option value="DevOps Infrastructure">
                      DevOps Infrastructure (AWS, EKS, Terraform)
                    </option>
                    <option value="CI/CD & GitOps Automation">
                      CI/CD & GitOps Automation (Jenkins, Actions, Docker)
                    </option>
                    <option value="Distributed AI Multi-Agent Swarms">
                      Distributed AI Multi-Agent Swarms (LangGraph, MCP)
                    </option>
                    <option value="Full Stack Cloud Development">
                      Full Stack Cloud Development (React, Node, Spring Boot)
                    </option>
                    <option value="General Technical Inquiry">
                      General Technical Inquiry / Networking
                    </option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-white/80 uppercase font-bold tracking-wider">
                    <span>// 04. Transmission Payload *</span>
                    <span className="text-white/50">{charCount}/1000</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={1000}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({ ...formState, message: e.target.value });
                      setCharCount(e.target.value.length);
                    }}
                    placeholder="Provide context regarding your infrastructure challenges, project timeline, or team requirements..."
                    className="w-full min-h-[110px] bg-white/5 border border-white/20 p-4 rounded-sm text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#B4F342] focus:ring-1 focus:ring-[#B4F342] transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full min-h-[52px] py-4 px-6 bg-[#B4F342] hover:bg-white text-black font-black uppercase tracking-wider text-sm rounded-sm transition-all flex items-center justify-center gap-2.5 shadow-xl disabled:opacity-50 cursor-pointer"
                >
                  {formStatus === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>ENCRYPTING & TRANSMITTING...</span>
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <Check className="w-5 h-5 text-black" />
                      <span>TRANSMISSION DISPATCHED // 200 OK</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Dispatch Transmission via Mailto Gateway</span>
                    </>
                  )}
                </button>
              </form>

              {/* Status Message */}
              {formStatus === "success" && (
                <div className="p-4 bg-[#B4F342]/15 border border-[#B4F342]/40 text-[#B4F342] text-sm font-mono rounded-sm text-center font-bold">
                  Your email client has been prepared. If it did not open
                  automatically, reach directly at {email}.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 4. Footer Directory & Legal / Telemetry ─────────────── */}
        <footer className="border-t border-white/15 pt-8 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 font-mono text-sm text-white/80">
          <div className="space-y-1.5">
            <div className="text-white font-extrabold tracking-wider text-sm sm:text-base">
              KSHITIJ KUMBHAR // DEVOPS & CLOUD ARCHITECT
            </div>
            <div className="text-white/50 text-xs">
              &copy; 2026 ALL RIGHTS RESERVED. LAT: 18.5204° N // LON: 73.8567° E
            </div>
          </div>

          {/* Live Pointer Telemetry */}
          <div className="hidden md:flex items-center gap-2.5 font-bold text-white tracking-widest bg-black/60 px-4 py-2 rounded-xs border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#4DEEEA] animate-ping" />
            <span>{coords}</span>
          </div>

          {/* Social Channels */}
          <div className="flex flex-wrap items-center gap-6 pointer-events-auto text-sm font-bold">
            <a
              href="https://github.com/kshitijx07"
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] flex items-center gap-1.5 hover:text-[#4DEEEA] transition-colors"
            >
              <FiGithub size={16} />
              <span>GITHUB</span>
            </a>
            <a
              href="https://linkedin.com/in/kshitij-kumbhar"
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] flex items-center gap-1.5 hover:text-[#4DEEEA] transition-colors"
            >
              <FiLinkedin size={16} />
              <span>LINKEDIN</span>
            </a>
            <a
              href="https://leetcode.com/u/kshitij72"
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] flex items-center hover:text-[#B4F342] transition-colors"
            >
              LEETCODE
            </a>
            <a
              href="https://codeforces.com/profile/kshitijx07"
              target="_blank"
              rel="noreferrer"
              className="min-h-[44px] flex items-center hover:text-[#FF3E1D] transition-colors"
            >
              CODEFORCES
            </a>
            <Globe className="w-5 h-5 text-white/70 animate-spin" />
          </div>
        </footer>
      </div>
    </section>
  );
}
