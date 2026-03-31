// Spring press effect — asymmetric timing: fast snap on press, bouncy spring on release.
// Apply data-spring to any button/link to opt in.

const PRESS_MS    = 120;
const RELEASE_MS  = 500;
const PRESS_EASE  = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';  // ease-out — snappy
const RELEASE_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';     // spring — bouncy overshoot

export function initSpringPress() {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  let held        = null;
  let pressTimer  = null;
  let startX      = 0;
  let startY      = 0;
  const SCROLL_THRESHOLD = 8;  // px  — cancel if pointer drifts this far
  const PRESS_DELAY      = 80; // ms  — wait before committing the visual press

  const applyPress = (el) => {
    held = el;
    const mobile = window.matchMedia('(max-width: 639px)').matches;
    const scale  = mobile ? 1.1 : 0.92;
    el.style.transition = `transform ${PRESS_MS}ms ${PRESS_EASE}, opacity ${PRESS_MS}ms ${PRESS_EASE}`;
    el.style.transform  = `scale(${scale})`;
    el.style.opacity    = '0.78';
  };

  const cancelTimer = () => {
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
  };

  const release = () => {
    cancelTimer();
    const el = held;
    if (!el) return;
    held = null;
    el.style.transition = `transform ${RELEASE_MS}ms ${RELEASE_EASE}, opacity 250ms ease-out`;
    el.style.transform  = '';
    el.style.opacity    = '';
  };

  const onDown = (e) => {
    const el = e.target.closest('[data-spring], [data-spring-desktop]');
    if (!el || el.disabled || el.hasAttribute('disabled')) return;
    const mobile = window.matchMedia('(max-width: 639px)').matches;
    if (mobile && el.hasAttribute('data-spring-desktop') && !el.hasAttribute('data-spring')) return;
    startX = e.clientX;
    startY = e.clientY;
    // On mobile, delay the visual press so a scroll's pointercancel can arrive first
    if (mobile) {
      pressTimer = setTimeout(() => { pressTimer = null; applyPress(el); }, PRESS_DELAY);
    } else {
      applyPress(el);
    }
  };

  const onMove = (e) => {
    if (!pressTimer && !held) return;
    if (Math.abs(e.clientX - startX) > SCROLL_THRESHOLD ||
        Math.abs(e.clientY - startY) > SCROLL_THRESHOLD) {
      cancelTimer();
      if (held) release();
    }
  };

  document.addEventListener('pointerdown',   onDown);
  document.addEventListener('pointermove',   onMove, { passive: true });
  document.addEventListener('pointerup',     release);
  document.addEventListener('pointercancel', release);

  return () => {
    document.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup',   release);
    document.removeEventListener('pointercancel', release);
  };
}
