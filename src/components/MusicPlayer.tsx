import { useEffect, useRef, useState } from "react";
import track505 from "@/assets/505ArcticMonkeys.mp3.asset.json";
import trackIce from "@/assets/IceBaby.mp3.asset.json";
import trackRoad from "@/assets/farfromanyroad.mp3.asset.json";
import { useLang } from "@/lib/i18n";
import { t } from "@/lib/content";

const playlist = [
  { title: "505", artist: "Arctic Monkeys", src: track505.url },
  { title: "Ice Baby", artist: "GUF", src: trackIce.url },
  { title: "Far From Any Road", artist: "The Handsome Family", src: trackRoad.url },
];

function fmt(sec: number) {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function MusicPlayer() {
  const { tr } = useLang();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || current === null) return;
    const trk = playlist[current];
    if (!trk) return;
    audio.src = trk.src;
    audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [current]);

  const toggle = (i: number) => {
    const audio = audioRef.current;
    if (current !== i) {
      setCurrent(i);
      return;
    }
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const next = () => setCurrent((c) => ((c ?? -1) + 1) % playlist.length);

  return (
    <div>
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={next}
      />
      <ul className="mt-8 divide-y-3 divide-foreground border-y-3 border-foreground">
        {playlist.map((track, i) => {
          const active = current === i;
          const isPlaying = active && playing;
          return (
            <li key={track.title}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={`${isPlaying ? "Pause" : "Play"} ${track.title}`}
                className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:bg-background/60 sm:gap-5"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center border-3 border-foreground text-[11px] transition-transform hover:-translate-y-0.5 sm:size-10 ${
                    active ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
                  aria-hidden
                >
                  {isPlaying ? "❚❚" : "▶"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-xl uppercase leading-none sm:text-2xl">
                    {track.title}
                  </span>
                  <span className="mt-1 block truncate font-script text-lg text-primary sm:hidden">
                    {track.artist}
                  </span>
                </span>
                <span className="ml-auto hidden shrink-0 font-script text-xl text-primary sm:block">
                  {track.artist}
                </span>
              </button>
              {active && (
                <div className="flex items-center gap-3 pb-4 font-mono text-[10px] tracking-[0.15em]">
                  <span>{fmt(progress)}</span>
                  <span className="relative h-2 flex-1 border-2 border-foreground bg-background">
                    <span
                      className="absolute inset-y-0 left-0 bg-primary"
                      style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
                    />
                  </span>
                  <span>{fmt(duration)}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
        {tr(t.nowPlaying)} — {current === null ? "—" : (playlist[current]?.title ?? "—")}
      </p>
    </div>
  );
}
