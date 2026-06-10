"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SOFTWARE } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";

export default function Software() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="tools" className="relative w-full h-full lg:h-screen flex items-center justify-center py-24 lg:py-0 px-5 md:px-20 bg-surface-lowest overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="font-space text-xs tracking-[0.2em] text-neon-purple uppercase block mb-2"
            >
              The Engine Room
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-sora text-3xl md:text-5xl font-bold text-white"
            >
              Software Arsenal
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant font-inter max-w-sm text-right"
          >
            Utilizing industry-standard tools to deliver pixel-perfect results every time.
          </motion.p>
        </div>

        {/* Software Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SOFTWARE.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
            >
              <GlassCard
                glowColor={tool.color}
                className="p-10 rounded-3xl group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={`p-4 rounded-2xl ${
                      tool.color === "blue"
                        ? "bg-neon-blue/10"
                        : "bg-neon-purple/10"
                    }`}
                  >
                    <span className="text-4xl">{tool.icon}</span>
                  </div>
                  <span className="font-space text-sm text-on-surface-variant">
                    {tool.proficiency}% Proficiency
                  </span>
                </div>

                <h3 className="font-sora text-2xl font-bold text-white mb-4">
                  {tool.name}
                </h3>
                <p className="text-on-surface-variant font-inter mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* Proficiency bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tool.proficiency}%` } : {}}
                    transition={{ delay: 0.8 + index * 0.2, duration: 1.2, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      tool.color === "blue"
                        ? "bg-neon-blue shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                        : "bg-neon-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                    }`}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
