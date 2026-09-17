import { useTilt } from "../hooks/useTilt";

export default function TiltCard({ className = "", style, onClick, children, ...rest }) {
  const ref = useTilt();
  const interactive = Boolean(onClick);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      {...rest}
    >
      {children}
    </div>
  );
}
