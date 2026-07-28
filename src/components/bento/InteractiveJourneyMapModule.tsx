"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Compass, Globe2, ArrowUpRight, ListFilter, Sparkles } from "lucide-react";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";
import { ProjectData } from "@/components/modals/CaseStudyModal";

interface MapPinLocation {
  id: string;
  name: string;
  region: string;
  coords: { x: number; y: number }; // Percentage coords on map
  type: "project" | "internship" | "education";
  title: string;
  subtitle: string;
  tech: string[];
  image: string;
  projectData?: any;
}

const mapLocations: MapPinLocation[] = [
  {
    id: "pune",
    name: "Pune, India",
    region: "Asia / Maharashtra (18.5204° N, 73.8567° E)",
    coords: { x: 72, y: 55 },
    type: "education",
    title: "MIT Academy of Engineering",
    subtitle: "B.Tech Computer Engineering (CGPA 8.48/10) • Core Engineering Base",
    tech: ["DSA", "System Design", "C++", "Java"],
    image: "/hostelhub_ui.png",
  },
  {
    id: "mumbai",
    name: "Mumbai, India",
    region: "Colgate-Palmolive DevOps Hub",
    coords: { x: 68, y: 58 },
    type: "internship",
    title: "Colgate-Palmolive DevOps Intern",
    subtitle: "Enterprise CI/CD Automation, Jenkins Pipelines, Docker & AWS Cloud",
    tech: ["AWS", "Jenkins", "Docker", "Terraform", "Linux"],
    image: "/serverless_xray_ui.png",
  },
  {
    id: "hostelhub-cloud",
    name: "AWS ap-south-1 (Mumbai Region)",
    region: "Cloud Infrastructure / Kubernetes",
    coords: { x: 62, y: 48 },
    type: "project",
    title: "HostelHub — Cloud Architecture",
    subtitle: "Decoupled React on S3 + Node.js REST API on AWS EKS with CloudFront OAC",
    tech: ["AWS EKS", "Kubernetes", "CloudFront", "Docker", "Jenkins"],
    image: "/hostelhub_ui.png",
  },
  {
    id: "grocito-remote",
    name: "Remote Full Stack Node",
    region: "Campus Credential Ecosystem",
    coords: { x: 42, y: 38 },
    type: "project",
    title: "Grocito — 3-Portal Delivery System",
    subtitle: "Spring Boot & MySQL multi-portal real-time order tracking platform",
    tech: ["Spring Boot", "React.js", "MySQL", "Real-Time Tracking"],
    image: "/grocito_ui.png",
  },
  {
    id: "serverless-ai",
    name: "AWS Global Serverless Mesh",
    region: "AWS Lambda & OpenAI TFLite",
    coords: { x: 28, y: 32 },
    type: "project",
    title: "Serverless AI X-Ray Analyzer",
    subtitle: "Event-driven medical imaging platform classifying chest X-rays in <1s",
    tech: ["AWS Lambda", "Terraform", "GitHub Actions", "DynamoDB"],
    image: "/serverless_xray_ui.png",
  },
];

interface InteractiveJourneyMapModuleProps {
  onOpenCaseStudy: (project: ProjectData) => void;
  projects: ProjectData[];
}

export default function InteractiveJourneyMapModule({ onOpenCaseStudy, projects }: InteractiveJourneyMapModuleProps) {
  const [selectedPin, setSelectedPin] = useState<MapPinLocation>(mapLocations[0]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const getAssociatedProject = (pin: MapPinLocation) => {
    return projects.find((p) => p.title.toLowerCase().includes(pin.id.split("-")[0])) || projects[0];
  };

  return (
    <PinterestCardWrapper stampText="GEOGRAPHY // JOURNEY MAP" pinLabel="Pin Map">
      <div className="w-full flex flex-col justify-between" data-cursor="Pan Map">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E3DA]">
          <div>
            <span className="bento-label">CHAPTER 02 // GEOGRAPHIC ITINERARY</span>
            <h3 className="text-2xl font-editorial font-bold text-[#1A1918]">
              Interactive Journey & Project Map
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
              className="px-3.5 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#C86D51] hover:text-white text-xs font-mono font-medium transition-colors text-[#1A1918] flex items-center gap-1.5"
            >
              {viewMode === "map" ? <ListFilter size={14} /> : <Globe2 size={14} />}
              <span>{viewMode === "map" ? "List View" : "Map View"}</span>
            </button>
          </div>
        </div>

        {/* View Mode Switcher */}
        {viewMode === "map" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* SVG/Canvas Map Canvas */}
            <div className="lg:col-span-8 relative w-full h-[380px] md:h-[440px] rounded-2xl border border-[#E8E3DA] bg-[#FAF9F7] overflow-hidden p-4 shadow-inner">
              {/* Paper Grid Lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C86D51_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* World/Regional Map Outline SVG */}
              <svg className="w-full h-full text-[#E8E3DA]" viewBox="0 0 1000 500" fill="none" stroke="currentColor">
                {/* Simplified Continents Silhouette */}
                <path
                  d="M150,150 Q200,100 300,140 Q350,220 250,280 Q180,320 120,250 Z"
                  fill="#F2E4DF"
                  fillOpacity="0.4"
                  strokeWidth="1.5"
                />
                <path
                  d="M450,120 Q550,80 650,120 Q700,200 620,300 Q500,340 430,220 Z"
                  fill="#E5EDE6"
                  fillOpacity="0.4"
                  strokeWidth="1.5"
                />
                <path
                  d="M680,180 Q780,150 880,200 Q920,300 800,360 Q720,380 660,280 Z"
                  fill="#F2E4DF"
                  fillOpacity="0.4"
                  strokeWidth="1.5"
                />

                {/* Animated Terracotta Route Lines */}
                <motion.path
                  d="M 280,160 L 420,190 L 620,240 L 680,290 L 720,275"
                  stroke="#C86D51"
                  strokeWidth="2.5"
                  strokeDasharray="6,6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
              </svg>

              {/* Interactive Location Pins */}
              {mapLocations.map((pin) => {
                const isSelected = selectedPin.id === pin.id;
                return (
                  <motion.div
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    style={{ left: `${pin.coords.x}%`, top: `${pin.coords.y}%` }}
                    whileHover={{ scale: 1.25 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  >
                    {/* Pulsating Ring */}
                    <div
                      className={`w-8 h-8 rounded-full absolute -top-2 -left-2 animate-ping opacity-75 ${
                        isSelected ? "bg-[#C86D51]" : "bg-[#2D4030]"
                      }`}
                    />

                    {/* Pin Icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white transition-colors ${
                        isSelected ? "bg-[#C86D51]" : "bg-[#1A1918] group-hover:bg-[#C86D51]"
                      }`}
                    >
                      <MapPin size={13} />
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1A1918] text-white text-[10px] font-mono px-2.5 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {pin.name}
                    </div>
                  </motion.div>
                );
              })}

              {/* Map Controls */}
              <div className="absolute bottom-3 left-3 bg-[#FFFDF9]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#E8E3DA] text-[10px] font-mono text-[#6E6C68] flex items-center gap-2 shadow-sm">
                <Compass size={13} className="text-[#C86D51] animate-spin-slow" />
                <span>Pan & Click Pins to Explore Journey</span>
              </div>
            </div>

            {/* Selected Location Card Pop-up Banner */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPin.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FFFDF9] border border-[#E8E3DA] p-5 rounded-2xl shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-[#E8E3DA] bg-[#EFECE6]">
                      <img src={selectedPin.image} alt={selectedPin.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#1A1918] text-white text-[10px] font-mono">
                        {selectedPin.name}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[#C86D51] uppercase tracking-wider block mb-1">
                      {selectedPin.region}
                    </span>

                    <h4 className="text-xl font-editorial font-bold text-[#1A1918] mb-2">
                      {selectedPin.title}
                    </h4>

                    <p className="text-xs text-[#6E6C68] leading-relaxed mb-4">
                      {selectedPin.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {selectedPin.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[#F9F7F4] border border-[#E8E3DA] text-[10px] font-mono text-[#2B2A29]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCaseStudy(getAssociatedProject(selectedPin))}
                    className="w-full py-2.5 rounded-full bg-[#1A1918] hover:bg-[#C86D51] text-white text-xs font-mono font-medium transition-colors shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Accessibility Alternative List View */
          <div className="space-y-3 font-mono text-xs">
            {mapLocations.map((pin) => (
              <div
                key={pin.id}
                onClick={() => {
                  setSelectedPin(pin);
                  setViewMode("map");
                }}
                className="p-4 rounded-xl bg-[#F9F7F4] border border-[#E8E3DA] hover:border-[#C86D51] cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="text-[#C86D51] font-bold block mb-0.5">{pin.name} — {pin.title}</span>
                  <span className="text-[#6E6C68] text-[11px] block">{pin.subtitle}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#EFECE6] text-[10px] text-[#1A1918]">{pin.type}</span>
                  <ArrowUpRight size={14} className="text-[#C86D51]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PinterestCardWrapper>
  );
}
