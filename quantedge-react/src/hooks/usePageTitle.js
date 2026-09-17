import { useEffect } from "react";

const SITE = "QuantEdge";

// Sets a per-page <title> and meta description — the baseline SEO signal a
// single-page app otherwise loses by shipping one static title everywhere.
export function usePageTitle(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | ${SITE}` : SITE;

    let meta = document.querySelector('meta[name="description"]');
    let created = false;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
      created = true;
    }
    const prevDesc = meta.getAttribute("content");
    if (description) meta.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (created) meta.remove();
      else if (prevDesc !== null) meta.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
