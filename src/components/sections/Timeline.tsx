"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TIMELINE_ENTRIES } from "@/lib/constants";

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="timeline" className="relative w-full h-full lg:h-screen flex items-center justify-center py-24 lg:py-0 px-5 md:px-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-neon-blue/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center font-sora text-3xl md:text-5xl font-bold text-white mb-4 glow-blue"
        >
          Evolution of Style
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-on-surface-variant mb-16 font-inter"
        >
          My journey through the world of video editing
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            className="absolute left-8 md:left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full overflow-hidden"
            style={{ background: "linear-gradient(180deg, #00d9ff 0%, #7C3AED 100%)" }}
          />

          {TIMELINE_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.3 }}
              className={`relative mb-16 last:mb-0 md:flex items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content card */}
              <div className={`md:w-[45%] ml-16 md:ml-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <div className="glass p-8 rounded-2xl glass-hover">
                  <span className="font-space text-sm text-neon-blue">
                    {entry.period}
                  </span>
                  <h3 className="font-sora text-2xl font-bold text-white mt-2 mb-1">
                    {entry.title}
                  </h3>
                  <p className="font-space text-xs text-neon-purple tracking-wider mb-3">
                    {entry.duration}
                  </p>
                  <p className="text-on-surface-variant font-inter text-sm leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>

              {/* Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.3, type: "spring" }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                    ${entry.color === "blue"
                      ? "bg-neon-blue shadow-[0_0_25px_rgba(0,217,255,0.8)]"
                      : "bg-neon-purple shadow-[0_0_25px_rgba(124,58,237,0.8)]"
                    } border-4 border-background`}
                >
                  {entry.icon}
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
