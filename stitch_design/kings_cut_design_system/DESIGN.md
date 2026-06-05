---
name: Kings Cut Design System
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#d0cecd'
  on-tertiary: '#313030'
  tertiary-container: '#b5b2b2'
  on-tertiary-container: '#454545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter-desktop: 24px
  margin-desktop: 40px
  gutter-mobile: 16px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style

The design system is engineered for a premium grooming experience, targeting a discerning clientele that values precision and luxury. The aesthetic is **Sophisticated Modernism**—a blend of high-end editorial layouts and contemporary digital precision. It evokes a sense of "membership" and "prestige" through a dark-dominant interface.

The UI utilizes a dark mode primary theme to simulate the atmosphere of a luxury lounge. It balances high-density information with generous whitespace (or "darkspace") to ensure the experience never feels cluttered. The emotional response should be one of confidence, reliability, and elite craftsmanship.

## Colors

This design system uses a restricted, high-contrast palette to maintain a premium feel. 

- **Primary (Accent):** Metallic Gold (#D4AF37) is reserved for primary actions, success states, and branding highlights. It should be used sparingly to maintain its impact.
- **Surface & Backgrounds:** The base layer is Deep Charcoal (#121212). Elevated surfaces (cards, modals) use Charcoal (#1A1A1A) to create a subtle tonal hierarchy.
- **Typography:** Primary text uses Off-white (#F5F5F5) for maximum legibility against dark backgrounds. Secondary text uses Muted Grey (#A0A0A0) to reduce visual noise in metadata and labels.

## Typography

The typography strategy pairs a high-contrast serif for headings with a technical, clean sans-serif for functional UI.

- **Headlines:** Playfair Display provides a "heritage" luxury feel, reminiscent of high-end fashion and lifestyle editorials. Use it for page titles and large section headers.
- **Body & UI:** Hanken Grotesk is used for all functional text. It is a sharp, contemporary typeface that ensures readability in dense administrative dashboards and booking flows.
- **Labels:** Small labels and overlines should use Hanken Grotesk with increased letter spacing and uppercase styling to denote hierarchy and "metadata" status.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop and a **Fluid Grid** for mobile devices.

- **Desktop:** A 12-column grid with a maximum container width of 1280px. Large 40px margins create a "framed" look that feels premium.
- **Mobile:** A 4-column fluid grid.
- **Rhythm:** All spacing is based on an 8px base unit. Component internal padding should prioritize vertical breathing room to reflect the spaciousness of a luxury physical environment.
- **Admin Layouts:** Use a fixed 280px sidebar for navigation, with a fluid main content area that utilizes "cards" to group related data.

## Elevation & Depth

In a dark UI, depth is achieved through **Tonal Layering** and **Soft Luminescence** rather than traditional black shadows.

- **Surface Tiers:** The background is #121212. Cards and floating elements use #1A1A1A. Hover states on interactive elements should shift the background slightly lighter (#252525).
- **Outlines:** Use low-contrast, 1px borders (#333333) for cards and inputs to define boundaries without adding visual weight.
- **Shadows:** For modals or high-priority elements, use an extra-diffused shadow: `0px 20px 40px rgba(0, 0, 0, 0.8)`. 
- **Active Accents:** Use the gold accent color as a 2px "indicator" line for active navigation states or selected states in a list.

## Shapes

The shape language is refined and consistent. A "Rounded" (Level 2) approach is used to soften the high-contrast masculine aesthetic, making the UI feel approachable yet modern.

- **Standard Elements:** Buttons and Input fields use a 0.5rem (8px) radius.
- **Cards & Containers:** Service selection cards and dashboard containers use a 1rem (16px) radius to create a distinct structural presence.
- **Interactive States:** Avoid fully circular "pill" shapes for buttons to maintain a more structured, architectural feel; stay with the standard 8px radius.

## Components

### Buttons
- **Primary:** Gold background (#D4AF37) with Deep Black text (#000000). Bold, uppercase labels.
- **Secondary:** Transparent background with a 1px Gold border.
- **Ghost:** No background or border; gold text for actions inside cards.

### Service Selection Cards
- Use #1A1A1A background with 16px rounded corners.
- Include a 1px subtle border (#333333).
- On hover, the border color shifts to Gold (#D4AF37).

### Date/Time Picker
- Integrated calendar view using the same dark tonal palette. 
- Selected dates use a Gold circular background.
- Unavailable slots are shown in Muted Grey with a strike-through or reduced opacity.

### Admin Dashboard Tables
- Use a "headless" table style with minimal horizontal dividers.
- Row hover states should use a subtle background shift to #252525.
- Status badges (e.g., "Confirmed", "Completed") use the Gold color for the text and border, with a very low-opacity Gold fill.

### Sidebar Navigation
- A persistent 280px dark sidebar (#0A0A0A).
- Active links are indicated by a vertical Gold line on the left edge and Off-white text.
- Icons should be minimal, 24px stroke-based icons in Gold or Muted Grey.