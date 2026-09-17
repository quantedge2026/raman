import { useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { ArrowRightIcon } from "../../icons/Icons";

export default function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const startX = useRef(null);

  function go(i) {
    setIndex((i + items.length) % items.length);
  }

  function onTouchStart(ev) {
    startX.current = ev.touches[0].clientX;
  }
  function onTouchEnd(ev) {
    if (startX.current === null) return;
    const dx = ev.changedTouches[0].clientX - startX.current;
    if (dx > 40) go(index - 1);
    else if (dx < -40) go(index + 1);
    startX.current = null;
  }

  return (
    <div className="tst-mobile">
      <div className="tst-carousel-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="tst-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t) => (
            <div className="tst-carousel-slide" key={t.name}>
              <TestimonialCard t={t} alwaysIn />
            </div>
          ))}
        </div>
      </div>
      <div className="tst-carousel-nav">
        <button className="tst-arrow" onClick={() => go(index - 1)} aria-label="Previous testimonial" type="button">
          <ArrowRightIcon style={{ transform: "rotate(180deg)" }} width="16" height="16" />
        </button>
        <div className="tst-dots">
          {items.map((t, i) => (
            <button
              key={t.name}
              className={`tst-dot${i === index ? " active" : ""}`}
              onClick={() => go(i)}
              aria-label={`Show testimonial from ${t.name}`}
              type="button"
            />
          ))}
        </div>
        <button className="tst-arrow" onClick={() => go(index + 1)} aria-label="Next testimonial" type="button">
          <ArrowRightIcon width="16" height="16" />
        </button>
      </div>
    </div>
  );
}
