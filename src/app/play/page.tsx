"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

function VideoPlayerContent() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("video");
  const videoTitle = searchParams.get("title") || "Cinematic Work";

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set title for SEO
  useEffect(() => {
    if (videoTitle) {
      document.title = `${videoTitle} | ${SITE_CONFIG.name} Portfolio`;
    }
  }, [videoTitle]);

  // Handle controls visibility fade-out on idle
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const handleMouseMove = () => resetControlsTimeout();
    window.addEventListener("mousemove", handleMouseMove);
    resetControlsTimeout();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Handle autoplay on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    resetControlsTimeout();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const w = videoRef.current.videoWidth;
    const h = videoRef.current.videoHeight;
    const ratio = w / h;
    setAspectRatio(ratio);
    setIsPortrait(w < h);
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    resetControlsTimeout();
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  if (!videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-6 font-inter">
        <div className="glass p-8 rounded-2xl max-w-md text-center border-white/10">
          <h1 className="font-sora text-2xl font-bold mb-4 text-white">No Video Found</h1>
          <p className="text-white/60 mb-6 text-sm">The video URL is missing or invalid.</p>
          <button
            onClick={() => window.close()}
            className="w-full py-3 px-6 rounded-full bg-neon-blue text-background font-bold hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,217,255,0.3)]"
          >
            Close Tab
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 md:p-8 select-none overflow-hidden font-inter"
    >
      {/* Blurred Ambient Glow */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none scale-110 filter blur-[100px] transition-opacity duration-1000">
        <video
          src={videoUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#050505]/90 z-5 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center gap-6">
        
        {/* Header Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex items-center justify-between px-2"
        >
          <button
            onClick={() => window.close()}
            className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors py-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Close Tab
          </button>
          
          <span className="font-space text-[10px] tracking-[0.2em] text-neon-blue uppercase">
            NEON_STUDIO // SCREEN_PLAYER
          </span>
        </motion.div>

        {/* Video Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.9)] flex items-center justify-center bg-black/40 backdrop-blur-sm group
            ${isPortrait 
              ? "h-[70vh] w-auto aspect-[9/16] max-w-full" 
              : "w-full aspect-video"
            }`}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Centered Large Play Button (Visible on Pause) */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Double-Click indicator overlay, loading state etc. can go here */}
        </motion.div>

        {/* Cinematic Control Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl glass-strong rounded-2xl p-4 flex flex-col gap-3.5 border border-white/10 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-20"
        >
          {/* Custom Slider / Timeline */}
          <div className="flex items-center gap-3 w-full">
            <span className="font-space text-[10px] text-white/50 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="relative flex-1 group/timeline">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-blue focus:outline-none transition-all group-hover/timeline:h-1.5"
                style={{
                  background: `linear-gradient(to right, #00d9ff ${duration ? (currentTime / duration) * 100 : 0}%, rgba(255,255,255,0.15) ${duration ? (currentTime / duration) * 100 : 0}%)`
                }}
              />
            </div>
            <span className="font-space text-[10px] text-white/50 w-10 text-left">
              {formatTime(duration)}
            </span>
          </div>

          {/* Details & Action Controls */}
          <div className="flex items-center justify-between">
            {/* Play/Pause & Volume */}
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-white/80 hover:text-neon-blue hover:scale-105 active:scale-95 transition-all focus:outline-none"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button 
                onClick={toggleMute}
                className="text-white/80 hover:text-neon-blue hover:scale-105 active:scale-95 transition-all focus:outline-none"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Video metadata titles */}
            <div className="flex flex-col items-center max-w-[50%]">
              <h1 className="font-sora text-sm md:text-base font-bold text-white tracking-wide truncate max-w-full">
                {videoTitle}
              </h1>
            </div>

            {/* Orientation and Fullscreen */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-space text-[9px] tracking-widest bg-white/5 text-white/60 border border-white/10 px-2 py-1 rounded">
                {isPortrait ? "PORTRAIT" : "LANDSCAPE"}
              </span>

              <button 
                onClick={toggleFullscreen}
                className="text-white/80 hover:text-neon-blue hover:scale-105 active:scale-95 transition-all focus:outline-none"
                title="Fullscreen"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h4.5m0-3.75v3.75m12.75 0h4.5m0-3.75v3.75M3.75 20.25h4.5m0 3.75v-3.75m12.75 0h4.5m0 3.75v-3.75" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l5.25-5.25M9 15l-5.25 5.25M9 9L3.75 3.75M15 15l5.25 5.25" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#050505] text-neon-blue font-space text-xs tracking-widest animate-pulse">
        CONNECTING STREAM...
      </div>
    }>
      <VideoPlayerContent />
    </Suspense>
  );
}
