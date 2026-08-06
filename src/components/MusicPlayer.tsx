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

const STORAGE_KEY = "vym-music-state";

type Saved = { track: number; volume: number; muted: boolean };

function readSaved(): Saved | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    return {
      track:
        typeof parsed.track === "number" && parsed.track >= 0 && parsed.track < playlist.length
          ? parsed.track
          : 0,
      volume: typeof parsed.volume === "number" ? Math.min(1, Math.max(0, parsed.volume)) : 0.8,
      muted: Boolean(parsed.muted),
    };
  } catch {
    return null;
  }
}

export function MusicPlayer() {
  const { tr } = useLang();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const restored = useRef(false);
  const skipAutoplay = useRef(false);

  // restore saved state (track selection, volume, mute) after hydration
  useEffect(() => {
    const saved = readSaved();
    restored.current = true;
    if (!saved) return;
    setVolume(saved.volume);
    setMuted(saved.muted);
    const audio = audioRef.current;
    const trk = playlist[saved.track];
    if (audio && trk) {
      skipAutoplay.current = true;
      audio.src = trk.src;
      setCurrent(saved.track);
    }
  }, []);

  // persist state
  useEffect(() => {
    if (!restored.current) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ track: current ?? 0, volume, muted } satisfies Saved),
      );
    } catch {
      /* storage unavailable */
    }
  }, [current, volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || current === null) return;
    const trk = playlist[current];
    if (!trk) return;
    setProgress(0);
    if (skipAutoplay.current) {
      skipAutoplay.current = false;
      return;
    }
    audio.src = trk.src;
    audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const playIndex = (i: number) => {
    if (current !== i) {
      setCurrent(i);
      return;
    }
    togglePlay();
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (current === null) {
      setCurrent(0);
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

  const step = (dir: number) =>
    setCurrent((c) => ((c ?? 0) + dir + playlist.length) % playlist.length);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setProgress(value);
  };

  const track = current === null ? null : playlist[current];

  return (
    <div>
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => step(1)}
      />

      {/* transport */}
      <div className="mt-8 border-3 border-foreground bg-background p-4 shadow-hard sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-display text-xl uppercase leading-none sm:text-2xl">
              {track?.title ?? "—"}
            </div>
            <div className="truncate font-script text-lg text-primary">{track?.artist ?? "—"}</div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={tr(t.prevTrack)}
              className="flex size-10 items-center justify-center border-3 border-foreground bg-background text-xs transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? tr(t.pause) : tr(t.play)}
              aria-pressed={playing}
              className="flex size-12 items-center justify-center border-3 border-foreground bg-primary text-sm text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={tr(t.nextTrack)}
              className="flex size-10 items-center justify-center border-3 border-foreground bg-background text-xs transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              ⏭
            </button>
          </div>
        </div>

        {/* progress */}
        <div className="mt-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.15em]">
          <span>{fmt(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(progress, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label={tr(t.seekLabel)}
            aria-valuetext={`${fmt(progress)} / ${fmt(duration)}`}
            className="retro-range h-2 flex-1"
          />
          <span>{fmt(duration)}</span>
        </div>

        {/* volume */}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? tr(t.unmuteLabel) : tr(t.muteLabel)}
            aria-pressed={muted}
            className="flex size-8 items-center justify-center border-2 border-foreground bg-background text-[11px] transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {muted || volume === 0 ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            aria-label={tr(t.volumeLabel)}
            aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`}
            className="retro-range h-2 w-32 max-w-[45%]"
          />
          <span className="font-mono text-[10px] tracking-[0.15em] text-foreground/60">
            {Math.round((muted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>

      <ul
        aria-label={tr(t.playlistLabel)}
        className="mt-6 divide-y-3 divide-foreground border-y-3 border-foreground"
      >
        {playlist.map((item, i) => {
          const active = current === i;
          const isPlaying = active && playing;
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => playIndex(i)}
                aria-label={`${isPlaying ? tr(t.pause) : tr(t.play)}: ${item.title} — ${item.artist}`}
                aria-current={active ? "true" : undefined}
                className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:bg-background/60 focus-visible:outline-3 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:gap-5"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center border-3 border-foreground text-[11px] sm:size-10 ${
                    active ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
                  aria-hidden
                >
                  {isPlaying ? "❚❚" : "▶"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-xl uppercase leading-none sm:text-2xl">
                    {item.title}
                  </span>
                  <span className="mt-1 block truncate font-script text-lg text-primary sm:hidden">
                    {item.artist}
                  </span>
                </span>
                <span className="ml-auto hidden shrink-0 font-script text-xl text-primary sm:block">
                  {item.artist}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p
        aria-live="polite"
        className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60"
      >
        {tr(t.nowPlaying)} — {track?.title ?? "—"}
      </p>
    </div>
  );
}
