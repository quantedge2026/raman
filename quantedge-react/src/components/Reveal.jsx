import { useInView } from "../hooks/useInView";

// Fade/rise wrapper for below-the-fold content. Hero content must never
// use this — it has to be visible at rest.
export default function Reveal({ as: Tag = "div", className = "", style, children }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " in" : ""}${className ? " " + className : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
