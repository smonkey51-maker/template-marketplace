/* FORMA Animation System */

/* Keyframes */
@keyframes forma-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes forma-fade-up {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

/* Animation Classes */
.forma-section[data-entered] .anim-bg {
  animation: forma-fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.forma-section[data-entered] .anim-in {
  animation: forma-fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0s);
}

.forma-section[data-entered] .anim-up {
  animation: forma-fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0s);
}

/* Initial states */
.forma-section:not([data-entered]) .anim-bg,
.forma-section:not([data-entered]) .anim-in,
.forma-section:not([data-entered]) .anim-up {
  opacity: 0;
}

.forma-section:not([data-entered]) .anim-up {
  transform: translateY(22px);
}

/* Easing variables */
:root {
  --ease-glide: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snap: cubic-bezier(0.32, 1.10, 0.64, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-brisk: cubic-bezier(0.45, 0, 0.15, 1);
  --ease-fluid: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-linger: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Disable animations for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  html {
    scroll-behavior: auto;
  }
}

/* Custom cursor styles */
.custom-cursor-container {
  transition: opacity 0.3s ease;
}

body {
  cursor: none;
}

@media (hover: none) and (pointer: coarse) {
  body {
    cursor: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  body {
    cursor: auto;
  }
}
