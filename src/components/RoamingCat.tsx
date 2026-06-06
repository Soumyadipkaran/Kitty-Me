import { useEffect, useState } from "react";

export function RoamingCat() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Cat 1 — walks left↔right along the bottom, follows scroll */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 right-0 z-20"
        style={{ bottom: "12px" }}
      >
        <div className="cat-walk">
          <span
            className="cat-emoji"
            style={{ transform: `rotate(${Math.sin(scrollY / 80) * 6}deg)` }}
          >
            🐈
          </span>
        </div>
      </div>

      {/* Cat 2 — peeks & scrolls vertically on the right side based on scroll */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-3 z-20 text-5xl"
        style={{
          top: `${20 + (scrollY % (typeof window !== "undefined" ? window.innerHeight - 120 : 500))}px`,
          transition: "top 0.15s linear",
          filter: "drop-shadow(0 6px 10px oklch(0.65 0.22 350 / 0.35))",
        }}
      >
        <span style={{ display: "inline-block", animation: "cat-bob 1.6s ease-in-out infinite" }}>
          🐱
        </span>
      </div>

      {/* Cat 3 — sleepy floating kitten that drifts diagonally */}
      <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-20">
        <span className="cat-drift">🐈‍⬛</span>
      </div>
    </>
  );
}