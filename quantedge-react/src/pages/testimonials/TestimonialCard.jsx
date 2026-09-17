export default function TestimonialCard({ t, alwaysIn = false }) {
  return (
    <div className={`tst-card raised-lg${alwaysIn ? " always-in" : ""}`}>
      <span className="tst-quote-mark" aria-hidden="true">
        "
      </span>
      <div className="tst-stars" aria-hidden="true">
        ★★★★★
      </div>
      <p className="tst-quote-text">"{t.quote}"</p>
      <div className="tst-who">
        <div className="tst-avatar">{t.initials}</div>
        <div className="tst-who-info">
          <b>{t.name}</b>
          <span>
            {t.program}, {t.institution}
          </span>
        </div>
        <span className="tst-company-badge">Placed at {t.placedAt}</span>
      </div>
    </div>
  );
}
