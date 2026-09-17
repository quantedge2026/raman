import Reveal from "../../components/Reveal";
import { Icon, CheckIcon, ChevronDownIcon } from "../../icons/Icons";
import { verticals } from "../../data/content";
import { openWhatsApp, buildTrainingInterestMessage } from "../../utils/whatsapp";

export default function DetailAccordion({ openId, onToggle, onCta, itemRefs }) {
  return (
    <section id="details">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Full Curriculum</div>
          <h2>Every topic, in detail</h2>
          <p>Expand any track for the complete breakdown QuantEdge trains against.</p>
        </div>
        <div className="acc">
          {verticals.map((v) => {
            const isOpen = openId === v.id;
            return (
              <div
                className={`acc-item raised${isOpen ? " open" : ""}`}
                id={v.id}
                key={v.id}
                ref={(el) => {
                  if (itemRefs) itemRefs.current[v.id] = el;
                }}
              >
                <h3 style={{ margin: 0 }}>
                  <button
                    className="acc-head"
                    type="button"
                    onClick={() => onToggle(v.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${v.id}-panel`}
                  >
                    <div className="ic pressed">
                      <Icon name={v.icon} width="21" height="21" />
                    </div>
                    <div className="t">
                      <span className="acc-title">{v.title}</span>
                      <span className="acc-short">{v.short}</span>
                    </div>
                    <div className="chev">
                      <ChevronDownIcon />
                    </div>
                  </button>
                </h3>
                <div
                  className="acc-body"
                  id={`${v.id}-panel`}
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="acc-body-in">
                    <div className="acc-content">
                      {v.groups && (
                        <div className="acc-groups">
                          {v.groups.map((g) => (
                            <div className="acc-group" key={g.label}>
                              <h4>{g.label}</h4>
                              <ul>
                                {g.items.map((item) => (
                                  <li key={item}>
                                    <CheckIcon />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {v.companies && (
                        <>
                          <p
                            style={{
                              fontSize: ".9rem",
                              color: "var(--text-muted)",
                              lineHeight: 1.65,
                            }}
                          >
                            Training is customized to the testing patterns, difficulty
                            level and question types historically used by these
                            recruiters' campus hiring processes:
                          </p>
                          <div className="co-chip-row">
                            {v.companies.map((c) => (
                              <span
                                className="co-chip raised"
                                data-tip="Format-aligned practice material"
                                key={c}
                              >
                                {c}
                              </span>
                            ))}
                            <span
                              className="co-chip raised"
                              style={{ opacity: 0.7 }}
                              data-tip="Pattern extended to comparable recruiters"
                            >
                              + similar IT recruiters
                            </span>
                          </div>
                          <div className="disclaimer">
                            <b>Note:</b> {v.disclaimer}
                          </div>
                        </>
                      )}

                      <div className="acc-foot">
                        <p>{v.note}</p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            onCta(v.title);
                            openWhatsApp(buildTrainingInterestMessage(v));
                          }}
                        >
                          {v.cta}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
