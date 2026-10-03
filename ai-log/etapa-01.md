# Stage 1: AI log

## Tools
- Gemini

## Conversations
- [Layout Responsive pe Două Coloane](https://share.gemini.google/RUvj3xxdSHIZ) (Discussion covering responsive CSS Grid layout under 700px, dark mode architecture with CSS variables, and keyboard accessibility via focus-visible).

## Key requests

### 1. Two-column responsive layout
Asked: How to split the page into two columns (form on the left, card list on the right) and collapse to a single column under 700px.
- Got: Suggested a CSS Grid setup with `grid-template-columns` and a `@media (max-width: 700px)` query switching to `1fr`.
- Changed or rejected: Kept the CSS Grid recommendation, aligning the proportions with the project specification (`1fr 2fr`).

### 2. Dark gaming theme without duplicated rules
Asked: How to set up an emerald/cyan/indigo gaming palette in `:root` and `@media (prefers-color-scheme: dark)` without duplicating CSS classes.
- Got: Separated background and text semantic variables in `:root` and overrode only the token values in the dark media query.
- Changed or rejected: Applied the proposed color tokens directly to our panel and card variables while keeping the HTML structure minimal.

### 3. Keyboard focus outline
Asked: How to display an outline during Tab key navigation without showing it on mouse clicks.
- Got: Recommended `:focus-visible` with `outline-offset` instead of `:focus`.
- Changed or rejected: Used the suggested outline style globally for form inputs and buttons to ensure accessibility compliance.

## What I learned / what did not work
- Using `:focus-visible` is cleaner than standard `:focus` because it provides accessible visual cues for keyboard navigation without affecting mouse clicks.
- Overriding only CSS custom property values inside `@media (prefers-color-scheme: dark)` avoids writing duplicate selector rules and keeps the stylesheet maintainable.