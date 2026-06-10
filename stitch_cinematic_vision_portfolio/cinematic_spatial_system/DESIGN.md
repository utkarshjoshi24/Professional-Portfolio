---
name: Cinematic Spatial System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbc9ce'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#859398'
  outline-variant: '#3c494d'
  surface-tint: '#00d9ff'
  primary: '#afecff'
  on-primary: '#003641'
  primary-container: '#00d9ff'
  on-primary-container: '#005b6c'
  inverse-primary: '#00687b'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#ffdeaa'
  on-tertiary: '#422d00'
  tertiary-container: '#ffbb2a'
  on-tertiary-container: '#6e4d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#aeecff'
  primary-fixed-dim: '#00d9ff'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5d'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdea9'
  tertiary-fixed-dim: '#febb29'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4100'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  mono-data:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style
This design system is engineered for a high-performance 3D video editor portfolio, blending the refined spatial ergonomics of visionOS with a sharp, cyberpunk-inspired edge. The brand personality is cutting-edge, authoritative, and immersive—positioning the creator as a master of future-forward digital environments.

The visual style is **Glassmorphism** pushed to a cinematic extreme. It utilizes deep translucency, multi-layered background blurs, and high-fidelity lighting effects to create a sense of depth and physical presence. The interface should feel like a "HUD" (Heads-Up Display) overlaying a high-performance render engine, evoking an emotional response of awe, precision, and technological sophistication.

## Colors
The palette is rooted in a "Pure Black" abyss to maximize the contrast of light-emitting elements. 
- **Primary (Electric Blue):** Used for critical action states, focus indicators, and primary data visualizations. It represents energy and connectivity.
- **Secondary (Purple Neon):** Reserved for creative accents, secondary CTAs, and decorative gradients that imply depth and complexity.
- **Neutral/Surface:** The background is an absolute black (#050505) to allow glass panels to "float" without muddying the shadows. Surfaces are a deep gray with varying levels of transparency.
- **Glass Tint:** All glass panels should have a 1px inner border (stroke) using a low-opacity white or blue to simulate the edge of a lens.

## Typography
The typography system uses a tri-font approach to balance editorial impact with technical precision:
- **Sora (Headings):** A wide, geometric sans-serif that feels futuristic and premium. Large headings should use tight letter-spacing to feel "locked in."
- **Inter (Body):** Selected for its maximum legibility on dark, translucent backgrounds. It provides a clean, neutral anchor for long-form descriptions.
- **Space Mono (Labels/Technical):** Used for metadata, timestamps, and secondary navigation to reinforce the "coder/editor" aesthetic.

Use **Display LG** sparingly for hero sections, ensuring it utilizes a subtle gradient from Electric Blue to Purple Neon for a "chromatic aberration" effect.

## Layout & Spacing
The layout follows a **Fluid Spatial Grid**. Elements are not just positioned on a 2D plane but are treated as layers in a 3D Z-index stack.
- **Grid:** A 12-column layout on desktop with wide 80px margins to allow "floating" elements to breathe.
- **Z-Axis Spacing:** Use scale and blur to indicate distance. Background elements should have a stronger blur (40px+) and lower opacity.
- **Rhythm:** An 8px base unit drives all padding and margins. Vertical rhythm is generous to evoke a luxury, "cinematic" feel.
- **Mobile:** On mobile, the margins shrink to 20px, and complex glass layers should be flattened to ensure performance, keeping only the primary background blur.

## Elevation & Depth
Depth is the core of this design system. We ignore traditional drop shadows in favor of:
1. **Backdrop Blurs:** Surfaces use `backdrop-filter: blur(20px)` with a 15% opacity white fill.
2. **Specular Highlights:** A 1px top-left border gradient (White to Transparent) simulates a light source hitting the "edge" of the glass.
3. **Glow Shadows:** Instead of black shadows, use colored outer glows (Primary/Secondary) with very high diffusion and low opacity (5-10%) to make cards look like they are emitting light.
4. **Parallax:** Interactive components should subtly shift on hover/tilt to reinforce the 3D volume.

## Shapes
Shapes are highly intentional and follow a "Soft-Tech" aesthetic:
- **Main Containers:** Use a 16px (1rem) radius to feel approachable yet modern.
- **Buttons/Controls:** Use 8px (0.5rem) or full pill shapes depending on the hierarchy. 
- **Connectors:** Lines, sliders, and progress bars should have rounded caps to maintain the sleek, polished feel of an premium OS.

## Components
- **Buttons:** Primary buttons use a solid Electric Blue fill with a subtle "inner glow." Secondary buttons are "Ghost Glass" with a 1px border. All buttons should have a high-frequency hover state (e.g., a slight scale-up and increased glow).
- **Glass Cards:** The primary vessel for video thumbnails and project info. They must feature a "Frost" texture and a distinct specular edge highlight.
- **Timeline Slider:** A custom component for a video editor portfolio. Uses a Purple Neon track with an Electric Blue "playhead" that emits a vertical light beam.
- **Status Chips:** Small, monospaced labels with a background tint corresponding to the category (e.g., "4K", "VFX", "3D Render").
- **Inputs:** Darker than the surface (#000), with a focused state that "ignites" the border in Electric Blue.
- **Navigation:** A floating "Dock" at the bottom of the screen, inspired by spatial computing interfaces, using high-translucency glass and centered icons.