import Reveal from "../../components/Reveal";
import TiltCard from "../../components/TiltCard";
import { Icon, ArrowRightIcon } from "../../icons/Icons";
import { verticals } from "../../data/content";

function previewChips(v) {
  const list = v.companies || v.preview || [];
  const total =
    v.groups?.reduce((n, g) => n + g.items.length, 0) ?? list.length;
  const shown = list.slice(0, v.featured ? 2 : 3);
  const remaining = total - shown.length;
  return { shown, remaining };
}

export default function CategoryGrid({ onSelect }) {
  return (
    <section id="grid">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Explore the Verticals
          </div>
          <h2>Click any track to see its full breakdown</h2>
        </div>
        <div className="cat-grid">
          {verticals.map((v) => {
            const { shown, remaining } = previewChips(v);
            return (
              <TiltCard
                key={v.id}
                className={`cat-card raised${v.featured ? " feat" : ""}`}
                onClick={() => onSelect(v.id)}
              >
                <div className="ic pressed">
                  <Icon name={v.icon} width="24" height="24" />
                </div>
                <div className="cat-card-body">
                  <h4>{v.title}</h4>
                  <p className="desc">{v.short}</p>
                  <div className="chips">
                    {shown.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                    {remaining > 0 && <span className="more">+{remaining} more</span>}
                  </div>
                  <div className="learn">
                    Learn more
                    <ArrowRightIcon />
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
