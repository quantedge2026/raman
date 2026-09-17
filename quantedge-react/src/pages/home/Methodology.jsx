import { Fragment } from "react";
import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { ArrowRightIcon } from "../../icons/Icons";
import { methodologySteps } from "../../data/content";

export default function Methodology() {
  return (
    <section id="methodology">
      <div className="wrap">
        <Reveal className="head center">
          <div className="eyebrow center">Training Methodology</div>
          <h2>A repeatable path from assessment to placement readiness.</h2>
          <Link
            to="/college-solutions#methodology"
            style={{
              display: "inline-block",
              marginTop: "var(--sp-3)",
              fontSize: ".85rem",
              fontWeight: 700,
              color: "var(--blue)",
            }}
          >
            See the full animated methodology →
          </Link>
        </Reveal>
        <Reveal className="flow">
          {methodologySteps.map((step, i) => (
            <Fragment key={step}>
              <div
                className={`flow-step${i === methodologySteps.length - 1 ? " final glow-blue" : " raised"}`}
              >
                <div className="n">STEP {String(i + 1).padStart(2, "0")}</div>
                <h5>{step}</h5>
              </div>
              {i < methodologySteps.length - 1 && (
                <div className="flow-arrow">
                  <ArrowRightIcon />
                </div>
              )}
            </Fragment>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
