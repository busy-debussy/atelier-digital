import { getSvgPath } from 'figma-squircle';

const SMOOTHING = 0.6;

function px(value) {
  return parseFloat(value) || 0;
}

export function updateSquircle(el) {
  // getBoundingClientRect (not offsetWidth/Height) — flex layout can render
  // sub-pixel box sizes, and rounding to the nearest integer here leaves the
  // clip-path narrower than the actual box, clipping a sliver off the
  // right/bottom border.
  const { width: w, height: h } = el.getBoundingClientRect();
  if (!w || !h) return;

  const cs = getComputedStyle(el);
  const tl = px(cs.borderTopLeftRadius);
  const tr = px(cs.borderTopRightRadius);
  const br = px(cs.borderBottomRightRadius);
  const bl = px(cs.borderBottomLeftRadius);

  if (!tl && !tr && !br && !bl) { el.style.clipPath = ''; return; }

  // Skip pills — any corner at or beyond half the short dimension
  const half = Math.min(w, h) / 2;
  if (tl >= half - 0.5 || tr >= half - 0.5 || br >= half - 0.5 || bl >= half - 0.5) {
    el.style.clipPath = '';
    return;
  }

  const smoothing = parseFloat(el.dataset.squircleSmoothing ?? SMOOTHING);

  try {
    const path = getSvgPath({
      width: w,
      height: h,
      topLeftCornerRadius: tl,
      topRightCornerRadius: tr,
      bottomRightCornerRadius: br,
      bottomLeftCornerRadius: bl,
      cornerSmoothing: smoothing,
      preserveSmoothing: true,
    });
    el.style.clipPath = `path("${path}")`;
  } catch {
    el.style.clipPath = '';
  }
}

export function initSquircle() {
  const ro = new ResizeObserver(entries => {
    for (const e of entries) updateSquircle(e.target);
  });

  const observe = (el) => { updateSquircle(el); ro.observe(el); };

  document.querySelectorAll('[data-squircle]').forEach(observe);

  // Watch for newly mounted elements (portals, conditional renders, etc.)
  const mo = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.hasAttribute('data-squircle')) observe(node);
        node.querySelectorAll?.('[data-squircle]').forEach(observe);
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Re-evaluate on viewport resize — Tailwind breakpoints can change computed border-radius
  const onResize = () => document.querySelectorAll('[data-squircle]').forEach(updateSquircle);
  window.addEventListener('resize', onResize, { passive: true });

  // A squircle element inside an entrance animation (e.g. a modal that scales
  // in) gets measured via getBoundingClientRect while mid-transform — that
  // returns the transiently *scaled* rendered size, not the element's true
  // layout size, so the clip-path ends up permanently undersized once the
  // animation settles (ResizeObserver never fires again, since `transform`
  // doesn't change layout box dimensions at all). Re-checking every squircle
  // once any animation/transition finishes anywhere self-corrects this.
  const onAnimEnd = () => document.querySelectorAll('[data-squircle]').forEach(updateSquircle);
  document.addEventListener('animationend', onAnimEnd);
  document.addEventListener('transitionend', onAnimEnd);

  return () => {
    ro.disconnect();
    mo.disconnect();
    window.removeEventListener('resize', onResize);
    document.removeEventListener('animationend', onAnimEnd);
    document.removeEventListener('transitionend', onAnimEnd);
  };
}
