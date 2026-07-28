"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, MessageSquare, Repeat, ExternalLink, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { FiLinkedin } from "react-icons/fi";
import PinterestCardWrapper from "@/components/ui/PinterestCardWrapper";

export default function LinkedInUpdatesModule() {
  const [data, setData] = useState<any>(null);
  const [activePostIdx, setActivePostIdx] = useState(0);

  useEffect(() => {
    fetch("/api/linkedin")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const posts = data?.posts || [];
  const currentPost = posts[activePostIdx] || posts[0];

  const handleNext = () => {
    if (posts.length > 0) {
      setActivePostIdx((prev) => (prev + 1) % posts.length);
    }
  };

  const handlePrev = () => {
    if (posts.length > 0) {
      setActivePostIdx((prev) => (prev - 1 + posts.length) % posts.length);
    }
  };

  return (
    <PinterestCardWrapper stampText="LINKEDIN FEED" pinLabel="Pin Feed">
      <div className="w-full overflow-hidden" data-cursor="LinkedIn">
        {/* Module Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#E8E3DA] dark:border-[#2E2C29] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-sm">
              <FiLinkedin size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] transition-colors">
                  LinkedIn Activity & Updates
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] dark:text-[#388DFF] text-[10px] font-mono font-bold uppercase">
                  Verified Feed
                </span>
              </div>
              <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] font-mono transition-colors">
                Recent career updates, project releases & announcements
              </p>
            </div>
          </div>

          {/* Action & Pagination Controls */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/kshitij-kumbhar-369777x/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Follow on LinkedIn</span>
              <ExternalLink size={13} />
            </a>

            {posts.length > 1 && (
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7] active:scale-90"
                  title="Previous Post"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-[#EFECE6] dark:bg-[#2A2825] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors text-[#1A1918] dark:text-[#FAF9F7] active:scale-90"
                  title="Next Post"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Post Display */}
        {currentPost ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPost.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F9F7F4] dark:bg-[#242220] p-5 rounded-2xl border border-[#E8E3DA] dark:border-[#2E2C29] shadow-sm transition-colors"
            >
              {/* Author Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentPost.avatar}
                    alt={currentPost.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0A66C2] shadow-sm"
                  />
                  <div>
                    <h4 className="text-base font-editorial font-bold text-[#1A1918] dark:text-[#FAF9F7] flex items-center gap-1.5 transition-colors">
                      <span>{currentPost.author}</span>
                      <Sparkles size={13} className="text-[#0A66C2] dark:text-[#388DFF]" />
                    </h4>
                    <p className="text-xs text-[#6E6C68] dark:text-[#A3A098] font-mono line-clamp-1 transition-colors">
                      {currentPost.authorTitle}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#6E6C68] dark:text-[#A3A098] font-mono shrink-0">
                  {currentPost.date}
                </span>
              </div>

              {/* Content text */}
              <p className="text-xs md:text-sm text-[#2B2A29] dark:text-[#FAF9F7] leading-relaxed mb-4 transition-colors font-sans whitespace-pre-line">
                {currentPost.content}
              </p>

              {/* Media Thumbnail Preview if present */}
              {currentPost.media && (
                <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden mb-4 border border-[#E8E3DA] dark:border-[#2E2C29] bg-[#EFECE6] dark:bg-[#1C1B19]">
                  <img src={currentPost.media} alt="Post media" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {currentPost.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[#EFECE6] dark:bg-[#1C1B19] text-[#0A66C2] dark:text-[#388DFF] text-[11px] font-mono transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reaction Bar & External Link */}
              <div className="pt-3 border-t border-[#E8E3DA] dark:border-[#2E2C29] flex items-center justify-between text-xs font-mono text-[#6E6C68] dark:text-[#A3A098] transition-colors">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-[#0A66C2] transition-colors cursor-pointer">
                    <ThumbsUp size={14} className="text-[#0A66C2]" />
                    <span>{currentPost.likes}</span>
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#0A66C2] transition-colors cursor-pointer">
                    <MessageSquare size={14} />
                    <span>{currentPost.comments}</span>
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#0A66C2] transition-colors cursor-pointer">
                    <Repeat size={14} />
                    <span>{currentPost.reposts}</span>
                  </span>
                </div>

                <a
                  href={currentPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#0A66C2] dark:hover:text-[#388DFF] transition-colors font-medium"
                >
                  <span>View Post on LinkedIn</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}

        {/* Post Quick Selector Dots */}
        {posts.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {posts.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setActivePostIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  activePostIdx === idx ? "w-6 bg-[#0A66C2]" : "w-2 bg-[#EFECE6] dark:bg-[#2A2825]"
                }`}
                title={`Go to update ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </PinterestCardWrapper>
  );
}
