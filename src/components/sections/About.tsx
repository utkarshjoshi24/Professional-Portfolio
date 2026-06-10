"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative w-full h-full lg:h-screen flex items-center justify-center py-24 lg:py-0 px-5 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-8 md:p-16 rounded-[2rem]">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Text Content */}
            <div className="w-full md:w-1/2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-space text-xs tracking-[0.2em] text-neon-blue uppercase mb-4 block"
              >
                The Creative
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sora text-3xl md:text-5xl font-bold text-white mb-2"
              >
                {SITE_CONFIG.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-space text-sm text-neon-purple mb-6"
              >
                {SITE_CONFIG.profession}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-inter text-on-surface-variant text-lg leading-relaxed mb-8"
              >
                {SITE_CONFIG.description}
              </motion.p>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-4 flex-wrap"
              >
                {["VFX Master", "Colorist", "Motion Designer"].map((badge, i) => (
                  <div
                    key={badge}
                    className="glass px-4 py-2 rounded-xl flex items-center gap-2"
                  >
                    <span className={`text-lg ${i % 2 === 0 ? "text-neon-blue" : "text-neon-purple"}`}>
                      {i === 0 ? "✦" : i === 1 ? "🎨" : "⚡"}
                    </span>
                    <span className="font-sora text-sm font-semibold text-white">
                      {badge}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full md:w-1/2"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
                {/* Abstract visual representation */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Concentric rings */}
                    {[1, 2, 3, 4].map((ring) => (
                      <div
                        key={ring}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-blue/10"
                        style={{
                          width: `${ring * 80}px`,
                          height: `${ring * 80}px`,
                          animationDuration: `${ring * 8}s`,
                          animation: `spin ${ring * 15}s linear infinite${ring % 2 === 0 ? " reverse" : ""}`,
                        }}
                      />
                    ))}
                    {/* Center element */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_40px_rgba(0,217,255,0.3)]">
                      <span className="text-3xl">🎬</span>
                    </div>
                  </div>
                </div>
                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
