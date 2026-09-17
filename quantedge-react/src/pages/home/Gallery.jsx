import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { galleryCategories } from "../../data/content";

export default function Gallery() {
  return (
    <section id="gallery">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Gallery</div>
          <h2>Training sessions, workshops &amp; placement drives</h2>
          <p>
            Full gallery launching soon — photos from every campus engagement will live
            here.
          </p>
          <Link
            to="/gallery"
            style={{
              display: "inline-block",
              marginTop: "var(--sp-3)",
              fontSize: ".85rem",
              fontWeight: 700,
              color: "var(--blue)",
            }}
          >
            View the full gallery →
          </Link>
        </div>
        <div className="gal-grid">
          {galleryCategories.map((g) => (
            <div className="gal-tile raised" key={g.title}>
              <span>{g.title}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
