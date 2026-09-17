import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useInView";

// Real 3D tilt-toward-cursor. Writes transform directly to the DOM node
// (not React state) so mousemove never triggers a re-render.
export function useTilt(maxX = 8, maxY = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    function onMove(ev) {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -maxX;
      const ry = (px - 0.5) * maxY;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
    function onLeave() {
      el.style.transform = "";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxX, maxY]);

  return ref;
}
