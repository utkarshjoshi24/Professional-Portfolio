import type { Metadata } from "next";
import { Sora, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEON_STUDIO | Utkarsh Joshi — Video Editor & Motion Storyteller",
  description:
    "Passionate video editor specializing in cinematic storytelling, social media content, transitions, motion graphics, and visual effects. Transforming ideas into cinematic visual experiences.",
  keywords: [
    "video editor",
    "motion graphics",
    "cinematic editing",
    "VFX",
    "color grading",
    "portfolio",
    "Utkarsh Joshi",
  ],
  authors: [{ name: "Utkarsh Joshi" }],
  openGraph: {
    title: "NEON_STUDIO | Utkarsh Joshi",
    description: "Transforming ideas into cinematic visual experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${spaceMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
