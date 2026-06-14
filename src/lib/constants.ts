// Content data for the portfolio
export const SITE_CONFIG = {
  name: "Utkarsh Joshi",
  title: "NEON_STUDIO",
  profession: "Video Editor",
  headline: "Video Editor &",
  headlineAccent: "Motion Storyteller",
  subheadline: "Transforming ideas into cinematic visual experiences.",
  description:
    "Passionate video editor specializing in cinematic storytelling, social media content, transitions, motion graphics, and visual effects.",
  email: "hello@neonstudio.com",
  phone: "+91 XXXX XXXX XX",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#timeline" },
  { label: "Tools", href: "#tools" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const TIMELINE_ENTRIES = [
  {
    id: 1,
    period: "2023 - Present",
    title: "PC Editing Mastery",
    duration: "1 Year PC Editing",
    description:
      "Transitioned to DaVinci Resolve for complex commercial projects and high-fidelity motion graphics. Advanced color grading and professional-grade VFX.",
    color: "blue" as const,
    icon: "🖥️",
  },
  {
    id: 2,
    period: "2020 - 2023",
    title: "Mobile Editing Pioneer",
    duration: "3 Years Mobile Editing",
    description:
      "Built a portfolio of 150+ high-engagement viral reels using CapCut, focusing on pacing, trend-driven content, and dynamic transitions.",
    color: "purple" as const,
    icon: "📱",
  },
] as const;

export const SOFTWARE = [
  {
    id: 1,
    name: "CapCut",
    proficiency: 98,
    description:
      "Specialized in rapid turnaround short-form content, viral hook design, and trend-aligned motion graphics.",
    color: "purple" as const,
    icon: "🎬",
  },
  {
    id: 2,
    name: "DaVinci Resolve",
    proficiency: 95,
    description:
      "Expertise in nodes-based color grading, Fairlight sound design, and Fusion visual effects for cinematic productions.",
    color: "blue" as const,
    icon: "🎨",
  },
] as const;

export const PORTFOLIO_CATEGORIES = [
  "All Projects",
  "Reels",
  "Short Form Content",
  "Cinematic Edits",
  "Social Media Ads",
] as const;

export const PROJECTS = [
  {
    id: 1,
    title: "Harry Potter",
    category: "Cinematic Edits",
    tags: ["Cinematic", "VFX"],
    video: "/videos/Harry Potter.mov",
    featured: true,
  },
  {
    id: 2,
    title: "Thomas Shelby",
    category: "Reels",
    tags: ["Cinematic", "Color Grading"],
    video: "/videos/Thomas Shelby.mov",
    featured: false,
  },
  {
    id: 3,
    title: "Netflix Ad",
    category: "Social Media Ads",
    tags: ["Commercial", "Ad"],
    video: "/videos/Netflix Ad.mov",
    featured: true,
  },
  {
    id: 4,
    title: "Parallax Effect",
    category: "Reels",
    tags: ["Motion", "VFX"],
    video: "/videos/Parallax Effect.mov",
    featured: false,
  },
  {
    id: 5,
    title: "SaaS Short",
    category: "Short Form Content",
    tags: ["Short", "SaaS"],
    video: "/videos/Saas-2.mov",
    featured: false,
  },
] as const;

export const STATS = [
  { label: "Years Experience", value: 4, suffix: "+", color: "blue" as const },
  { label: "Projects Completed", value: 50, suffix: "+", color: "purple" as const },
  { label: "Client Satisfaction", value: 100, suffix: "%", color: "blue" as const },
  { label: "Videos Delivered", value: 200, suffix: "+", color: "purple" as const },
] as const;

export const SKILLS = [
  "Video Editing",
  "Color Grading",
  "Motion Graphics",
  "Storytelling",
  "Sound Design",
  "Content Optimization",
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
] as const;
