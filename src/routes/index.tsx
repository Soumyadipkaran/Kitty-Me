import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Music2, Pause, Play, MapPin, Sparkles, Camera } from "lucide-react";
import floralCats from "@/assets/floral-cats.jpg";
import pinkBg from "@/assets/pink-bg.jpg";
import her1 from "@/assets/her-1.jpg";
import her2 from "@/assets/her-2.jpg";
import her3 from "@/assets/her-3.jpg";
import her4 from "@/assets/her-4.jpg";
import her5 from "@/assets/her-5.jpg";
import her6 from "@/assets/her-6.jpg";
import moment1 from "@/assets/moment-1.jpg";
import moment2 from "@/assets/moment-2.jpg";
import moment3 from "@/assets/moment-3.jpg";
import moment4 from "@/assets/moment-4.jpg";
import us1 from "@/assets/us-1.jpg";
import us2 from "@/assets/us-2.jpg";
import us3 from "@/assets/us-3.jpg";
import us4 from "@/assets/us-4.jpg";
import us5 from "@/assets/us-5.jpg";
import us6 from "@/assets/us-6.jpg";
import { PetalRain } from "@/components/PetalRain";
import { RoamingCat } from "@/components/RoamingCat";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import song1 from "../assets/music/song1.mp3";
import song2 from "../assets/music/song2.mp3";
import song3 from "../assets/music/song3.mp3";
import song4 from "../assets/music/song4.mp3";
import song5 from "../assets/music/song5.mp3";
import song6 from "../assets/music/song6.mp3";
import song7 from "../assets/music/song7.mp3";








const heartIcon = L.divIcon({
  html: '<div style="font-size:42px;">💕</div>',
  className: "",
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forever Us" },
      { name: "description", content: "A keepsake page with photos, our place on the map, and our song." },
      { property: "og:title", content: "Forever Us" },
      { property: "og:description", content: "keepsake page with photos, our place, and our song." },
    ],
  }),
  component: Index,
});

type Group = { key: "her" | "moments" | "together"; title: string; script: string; count: number };

const GROUPS: Group[] = [
  { key: "her", title: "It's U", script: "my kitty", count: 6 },
  { key: "moments", title: "Little Moments", script: "in between", count: 4 },
  { key: "together", title: "Us, Together", script: "you & me", count: 6 },
];

const DEFAULTS: Record<Group["key"], string[]> = {
  // Swap any of these by replacing the matching file in src/assets/.
  her: [her1, her2, her3, her4, her5, her6],
  moments: [moment1, moment2, moment3, moment4],
  together: [us1, us2, us3, us4, us5, us6],
};

type Song = { title: string; artist: string; src: string };

const SONGS: Song[] = [
  { title: "Yedhi Yedhi", artist: "♡♡♡", src: song1 },
  { title: "Khat", artist: "Navjot Ahuja", src: song2 },
  { title: "Those Eyes", artist: "New West", src: song3 },
  { title: "Mann Mera", artist: "Gajendra Verma", src: song4 },
  { title: "Arerey Manasa", artist: "Falaknuma Das", src: song5 },
  { title: "Gulabi Aankhen", artist: "Sanam", src: song6 },
  { title: "Preminche Premava", artist: "Nuvvu Nenu Prema", src: song7 },
];

function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [songIdx, setSongIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const photos = DEFAULTS;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const pickSong = (i: number) => {
    const a = audioRef.current;
    setSongIdx(i);
    setPlaying(false);
    if (a) {
      a.pause();
      // load new src on next tick
      setTimeout(() => {
        a.load();
        a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }, 50);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden romance-gradient">
      {/* Layered moving background */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `url(${floralCats})`,
          backgroundSize: "720px",
          backgroundRepeat: "repeat",
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: "transform 0.1s linear",
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `url(${pinkBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * -0.25}px) scale(1.1)`,
          mixBlendMode: "screen",
        }}
      />
      <PetalRain />
      <RoamingCat />

      <main className="relative z-10">
        {/* HERO */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-script text-3xl md:text-5xl text-primary mb-4 animate-heartbeat inline-flex items-center gap-3">
            <Heart className="fill-primary text-primary" /> you & me <Heart className="fill-primary text-primary" />
          </p>
          <h1 className="text-display text-6xl md:text-9xl font-medium tracking-tight text-foreground leading-none">
            Forever <em className="text-script text-primary not-italic">Us</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-muted-foreground">
            A little corner of the internet for the moments, places and songs that make our story.
          </p>
          <div className="mt-12 animate-bounce text-primary/70 text-sm tracking-widest uppercase">
            scroll for our story
          </div>
        </section>

        {/* PHOTO FRAMES — three grouped galleries */}
        {GROUPS.map((group) => {
          const cols =
            group.count === 4
              ? "md:grid-cols-2 lg:grid-cols-2"
              : "md:grid-cols-3 lg:grid-cols-3";
          return (
            <section key={group.key} className="px-6 py-20 md:py-28">
              <div className="mx-auto max-w-6xl text-center mb-12">
                <p className="text-script text-2xl text-primary inline-flex items-center gap-2">
                  {group.key === "her" ? <Sparkles size={18} /> : group.key === "moments" ? <Camera size={18} /> : <Heart size={18} className="fill-primary" />}
                  {group.script}
                </p>
                <h2 className="text-display text-5xl md:text-7xl">{group.title}</h2>
              </div>
              <div className={`mx-auto grid max-w-6xl grid-cols-2 gap-6 ${cols}`}>
                {photos[group.key].map((src, i) => (
                  <div
                    key={i}
                    className="group relative block overflow-hidden rounded-[1.75rem] bg-card p-2.5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-2 hover:rotate-1"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (1 + (i % 3))}deg)` }}
                  >
                    <div className="relative overflow-hidden rounded-[1.25rem] border-4 border-white">
                      <img
                        src={src}
                        alt={`${group.title} photo ${i + 1}`}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* MAP */}
        <section className="px-6 py-24 md:py-32">
  <div className="mx-auto max-w-5xl text-center mb-12">
    <p className="text-script text-2xl text-primary inline-flex items-center gap-2">
      <MapPin size={20} /> our place
    </p>
    <h2 className="text-display text-5xl md:text-7xl">
      Where it All Began
    </h2>
    <p className="mt-4 text-muted-foreground">
      The little spot on the map that holds our heart.
    </p>
  </div>

  <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border-8 border-white shadow-[var(--shadow-soft)]">
    <MapContainer
      center={[12.825051, 80.219850]}
      zoom={16}
      scrollWheelZoom={true}
      className="h-[460px] w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        position={[12.825051, 80.219850]}
        icon={heartIcon}
      >
        
      </Marker>
    </MapContainer>
  </div>

  <p className="mx-auto mt-4 max-w-5xl text-center text-sm text-muted-foreground text-script text-xl">
    ♡ Chennai ♡ Siruseri ♡ CTS ♡ SDB1 ♡
  </p>
</section>

        {/* SONG */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-white/70 p-10 md:p-14 backdrop-blur-xl shadow-[var(--shadow-soft)] border border-primary/20 text-center">
            <p className="text-script text-2xl text-primary inline-flex items-center gap-2">
              <Music2 size={20} /> our song
            </p>
            <h2 className="text-display text-5xl md:text-6xl mt-2">{SONGS[songIdx].title}</h2>
            <p className="text-muted-foreground mt-2">{SONGS[songIdx].artist}</p>

            <button
              onClick={togglePlay}
              className="mt-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-110"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>

            <div className="mt-8 flex justify-center gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-primary/70"
                  style={{
                    height: playing ? `${10 + Math.sin(i * 0.7) * 18 + 14}px` : "6px",
                    animation: playing ? `heart-beat ${0.8 + (i % 5) * 0.15}s ease-in-out infinite` : "none",
                    transition: "height 0.3s ease",
                  }}
                />
              ))}
            </div>

            <audio
              ref={audioRef}
              src={SONGS[songIdx].src}
              loop
              onEnded={() => setPlaying(false)}
            />
            <p className="text-xs text-muted-foreground mt-6">Tap play to hear our melody</p>

            <div className="mt-8 border-t border-primary/20 pt-6 text-left">
              <p className="text-script text-xl text-primary text-center mb-3">choose a song ♡</p>
              <ul className="space-y-2">
                {SONGS.map((s, i) => (
                  <li key={i}>
                    <button
                      onClick={() => pickSong(i)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all ${
                        songIdx === i
                          ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                          : "bg-white/60 hover:bg-white/90 text-foreground"
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="font-medium text-sm">{s.title}</span>
                        <span className={`text-xs ${songIdx === i ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.artist}</span>
                      </span>
                      {songIdx === i && playing ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="relative z-10 py-12 text-center text-script text-2xl text-primary">
          made with <Heart className="inline fill-primary text-primary animate-heartbeat" size={20} /> for us <Heart className="inline fill-primary text-primary animate-heartbeat" size={20} /> I'll keep irritating U forever.
        </footer>
      </main>
    </div>
  );
}
