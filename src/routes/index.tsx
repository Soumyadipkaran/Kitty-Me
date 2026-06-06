import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Music2, Pause, Play, MapPin, Upload, Sparkles, Camera } from "lucide-react";
import floralCats from "@/assets/floral-cats.jpg";
import pinkBg from "@/assets/pink-bg.jpg";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import { PetalRain } from "@/components/PetalRain";
import { RoamingCat } from "@/components/RoamingCat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forever Us — A Love Story" },
      { name: "description", content: "A romantic keepsake page with photos, our place on the map, and our song." },
      { property: "og:title", content: "Forever Us — A Love Story" },
      { property: "og:description", content: "A romantic keepsake page with photos, our place, and our song." },
    ],
  }),
  component: Index,
});

type Group = { key: "her" | "moments" | "together"; title: string; script: string; count: number };

const GROUPS: Group[] = [
  { key: "her", title: "Just Her", script: "my muse", count: 6 },
  { key: "moments", title: "Little Moments", script: "in between", count: 4 },
  { key: "together", title: "Us, Together", script: "you & me", count: 6 },
];

const DEFAULTS: Record<Group["key"], string[]> = {
  her: [couple1, couple2, couple1, couple2, couple1, couple2],
  moments: [couple3, couple3, couple3, couple3],
  together: [couple2, couple1, couple2, couple1, couple2, couple1],
};

type Song = { title: string; artist: string; src: string };

const SONGS: Song[] = [
  { title: "A Thousand Years", artist: "Christina Perri", src: "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3" },
  { title: "Romantic Piano", artist: "Sample One", src: "https://cdn.pixabay.com/audio/2023/02/28/audio_550d815fb5.mp3" },
  { title: "Soft Love", artist: "Sample Two", src: "https://cdn.pixabay.com/audio/2022/03/15/audio_5cb24aa052.mp3" },
  { title: "Dreamy Strings", artist: "Sample Three", src: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" },
  { title: "Sweet Memories", artist: "Sample Four", src: "https://cdn.pixabay.com/audio/2024/02/14/audio_d51e9b9ee1.mp3" },
];

function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [photos, setPhotos] = useState<Record<Group["key"], string[]>>(DEFAULTS);
  const [playing, setPlaying] = useState(false);
  const [songIdx, setSongIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, group: Group["key"], idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotos((prev) => {
      const next = [...prev[group]];
      next[idx] = url;
      return { ...prev, [group]: next };
    });
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
                  <label
                    key={i}
                    className="group relative block cursor-pointer overflow-hidden rounded-[1.75rem] bg-card p-2.5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-2 hover:rotate-1"
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
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-primary flex items-center gap-2">
                          <Upload size={12} /> Change photo
                        </div>
                      </div>
                    </div>
                    <p className="text-script text-base text-primary mt-2 text-center">no. {i + 1}</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleUpload(e, group.key, i)}
                    />
                  </label>
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
            <h2 className="text-display text-5xl md:text-7xl">Where it All Began</h2>
            <p className="mt-4 text-muted-foreground">The little spot on the map that holds our heart.</p>
          </div>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border-8 border-white shadow-[var(--shadow-soft)]">
            <iframe
              title="Our Place"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.2945%2C48.8534%2C2.3045%2C48.8634&layer=mapnik&marker=48.8584,2.2995"
              className="h-[460px] w-full"
              loading="lazy"
            />
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-center text-sm text-muted-foreground text-script text-xl">
            ♡ Paris, France ♡
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
          made with <Heart className="inline fill-primary text-primary animate-heartbeat" size={20} /> for us
        </footer>
      </main>
    </div>
  );
}
