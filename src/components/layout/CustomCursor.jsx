import { useEffect, useRef, useState } from 'react';

// Matches the project's interactive vocabulary: links, buttons, inputs, tabs,
// accordions, custom controls (data-cursor="button"), and the resume dialog.
const INTERACTIVE =
  'a[href], button, [role="button"], [role="tab"], summary, select, [data-cursor="button"], [data-cursor="link"]';

const isInteractive = (el) => {
  let node = el;
  while (node && node !== document.documentElement) {
    if (node.matches?.(INTERACTIVE)) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
};

const isTextField = (el) => Boolean(el?.closest?.('input, textarea'));

// A document inside an iframe (e.g. the résumé PDF viewer) keeps its own
// native cursor — rendering ours on top would stack two cursors.
const isInIframe = (el) => Boolean(el?.closest?.('iframe'));

const lerp = (a, b, n) => a + (b - a) * n;

/**
 * Decorative cursor companion for fine-pointer devices only.
 *
 * The native cursor stays visible at all times — a lime reticle sits under
 * it (shrinking over interactive elements) and a ring chases behind it with
 * a lerped lag. Touch / coarse-pointer devices (and reduced-motion users)
 * never see it.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState('default'); // 'default' | 'text'
  const [overInteractive, setOverInteractive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stateRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
  });
  const rafRef = useRef(null);

  useEffect(() => {
    // Fine pointer only (mouse / trackpad with a precise input). Trackpads on
    // Windows/Linux report "fine" — touchscreens report "coarse".
    if (
      typeof window === 'undefined' ||
      !window.matchMedia ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    setReducedMotion(false);
    setEnabled(true);

    const onMove = (e) => {
      stateRef.current.tx = e.clientX;
      stateRef.current.ty = e.clientY;
      setVisible(true);
    };

    const onOver = (e) => {
      if (isInIframe(e.target)) {
        // Native cursor inside the iframe takes over; ours retreats until the
        // pointer crosses back into the document.
        setVisible(false);
        return;
      }
      setMode(isTextField(e.target) ? 'text' : 'default');
      setOverInteractive(isInteractive(e.target));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    const loop = () => {
      const s = stateRef.current;
      // Deliberately slow so the ring visibly chases the native cursor.
      s.x = lerp(s.x, s.tx, reducedMotion ? 1 : 0.22);
      s.y = lerp(s.y, s.ty, reducedMotion ? 1 : 0.22);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) {
    return null;
  }

  const active = overInteractive || pressed;

  return (
    <div
      className={`custom-cursor ${visible ? 'is-visible' : ''} ${pressed ? 'is-pressed' : ''} ${active ? 'is-active' : ''} ${mode === 'text' ? 'is-text' : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="custom-cursor__dot">
        <span className="custom-cursor__cross" />
      </div>
      <div ref={ringRef} className="custom-cursor__ring" />
    </div>
  );
};

export default CustomCursor;
