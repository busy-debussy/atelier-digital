// Spring press effect — asymmetric timing: fast snap on press, bouncy spring on release.
// Apply data-spring to any button/link to opt in.

const PRESS_MS    = 120;
const RELEASE_MS  = 500;
const PRESS_EASE  = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';  // ease-out — snappy
const RELEASE_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';     // spring — bouncy overshoot

export function initSpringPress() {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  let held = null;

  const press = (el) => {
    held = el;
    const mobile = window.matchMedia('(max-width: 639px)').matches;
    const scale  = mobile ? 1.1 : 0.92;
    el.style.transition = `transform ${PRESS_MS}ms ${PRESS_EASE}, opacity ${PRESS_MS}ms ${PRESS_EASE}`;
    el.style.transform  = `scale(${scale})`;
    el.style.opacity    = '0.78';
  };

  const release = () => {
    const el = held;
    if (!el) return;
    held = null;
    el.style.transition = `transform ${RELEASE_MS}ms ${RELEASE_EASE}, opacity 250ms ease-out`;
    el.style.transform  = '';
    el.style.opacity    = '';
  };

  const onDown = (e) => {
    const el = e.target.closest('[data-spring]');
    if (!el || el.disabled || el.hasAttribute('disabled')) return;
    press(el);
  };

  document.addEventListener('pointerdown', onDown);
  document.addEventListener('pointerup',   release);
  document.addEventListener('pointercancel', release);

  return () => {
    document.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointerup',   release);
    document.removeEventListener('pointercancel', release);
  };
}
