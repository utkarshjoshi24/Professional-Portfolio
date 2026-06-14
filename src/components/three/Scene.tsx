"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_PLAYLIST = [
  "/videos/Netflix Ad.mov",
  "/videos/Harry Potter.mov",
  "/videos/Thomas Shelby.mov",
  "/videos/Parallax Effect.mov",
  "/videos/Saas-2.mov",
];

/**
 * Lightweight Apple-style animated background.
 * Integrates an ambient cinematic video playlist loop, color-drifting orbs, and film grain.
 */
export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

  const handleVideoEnded = () => {
    setCurrentVideoIdx((prevIdx) => (prevIdx + 1) % VIDEO_PLAYLIST.length);
  };

  // Scroll parallax effect for the background orbs
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate3d(${scrolled * 0.03}px, ${scrolled * -0.07}px, 0)`;
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate3d(0, ${scrolled * 0.12}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle film grain overlay for texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 256;

    let animId: number;
    const drawGrain = () => {
      const imageData = ctx.createImageData(256, 256);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 20;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 10; // very subtle
      }
      ctx.putImageData(imageData, 0, 0);
    };

    // Run grain at low fps to save CPU
    let frame = 0;
    const throttledGrain = () => {
      frame++;
      if (frame % 4 === 0) drawGrain();
      animId = requestAnimationFrame(throttledGrain);
    };
    throttledGrain();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Ambient Background Video Playlist */}
      <video
        key={VIDEO_PLAYLIST[currentVideoIdx]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover opacity-18 grayscale contrast-125 brightness-75 pointer-events-none"
        src={VIDEO_PLAYLIST[currentVideoIdx]}
      />

      {/* Vignette Overlay for cinematic depth & readability */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(5,5,5,0.85) 90%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

      {/* Floating gradient orbs — Apple style with Parallax Containers */}
      <div
        ref={orb1Ref}
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.08] blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
          top: "10%",
          left: "60%",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            animation: "orb-drift-1 25s ease-in-out infinite",
          }}
        />
      </div>

      <div
        ref={orb2Ref}
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[100px] will-change-transform"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          top: "50%",
          left: "20%",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            animation: "orb-drift-2 30s ease-in-out infinite",
          }}
        />
      </div>

      <div
        ref={orb3Ref}
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[80px] will-change-transform"
        style={{
          background: "radial-gradient(circle, #00d9ff 0%, transparent 70%)",
          bottom: "10%",
          right: "10%",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            animation: "orb-drift-3 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Film grain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-35 mix-blend-overlay pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
