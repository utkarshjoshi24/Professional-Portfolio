"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import Footer from "@/components/sections/Footer";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section ref={ref} id="contact" className="relative w-full h-full lg:h-screen flex flex-col justify-between py-12 lg:py-8 px-5 md:px-20 bg-surface-low overflow-hidden">
      {/* Background */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex-grow flex items-center justify-center w-full">
        <GlassCard className="p-6 md:p-10 lg:p-12 rounded-[2.5rem] w-full" tilt={false}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="font-sora text-3xl md:text-5xl font-bold text-white mb-3">
              Start a Project
            </h2>
            <p className="text-on-surface-variant font-inter">
              Ready to transform your vision into a cinematic reality?
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                <span className="text-neon-blue text-lg">📧</span>
              </div>
              <span className="font-space text-sm text-on-surface-variant">
                {SITE_CONFIG.email}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center">
                <span className="text-neon-purple text-lg">📱</span>
              </div>
              <span className="font-space text-sm text-on-surface-variant">
                {SITE_CONFIG.phone}
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-space text-xs tracking-[0.15em] text-on-surface-variant uppercase block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className={`w-full bg-background/60 border rounded-xl px-6 py-4 text-white placeholder-outline font-inter focus:outline-none transition-all duration-300 ${
                    errors.name
                      ? "border-red-500"
                      : "border-white/10 focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,217,255,0.15)]"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 font-space">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="font-space text-xs tracking-[0.15em] text-on-surface-variant uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  className={`w-full bg-background/60 border rounded-xl px-6 py-4 text-white placeholder-outline font-inter focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/10 focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,217,255,0.15)]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-space">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="font-space text-xs tracking-[0.15em] text-on-surface-variant uppercase block mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell me about your project vision..."
                rows={5}
                className={`w-full bg-background/60 border rounded-xl px-6 py-4 text-white placeholder-outline font-inter focus:outline-none transition-all duration-300 resize-none ${
                  errors.message
                    ? "border-red-500"
                    : "border-white/10 focus:border-neon-blue focus:shadow-[0_0_20px_rgba(0,217,255,0.15)]"
                }`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1 font-space">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-neon-blue text-background py-5 rounded-xl font-sora font-bold text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_10px_30px_rgba(0,217,255,0.3)] relative overflow-hidden group"
            >
              <span className="relative z-10">
                {submitted ? "✓ Message Sent!" : "Send Transmission"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
            </button>
          </motion.form>

          {/* Success animation */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-[2.5rem] z-20"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(0,217,255,0.3)]"
                >
                  <span className="text-4xl">✓</span>
                </motion.div>
                <h3 className="font-sora text-2xl font-bold text-white mb-2">
                  Transmission Sent!
                </h3>
                <p className="text-on-surface-variant">
                  I&apos;ll get back to you soon.
                </p>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>
      <div className="w-full relative z-10">
        <Footer />
      </div>
    </section>
  );
}
