import { useMemo } from "react";

export function PetalRain({ count = 22 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 18,
        duration: 14 + Math.random() * 16,
        rotate: Math.random() * 360,
        hue: 340 + Math.random() * 30,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 32 32"
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `float-petal ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotate}deg)`,
            filter: "drop-shadow(0 2px 6px oklch(0.7 0.2 350 / 0.35))",
          }}
        >
          <path
            d="M16 2 C22 8, 28 14, 16 30 C4 14, 10 8, 16 2 Z"
            fill={`oklch(0.78 0.18 ${p.hue})`}
            opacity="0.85"
          />
        </svg>
      ))}
    </div>
  );
}