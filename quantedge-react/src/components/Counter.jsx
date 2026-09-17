import { useEffect, useRef, useState } from "react";
import { useInView, prefersReducedMotion } from "../hooks/useInView";

export default function Counter({ target, suffix = "", className }) {
  const [ref, inView] = useInView(0.4);
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || prefersReducedMotion()) return;
    started.current = true;
    const start = performance.now();
    const dur = 1300;
    let raf;
    function step(t) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <b ref={ref} className={className}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </b>
  );
}
