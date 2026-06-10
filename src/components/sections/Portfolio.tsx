"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PROJECTS, PORTFOLIO_CATEGORIES } from "@/lib/constants";

function VideoCard({
  project,
  index,
  isInView,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  isInView: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Autoplay when the card enters viewport
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-[16/10] glass border-white/5 cursor-pointer"
    >
      {/* Video always visible */}
      <div className="absolute inset-0 bg-surface-high">
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-space text-[10px] tracking-wider bg-neon-blue/20 text-neon-blue px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h4 className="font-sora text-xl font-bold text-white">
          {project.title}
        </h4>
        <p className="text-on-surface-variant text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter">
          {project.category}
        </p>
      </div>

      {/* Play icon on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4">
          <span className="font-space text-[10px] tracking-wider bg-neon-purple/30 text-neon-purple px-3 py-1 rounded-full border border-neon-purple/30">
            FEATURED
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects =
    activeCategory === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} id="portfolio" className="relative w-full h-full lg:h-screen flex items-center justify-center py-24 lg:py-0 px-5 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-6">
            Featured Work
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-neon-blue text-background shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                    : "glass text-white hover:border-neon-blue/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <VideoCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
