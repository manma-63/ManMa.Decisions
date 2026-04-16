# Design Brief

## Direction

Bold Modern Voting Platform — A dark, energetic interface where teams make collaborative decisions through intuitive voting, with clear hierarchy between question display, voting action, and results tracking.

## Tone

High-energy with refined restraint — confident use of color and motion for voting actions without sacrificing information clarity. Every interaction feels intentional and decisive.

## Differentiation

Energetic amber accent for voting CTAs combined with clean blue-primary and intentional surface hierarchy creates a voting interface that feels modern, not generic — the accent color drives the eye toward the decision point.

## Color Palette

| Token       | OKLCH         | Role                                      |
| ----------- | ------------- | ----------------------------------------- |
| background  | 0.12 0.02 280 | Deep charcoal base                        |
| foreground  | 0.95 0.01 280 | Bright text on dark                       |
| card        | 0.16 0.025 280| Elevated surfaces, question/result cards  |
| primary     | 0.58 0.22 240 | Action links, voting status, emphasis     |
| accent      | 0.72 0.18 55  | Vote button, decision-critical CTAs       |
| muted       | 0.22 0.03 280 | Inactive states, secondary text           |
| destructive | 0.55 0.22 25  | Reject/cancel voting actions              |

## Typography

- Display: Space Grotesk — strong, modern headings and room labels
- Body: Bricolage Grotesque — approachable UI labels and question text
- Mono: JetBrains Mono — room codes, participant counts
- Scale: hero 5xl/7xl bold, h2 3xl/5xl bold, labels sm bold uppercase, body base

## Elevation & Depth

Cards elevated via subtle shadow on question display and voting zone; active vote states have elevated shadow. No blur or decorative effects — depth via layering and color only.

## Structural Zones

| Zone    | Background     | Border         | Notes                                           |
| ------- | -------------- | -------------- | ----------------------------------------------- |
| Header  | card (0.16)    | border-bottom  | Room code + participant avatars, clear boundary |
| Content | background     | —              | Question card displayed centered               |
| Voting  | card (0.16)    | —              | Vote options + amber CTA button, subtle shadow |
| Footer  | muted (0.22)   | border-top     | Results zone with vote counts                   |

## Spacing & Rhythm

Spacious density (1.5rem gaps between zones) emphasizes decision clarity; micro-spacing (0.5rem) tightens voting option groups; consistent padding (1rem) across cards creates visual rhythm and breathing room.

## Component Patterns

- Buttons: voting CTA in accent amber with bold label, hover state darkens via opacity; secondary outline buttons for non-voting actions
- Cards: 0.625rem radius (lg), card background, subtle shadow on hover
- Badges: participant avatars use primary color, muted badge for inactive voters

## Motion

- Entrance: questions fade in 0.3s ease-out; voting options stagger by 50ms
- Hover: voting button scales +2% with 0.2s smooth; card shadows elevate on hover
- Voting: successful vote triggers pulse animation on result count (0.4s)

## Constraints

- Always use semantic color tokens; never hardcode hex colors
- Voting accent (amber) reserved for CTAs only — never use on non-actionable elements
- Max 3 font sizes per page for hierarchy clarity
- Motion only on interactive elements; no ambient animations

## Signature Detail

Energetic amber accent (#72 0.18 55) applied exclusively to voting actions creates an instant visual focal point that guides users toward collaborative decision-making without overwhelming the interface.
