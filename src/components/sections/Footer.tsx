"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative py-12 px-5 md:px-20 bg-background border-t border-white/5">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sora text-lg font-extrabold tracking-tighter"
          >
            <span className="text-white">NEON</span>
            <span className="text-neon-blue">_STUDIO</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-xs text-outline tracking-wider"
          >
            © 2024 NEON_STUDIO. BUILT FOR THE FUTURE.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-6"
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-space text-xs text-outline hover:text-neon-blue transition-colors duration-300 tracking-wider relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Decorative bottom lines */}
        <div className="flex justify-center gap-2 mt-12">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              whileInView={{ width: 30 + i * 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
              className="h-[1px] bg-gradient-to-r from-neon-blue/50 to-neon-purple/50"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
