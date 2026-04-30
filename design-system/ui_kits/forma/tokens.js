"use strict";
// ── Forma UI Kit — Shared tokens & utilities ──────────────────────────

// Re-exports the design system's CSS token values as JS constants
// so JSX components can reference them without string magic.

const COLORS = {
  accent:       '#C8915A',
  terra:        '#9C6B3C',
  text:         '#EDE8DC',
  muted:        'rgba(237,232,220,0.55)',
  bg:           'rgba(20,16,12,0.55)',
  surface:      'rgba(30,26,20,0.65)',
  surface2:     'rgba(30,26,20,0.80)',
  border:       'rgba(237,232,220,0.09)',
  cardBg:       'rgba(30,26,20,0.65)',
  cardBorder:   'rgba(237,232,220,0.09)',
  inputBg:      'rgba(237,232,220,0.06)',
  navBg:        'rgba(28,24,20,0.93)',
  success:      '#7AAF4A',
  obsidian2:    '#252119',
};

const FONTS = {
  heading:      "'Montserrat', sans-serif",
  body:         "'Plus Jakarta Sans', sans-serif",
  display:      "'Fraunces', serif",
  editorial:    "'Cormorant Garamond', serif",
};

const EASE = {
  glide:  'cubic-bezier(0.22,1,0.36,1)',
  snap:   'cubic-bezier(0.32,1.10,0.64,1)',
  bounce: 'cubic-bezier(0.34,1.56,0.64,1)',
};

// Expose to global scope so all component files can use them
Object.assign(window, { COLORS, FONTS, EASE });
