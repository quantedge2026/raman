import Reveal from "../../components/Reveal";
import { useInView } from "../../hooks/useInView";
import { Icon, CheckIcon, BarsIcon, ScreenIcon, BookIcon, ShieldIcon } from "../../icons/Icons";
import { platformFeaturesFull } from "../../data/content";

const chartData = [
  { label: "Quantitative Aptitude", value: 82 },
  { label: "Logical Reasoning", value: 76 },
  { label: "Verbal Ability", value: 88 },
  { label: "Technical", value: 71 },
];

const waveHeights = [18, 34, 22, 44, 28, 40, 20, 32, 24];

function AnalyticsCard() {
  const [ref, inView] = useInView(0.4);
  return (
    <div className="saas-card" ref={ref}>
      <h5>Mock Test Analytics</h5>
      <div className="chart-bars">
        {chartData.map((d) => (
          <div className={`chart-bar${inView ? " in" : ""}`} key={d.label}>
            <span className="val">{d.value}%</span>
            <span className="fill" style={{ "--h": `${d.value}%` }} />
            <span className="lab">{d.label}</span>
          </div>
        ))}
      </div>
      <p className="cap">Illustrative report — the shape every student sees inside their own portal.</p>
    </div>
  );
}

export default function LearningPlatform() {
  return (
    <section id="platform">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Tech-Enabled Learning Platform</div>
          <h2>One web portal. Every student's placement journey in it.</h2>
          <p>
            Students graduate from our program with the confidence to code and the
            clarity to calculate — the portal is what makes that measurable, daily.
          </p>
        </div>

        <div className="saas-frame raised-lg">
          <div className="saas-topbar">
            <div className="saas-dots">
              <span />
              <span />
              <span />
            </div>
            <div className="saas-url">portal.quantedgecs.com</div>
          </div>
          <div className="saas-body">
            <div className="saas-sidebar">
              <div className="saas-nav-item active">
                <ShieldIcon />
                Dashboard
              </div>
              <div className="saas-nav-item">
                <CheckIcon />
                Daily Quiz
              </div>
              <div className="saas-nav-item">
                <BarsIcon />
                Mock Tests
              </div>
              <div className="saas-nav-item">
                <ScreenIcon />
                Interview Sim
              </div>
              <div className="saas-nav-item">
                <BookIcon />
                Resource Library
              </div>
            </div>

            <div className="saas-main">
              <div className="saas-top-row">
                <div>
                  <h4>Welcome back</h4>
                  <span>Today's quiz: 12 of 15 complete</span>
                </div>
                <div className="saas-ring" aria-hidden="true" />
              </div>

              <div className="saas-grid2">
                <AnalyticsCard />
                <div className="saas-card">
                  <h5>Interview Simulation</h5>
                  <div className="wave" aria-hidden="true">
                    {waveHeights.map((h, i) => (
                      <span
                        key={i}
                        style={{ "--h": `${h}px`, animationDelay: `${i * 0.09}s` }}
                      />
                    ))}
                  </div>
                  <p className="cap">Real-time adaptive Q&amp;A, recorded for feedback review.</p>
                </div>
              </div>

              <div className="saas-stat-row">
                <div className="saas-stat">
                  <b>240+</b>
                  <span>Resource Library Files</span>
                </div>
                <div className="saas-stat">
                  <b>10</b>
                  <span>Mock Tests This Track</span>
                </div>
                <div className="saas-stat">
                  <b>Daily</b>
                  <span>Practice Quiz Cadence</span>
                </div>
              </div>

              <div className="saas-card">
                <h5>Resource Library</h5>
                <ul className="res-list">
                  <li>
                    <BookIcon />
                    TCS Pattern — Solution Walkthrough
                  </li>
                  <li>
                    <BookIcon />
                    Group Discussion — Strategy Tips
                  </li>
                  <li>
                    <BookIcon />
                    Power BI Dashboards — Practice Set
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="head" style={{ marginTop: "var(--sp-8)", marginBottom: "var(--sp-6)" }}>
          <h3 style={{ fontSize: "1.2rem" }}>Everything inside the portal</h3>
        </div>
        <div className="platform-feat-grid">
          {platformFeaturesFull.map((f) => (
            <div className="pf-tile raised" key={f.title}>
              <div className="ic pressed">
                <Icon name={f.icon} width="20" height="20" />
              </div>
              <h5>{f.title}</h5>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
