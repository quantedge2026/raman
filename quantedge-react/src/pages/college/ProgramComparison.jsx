import Reveal from "../../components/Reveal";
import { CheckIcon } from "../../icons/Icons";
import { programs, comparisonRows } from "../../data/content";

function Cell({ row, program }) {
  const value = program[row.key];
  if (row.type === "text") return <span>{value}</span>;
  if (row.type === "number")
    return (
      <span className="mono" style={{ fontWeight: 700, color: "var(--blue)" }}>
        {value}
      </span>
    );
  if (row.type === "bool")
    return value ? (
      <CheckIcon className="cmp-check" width="18" height="18" />
    ) : (
      <span className="cmp-cross">—</span>
    );
  if (row.type === "level") {
    const text = row.levels[value];
    return text ? <span>{text}</span> : <span className="cmp-cross">—</span>;
  }
  return null;
}

export default function ProgramComparison() {
  return (
    <section id="compare">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Program Structure</div>
          <h2>Three formats, compared side by side.</h2>
          <p>
            Every institution's academic calendar is different — this is the exact
            breakdown to match a track to yours, not a sales pitch.
          </p>
        </div>

        <div className="cmp-wrap raised-lg">
          <table className="cmp-table">
            <thead>
              <tr>
                <th></th>
                {programs.map((p) => (
                  <th key={p.id} className={p.featured ? "cmp-featured-col" : ""}>
                    <div className="cmp-col-head">
                      {p.featured && <span className="badge blue">{p.tag}</span>}
                      {!p.featured && <span className="badge soft">{p.tag}</span>}
                      <b>{p.name}</b>
                      <span className="hrs">{p.hoursShort} hrs</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.key}>
                  <td>{row.label}</td>
                  {programs.map((p) => (
                    <td key={p.id} className={p.featured ? "cmp-featured-col" : ""}>
                      <Cell row={row} program={p} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>Expected Outcomes</td>
                {programs.map((p) => (
                  <td key={p.id} className={p.featured ? "cmp-featured-col" : ""}>
                    <ul className="cmp-outcomes">
                      {p.outcomes.map((o) => (
                        <li key={o}>
                          <CheckIcon />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="cmp-cta-row">
                <td></td>
                {programs.map((p) => (
                  <td key={p.id} className={p.featured ? "cmp-featured-col" : ""}>
                    <a
                      className={`btn btn-sm ${p.featured ? "btn-primary" : "btn-secondary"}`}
                      href="#contact"
                    >
                      Request this track
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cmp-legend">
          <span>
            <CheckIcon width="13" height="13" className="cmp-check" /> Included
          </span>
          <span className="cmp-cross">— Not part of this track</span>
          <span>Scroll horizontally to compare on smaller screens</span>
        </div>
      </Reveal>
    </section>
  );
}
