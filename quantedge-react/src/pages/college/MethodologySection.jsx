import Reveal from "../../components/Reveal";
import MethodFlow from "../../components/MethodFlow";
import { methodologySteps, promiseSteps, promiseOutcome } from "../../data/content";

export default function MethodologySection() {
  const promiseFlow = [
    ...promiseSteps.map((label) => ({ label })),
    { label: promiseOutcome, highlight: true },
  ];
  const opsFlow = methodologySteps.map((label, i) => ({
    label,
    highlight: i === methodologySteps.length - 1,
  }));

  return (
    <section id="methodology">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Training Methodology</div>
          <h2>Two views of the same discipline.</h2>
          <p>
            One is the promise we make to every student; the other is how that promise
            actually runs, week to week, inside a program.
          </p>
        </div>

        <div className="meth-block">
          <div className="meth-block-head">
            <div>
              <h3>Our Promise</h3>
              <p>Training that translates into measurable capability — not just a certificate.</p>
            </div>
          </div>
          <MethodFlow steps={promiseFlow} />
        </div>

        <div className="meth-block">
          <div className="meth-block-head">
            <div>
              <h3>Training Methodology</h3>
              <p>The operational cycle every batch moves through, start to placement readiness.</p>
            </div>
          </div>
          <MethodFlow steps={opsFlow} />
        </div>
      </Reveal>
    </section>
  );
}
