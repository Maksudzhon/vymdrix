/** Tiny WebAudio "electric glitch" zap — no audio files, generated on the fly. */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(ac: AudioContext, seconds: number) {
  const len = Math.max(1, Math.floor(ac.sampleRate * seconds));
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    // crackly, decaying static
    data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 1.6;
  }
  return buf;
}

/** Plays a short electric-arc buzz. `volume` 0..1. */
export function playGlitch(volume = 0.25) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const out = ac.createGain();
  out.gain.value = volume;
  out.connect(ac.destination);

  // static crackle
  const noise = ac.createBufferSource();
  noise.buffer = noiseBuffer(ac, 0.18);
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2200;
  bp.Q.value = 1.2;
  const ng = ac.createGain();
  ng.gain.setValueAtTime(0.9, now);
  ng.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  noise.connect(bp).connect(ng).connect(out);
  noise.start(now);
  noise.stop(now + 0.2);

  // buzzing arc tone that stutters
  const osc = ac.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(90, now);
  osc.frequency.setValueAtTime(240, now + 0.03);
  osc.frequency.setValueAtTime(70, now + 0.06);
  osc.frequency.setValueAtTime(180, now + 0.09);
  const og = ac.createGain();
  og.gain.setValueAtTime(0.0001, now);
  og.gain.exponentialRampToValueAtTime(0.35, now + 0.01);
  og.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  osc.connect(og).connect(out);
  osc.start(now);
  osc.stop(now + 0.18);

  window.setTimeout(() => out.disconnect(), 400);
}
