"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id="stats"
      className="relative w-full h-full lg:h-screen flex items-center justify-center py-20 lg:py-0 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-lowest via-surface-high to-surface-lowest" />

      {/* Animated line */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"
      />
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"
      />

      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <h3
                className={`font-sora text-4xl md:text-6xl font-extrabold mb-2 ${
                  stat.color === "blue"
                    ? "text-neon-blue glow-blue"
                    : "text-neon-purple glow-purple"
                }`}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </h3>
              <p className="font-space text-xs tracking-[0.15em] text-on-surface-variant uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
