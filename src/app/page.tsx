"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Software from "@/components/sections/Software";
import Portfolio from "@/components/sections/Portfolio";
import Stats from "@/components/sections/Stats";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Register GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lightweight CSS-based background (no R3F)
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset scroll to top on mount, clear scroll memory, and prevent browser from restoring scroll position
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      ScrollTrigger.clearScrollMemory();
    }

    // Collect active slides
    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only run cinematic slide deck on desktop (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        // Set layout styles for all slides
        slides.forEach((slide) => {
          gsap.set(slide, {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
          });
        });

        // Set initial visibility/opacity states
        slides.forEach((slide, idx) => {
          if (idx === 0) {
            gsap.set(slide, {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              pointerEvents: "auto",
              visibility: "visible",
            });
          } else {
            gsap.set(slide, {
              opacity: 0,
              scale: 1.05,
              yPercent: 20,
              pointerEvents: "none",
              visibility: "hidden",
            });
          }
        });

        // Main ScrollTrigger timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${(slides.length + 0.5) * 100}%`, // 0.5 slide scroll duration landing buffer
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Chain the transitions using robust fromTo tweens
        slides.forEach((slide, idx) => {
          if (idx === 0) return;
          const prevSlide = slides[idx - 1];
          const startTime = idx - 0.5; // Offset by the 0.5 buffer

          tl.fromTo(
            prevSlide,
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              visibility: "visible",
              pointerEvents: "auto",
            },
            {
              opacity: 0,
              scale: 0.95,
              yPercent: -15,
              pointerEvents: "none",
              visibility: "hidden",
              duration: 1,
              ease: "power2.inOut",
            },
            startTime
          ).fromTo(
            slide,
            {
              opacity: 0,
              scale: 1.05,
              yPercent: 20,
              visibility: "hidden",
              pointerEvents: "none",
            },
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              pointerEvents: "auto",
              visibility: "visible",
              duration: 1,
              ease: "power2.inOut",
            },
            startTime
          );
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger after a short delay to ensure correct heights
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert(); // perfectly cleans up all GSAP animations/styles/triggers
      clearTimeout(timer);
    };
  }, []);

  return (
    <SmoothScroll>
      <Scene />
      <Navbar />

      {/* Main container has perspective-3d to enable clean 3D z-axis translation on children */}
      <div
        ref={containerRef}
        className="w-full relative perspective-3d"
      >
        {/* Inner wrapper is normal on mobile, and viewport-sized/hidden on desktop */}
        <div className="relative w-full h-full lg:h-screen lg:overflow-hidden flex flex-col lg:block">
          <div
            ref={(el) => {
              slidesRef.current[0] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-100 lg:visible lg:z-20"
          >
            <Hero />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[1] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <About />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[2] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <Timeline />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[3] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <Software />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[4] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <Portfolio />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[5] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <Stats />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[6] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <Skills />
          </div>

          <div
            ref={(el) => {
              slidesRef.current[7] = el;
            }}
            className="w-full relative lg:absolute lg:inset-0 will-change-[transform,opacity] lg:opacity-0 lg:invisible lg:z-10"
          >
            <Contact />
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
