"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    
    if (window.innerWidth >= 1024) {
      const hrefToIndex: Record<string, number> = {
        "#about": 1,
        "#timeline": 2,
        "#tools": 3,
        "#portfolio": 4,
        "#skills": 6,
        "#contact": 7,
      };
      
      const idx = hrefToIndex[href];
      if (idx !== undefined) {
        window.scrollTo({
          top: idx * window.innerHeight,
          behavior: "smooth"
        });
        return;
      }
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className="fixed top-4 left-0 right-0 mx-auto z-50 w-[95%] max-w-6xl"
      >
        <nav className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-sora text-lg font-extrabold tracking-tighter">
            <span className="text-white">NEON</span>
            <span className="text-neon-blue">_STUDIO</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-on-surface-variant text-sm font-medium hover:text-neon-blue transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => handleClick("#contact")}
            className="hidden md:block bg-neon-blue text-background px-5 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.3)]"
          >
            Connect
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
          </button>
        </nav>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleClick(link.href)}
                  className="text-white text-2xl font-sora font-bold hover:text-neon-blue transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleClick("#contact")}
                className="mt-4 bg-neon-blue text-background px-8 py-3 rounded-full text-lg font-bold"
              >
                Connect
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
