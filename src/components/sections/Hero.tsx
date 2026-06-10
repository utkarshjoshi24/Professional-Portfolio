"use client";

import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative w-full h-full lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-5 md:px-20 max-w-5xl mx-auto">
        {/* Portrait - static, no load animation */}
        <div className="mb-8 relative inline-block">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[3px] border-neon-blue/50 shadow-[0_0_50px_rgba(0,217,255,0.3)] relative">
            {/* Rotating gradient border */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue opacity-50" style={{ padding: "3px" }}>
              <div className="w-full h-full rounded-full bg-background" />
            </div>
            <Image
              src="/images/utkarsh-portrait.jpeg"
              alt={SITE_CONFIG.name}
              fill
              className="object-cover rounded-full absolute z-10"
              priority
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>
          {/* Decorative ring */}
          <div className="absolute -inset-4 rounded-full border border-neon-blue/10" />
        </div>

        {/* Headline - single h1 for SEO */}
        <div className="mb-4">
          <h1 className="font-sora text-4xl md:text-7xl font-extrabold tracking-tighter text-white">
            <span className="block">{SITE_CONFIG.headline}</span>
            <span className="block text-neon-blue glow-blue mt-2">
              {SITE_CONFIG.headlineAccent}
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="font-inter text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-10">
          {SITE_CONFIG.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            href="#portfolio"
            className="bg-neon-blue text-background px-10 py-4 rounded-full font-sora font-bold text-base hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(0,217,255,0.4)] inline-block"
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="glass px-10 py-4 rounded-full font-sora font-bold text-base text-white hover:border-neon-blue/50 transition-all duration-300 inline-block"
          >
            Contact Me
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
