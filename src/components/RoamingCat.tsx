import { useEffect, useState } from "react";
import catWalking from "@/assets/cat-walking.png";

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
            alt=""
            className="cat-img"
            style={{
              width: 110,
              height: "auto",
              transform: `rotate(${Math.sin(scrollY / 80) * 4}deg)`,
            }}
          />
        </div>
    </div>
  );
}