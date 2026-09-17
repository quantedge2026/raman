import Reveal from "../components/Reveal";
import { Icon, ImageIcon } from "../icons/Icons";
import { galleryCategories } from "../data/content";
import FinalCta from "../components/FinalCta";
import { usePageTitle } from "../hooks/usePageTitle";

const SLOTS_PER_CATEGORY = 4;

export default function Gallery() {
  usePageTitle(
    "Gallery",
    "Training sessions, workshops, seminars, placement drives and student activities from QuantEdge campus engagements."
  );

  return (
    <>
      <header className="chero">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="wrap chero-in">
          <div className="eyebrow">Gallery</div>
          <h1>The campus record, as it gets built.</h1>
          <p>
            No stock photography here — these slots are reserved for real photos from
            real QuantEdge engagements, and stay empty until we have them.
          </p>
        </div>
      </header>

      <section>
        <Reveal className="wrap">
          {galleryCategories.map((cat) => (
            <div className="gal-page-section" key={cat.title}>
              <div className="gal-page-head">
                <div className="ic pressed">
                  <Icon name={cat.icon} width="22" height="22" />
                </div>
                <div>
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                </div>
              </div>
              <div className="gal-slot-grid">
                {Array.from({ length: SLOTS_PER_CATEGORY }).map((_, i) => (
                  <div className="gal-slot" key={i}>
                    <ImageIcon />
                    <span>Photo Pending</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <FinalCta heading="Want your batch's story in this gallery next?" />
    </>
  );
}
