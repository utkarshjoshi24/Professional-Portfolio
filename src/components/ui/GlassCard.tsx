"use client";

import { ReactNode, useRef, MouseEvent, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple";
  tilt?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "blue",
  tilt = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tilt) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -8);
    setRotateY((x - 0.5) * 8);
    setSpotX(x * 100);
    setSpotY(y * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotX(50);
    setSpotY(50);
  };

  const glowStyles =
    glowColor === "blue"
      ? "hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.1)]"
      : "hover:border-neon-purple/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`glass glass-hover specular-edge relative overflow-hidden rounded-2xl ${glowStyles} ${className}`}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${spotX}% ${spotY}%, rgba(0,217,255,0.06), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
