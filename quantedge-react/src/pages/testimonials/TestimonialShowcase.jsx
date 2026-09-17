import Reveal from "../../components/Reveal";
import TestimonialCard from "./TestimonialCard";
import TestimonialCarousel from "./TestimonialCarousel";
import { testimonials } from "../../data/content";

export default function TestimonialShowcase() {
  return (
    <section id="stories">
      <div className="wrap">
        <Reveal className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            In Their Words
          </div>
          <h2>What happens after the training ends.</h2>
        </Reveal>

        <div className="tst-desktop">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>

        <TestimonialCarousel items={testimonials} />
      </div>
    </section>
  );
}
