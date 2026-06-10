"use client";

import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { SKILLS } from "@/lib/constants";
import SkillsSphere from "@/components/three/SkillsSphere";

function SkillsFallback() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {SKILLS.map((skill, i) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass p-6 rounded-2xl text-center group hover:border-neon-blue/30 transition-all duration-300"
        >
          <div
            className={`w-3 h-3 rounded-full mx-auto mb-3 ${
              i % 2 === 0
                ? "bg-neon-blue shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                : "bg-neon-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]"
            }`}
          />
          <p className="font-sora text-sm font-semibold text-white">{skill}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="skills" className="relative w-full h-full lg:h-screen flex items-center justify-center py-24 lg:py-0 px-5 md:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center font-sora text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Core Disciplines
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-on-surface-variant mb-16 font-inter"
        >
          An interactive map of my creative capabilities
        </motion.p>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* 3D Sphere - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block w-full lg:w-1/2 aspect-square"
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 1.5]}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#00d9ff" />
                <SkillsSphere />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Skill Cards - Both desktop and mobile */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="glass p-6 rounded-2xl group hover:border-neon-blue/30 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        i % 2 === 0
                          ? "bg-neon-blue/10"
                          : "bg-neon-purple/10"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          i % 2 === 0
                            ? "bg-neon-blue shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                            : "bg-neon-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-sora text-sm font-semibold text-white">
                        {skill}
                      </p>
                      <div className="mt-1.5 h-1 w-20 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${85 + i * 2}%` } : {}}
                          transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                          className={`h-full rounded-full ${
                            i % 2 === 0 ? "bg-neon-blue" : "bg-neon-purple"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
