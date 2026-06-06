import { useEffect, useState } from "react";
import catWalking from "@/assets/cat-walking.png";
import catWalking1 from "@/assets/cat-walking1.png";

export function RoamingCat() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 z-20"
      style={{ bottom: "12px" }}
    >
      <div className="cat-walk">
  <img
    src={catWalking}
    className="cat-img"
    style={{
      width: 110,
      transform: `rotate(${Math.sin(scrollY / 80) * 4}deg)`,
    }}
  />
</div>

<div className="cat-walk-reverse">
  <img
    src={catWalking1}
    className="cat-img"
    style={{
      width: 110,
      transform: `scaleX(-1) rotate(${-Math.sin(scrollY / 80) * 4}deg)`,
    }}
  />
</div>
    </div>
  );
}