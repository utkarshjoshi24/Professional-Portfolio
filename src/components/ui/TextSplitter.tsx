"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextSplitterProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "chars" | "words";
}

export default function TextSplitter({
  text,
  className = "",
  delay = 0,
  type = "words",
}: TextSplitterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const items = type === "chars" ? text.split("") : text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {item}
            {type === "words" && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
