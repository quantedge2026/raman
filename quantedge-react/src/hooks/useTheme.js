import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(null); // null = follow system

  useEffect(() => {
    try {
      const saved = localStorage.getItem("qe-theme");
      if (saved) setTheme(saved);
    } catch {
      /* private mode / storage blocked — fall back to system theme */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const isDark =
        prev === "dark" ||
        (!prev &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      const next = isDark ? "light" : "dark";
      try {
        localStorage.setItem("qe-theme", next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
