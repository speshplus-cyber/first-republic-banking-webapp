---
name: Heritage Private Banking
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#414845'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#717975'
  outline-variant: '#c0c8c3'
  surface-tint: '#3c6658'
  primary: '#00241b'
  on-primary: '#ffffff'
  primary-container: '#0e3b2f'
  on-primary-container: '#7aa696'
  inverse-primary: '#a3d0bf'
  secondary: '#785a0e'
  on-secondary: '#ffffff'
  secondary-container: '#ffd47f'
  on-secondary-container: '#795a0f'
  tertiary: '#02241b'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a3a2f'
  on-tertiary-container: '#82a496'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bfecdb'
  primary-fixed-dim: '#a3d0bf'
  on-primary-fixed: '#002118'
  on-primary-fixed-variant: '#244e41'
  secondary-fixed: '#ffdea1'
  secondary-fixed-dim: '#eac16d'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#c7eadb'
  tertiary-fixed-dim: '#abcebf'
  on-tertiary-fixed: '#002117'
  on-tertiary-fixed-variant: '#2d4d41'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the discretion, permanence, and meticulous hospitality of heritage private banking. Tailored for high-net-worth clients, family offices, and discerning professionals, the visual aesthetic prioritizes calm assurance, unshakeable security, and frictionless execution. 

The aesthetic is built upon **Modern Heritage Minimalism**: a disciplined synthesis of classical editorial authority and ultra-refined contemporary financial utility. Generous breathing space, authoritative serif typography, fine architectural hair-lines, and tactile restraint replace flashy fintech trends. The interface evokes the quiet gravitas of a private boardroom lined in mahogany and brass, rendered in an uncompromising, highly accessible mobile-first format.

## Colors

The palette establishes an immediate sense of institutional depth and prestige:

- **Primary (`#0E3B2F`) & Tertiary Deep Forest (`#092B21`)**: Evocative of classical reserve banking, collegiate leather, and stable permanence. The primary tone commands key navigation bars, hero balance surfaces, and dominant primary actions.
- **Secondary Warm Brass Gold (`#C8A252`)**: Utilized deliberately for high-value accents, active status indicators, security shields, and subtle divider pinstripes. It must never overwhelm the layout, functioning instead as a mark of craftsmanship and attention.
- **Canvas & Surface System**: Layered from a luminous eggshell background (`#F9FAF8`) up to crisp pure white card surfaces (`#FFFFFF`), with an alternate subdued slate ivory (`#F3F4F1`) for secondary wells and inset fields.
- **Neutrals & Typography Contrast**: Slate dark neutrals (`#111827` primary body, `#374151` secondary labels, `#6B7280` metadata) provide absolute readability without the harshness of pure black. Subtle boundary definition is maintained with delicate stone borders (`#E5E7EB`).

## Typography

The typography pairing contrasts aristocratic editorial authority with precision data legibility:

- **Display & Headlines (`Playfair Display`)**: Used for aggregate financial balances, account titles, greeting banners, and executive milestones. Figures rendered in serif display convey substantial, institutional presence.
- **Interface, Numbers & Tabular Body (`Inter`)**: Deployed across transactional ledgers, routing numbers, card metrics, and interactive controls. Features strict geometric tracking and open counters, ensuring numerical legibility even at rapid glances on mobile screens.
- **Labels & Micro-copy**: Rendered in uppercase or small-caps tracking (`letter-spacing: 0.04em` to `0.06em`) with semi-bold weights for category headers, status stamps, and transaction categories.

## Layout & Spacing

This design system uses a fluid layout framework strictly proportioned on an 8pt modular rhythm (with 4pt half-steps for compact mobile elements):

- **Grid Architecture**: Mobile layouts adhere to a 4-column fluid grid with `1rem` margins and `1rem` gutters. Tablet and desktop views expand to 8 and 12 columns with standard `1.5rem` gutters and structured maximum reading widths (bounded at 1120px to maintain executive focus).
- **Rhythmic Density**: Generous vertical margins separate discrete financial domains (e.g., separating portfolio cards from recent clearance activity), preventing the cluttered feel common in consumer neo-banks. Internal card padding maintains a minimum of `1.25rem` to `1.5rem` to preserve a feeling of ease and clarity.

## Elevation & Depth

Visual hierarchy rejects exaggerated, artificial drop shadows in favor of **architectural stacking and tactile tonal surfaces**:

- **Card Surfaces & Outlines**: Content cards rest flat on the eggshell canvas (`#F9FAF8`), framed by crisp, 1px structural hair-lines (`#E5E7EB`).
- **Elevated Modals & Floating Action Bars**: High-priority sheets and biometric authentication drawers utilize an ultra-subtle ambient shadow tinted with forest slate: `0 8px 30px rgba(9, 43, 33, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)`.
- **Forest Hero Containers**: Account summaries and debit card managers use deep forest gradients (`#0E3B2F` to `#092B21`) with muted internal borders (`rgba(200, 162, 82, 0.2)`) and faint brass rim lighting, giving them the tactile finish of an engraved private vault plaque.

## Shapes

The design system adopts a **Soft, Tailored Corner Radius (`roundedness: 1`)**. 

- Default controls, badges, transaction line-item wells, and input boxes maintain a crisp 4px (`0.25rem`) to 8px (`0.5rem`) radius.
- Primary balance cards and modal bottom sheets max out at 12px (`0.75rem`).
- Circular geometry is reserved strictly for user avatars, status pips, and biometric touchpoints.
- This restrained curvature avoids playful, bubble-like shapes, keeping the tone architectural, solid, and timelessly conservative.

## Components

### Account Summary Balance Cards
- **Structure**: Rich forest green surface (`#0E3B2F`) accented with an ultra-thin 1px brass pinstripe border (`rgba(200, 162, 82, 0.3)`).
- **Content**: Subtle brass sub-label (`"TOTAL MANAGED ASSETS"`), followed by an authoritative balance displayed in Playfair Display (`#FFFFFF`), with an inline masked account toggle (`•••• 8821`) and an instant privacy blur control.

### Buttons & Interactive Controls
- **Primary Action**: Solid forest green fill (`#0E3B2F`) with pure white text, 8px radius, and subtle warm brass focus rings. Hover/Active transforms down to `#092B21`.
- **Secondary Action**: Crisp white surface with a slate border (`#E5E7EB`) and dark charcoal typography (`#111827`).
- **Gold Accent Action / Privilege Tier**: Antique brass surface (`#C8A252`) with deep forest lettering (`#092B21`) for high-priority wire authorizations, private banker callbacks, and wealth transfers.

### Secure Quick-Action Grid
- Horizontal scroll or four-column matrix composed of compact white tiles (`#FFFFFF`) framed with 1px stone outlines.
- Features restrained, line-drawn heritage icons (Wire, Deposit, Transfer, Banker) in `#0E3B2F` accompanied by clean, 12px Inter labels.

### Verified Transaction List Items
- Clean tabular rows delineated by hairline dividers (`#F3F4F6`).
- Left-aligned brand monogram or security clearance indicator. 
- High-contrast amounts aligned right in Inter Tabular figures (`- $12,450.00` in `#111827`; deposits in `#0E3B2F`).
- Verification badge: Muted emerald pip paired with a subtle `"Cleared"` micro-label.

### Segmented Tabs
- Pill-free, structural architectural tabs. Active tab features an underline in warm brass (`#C8A252`) with semi-bold `#0E3B2F` text; inactive tabs use `#6B7280` text without lines.

### Security Status & Trust Badges
- Encapsulated pills featuring a 25% tint background (`rgba(14, 59, 47, 0.08)`) with a deep forest shield icon and `#0E3B2F` uppercase micro-text: `"256-BIT ENCRYPTED • FDIC INSURED"`.