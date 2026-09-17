import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { blogCategories } from "../../data/content";

export default function Blog() {
  return (
    <section id="blog">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">From the Blog</div>
          <h2>Insights, launching soon</h2>
        </div>
        <div className="blog-grid">
          {blogCategories.map((b) => (
            <div className="blog-card raised" key={b.title}>
              <div className="ic pressed">
                <Icon name={b.icon} width="18" height="18" />
              </div>
              <h5>{b.title}</h5>
              <span>Coming soon</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
