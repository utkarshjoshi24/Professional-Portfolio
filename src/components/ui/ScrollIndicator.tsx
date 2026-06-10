"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span
        className="text-on-surface-variant uppercase tracking-[0.3em] font-space"
        style={{ fontSize: "10px" }}
      >
        Scroll
      </span>
      <div className="w-[2px] h-12 rounded-full bg-white/10 relative overflow-hidden">
        <motion.div
          className="w-full h-1/2 bg-neon-blue rounded-full absolute"
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-neon-blue"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path d="M12 5v14M5 12l7 7 7-7" />
      </motion.svg>
    </motion.div>
  );
}
