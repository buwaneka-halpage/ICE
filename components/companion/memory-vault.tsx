"use client";

/* eslint-disable @next/next/no-img-element -- live blob URLs are store-specific */

import { useEffect, useState, type ReactNode } from "react";
import type { Capture } from "@/lib/captures";
import { VAULT_MOMENTS } from "@/lib/tour";
import { useCompanionTheme } from "./shell";

export function MemoryVault() {
  const { theme } = useCompanionTheme();
  const light = theme === "light";
  const muted = light ? "text-[#7a6e5e]" : "text-ink-dim";
  const [playing, setPlaying] = useState(false);
  const [live, setLive] = useState<Capture[]>([]);

  useEffect(() => {
    const load = () =>
      fetch("/api/v1/media")
        .then((r) => r.json())
        .then((d: { captures?: Capture[] }) => setLive(d.captures ?? []))
        .catch(() => {});
    void load();
    const id = setInterval(load, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-1">
      <header>
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase ${muted}`}>
          First-person capture
        </p>
        <h1 className="mt-1 font-serif text-[28px] leading-tight">Memory Vault</h1>
      </header>

      <BeforeAfter light={light} />

      <section>
        <p className={`label ${light ? "!text-[#7a6e5e]" : ""}`}>Auto captures</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {live.map((c) => (
            <figure
              key={c.pathname}
              className={`overflow-hidden rounded-2xl border ${
                light ? "border-[#e2d8c8]" : "border-white/10"
              }`}
            >
              <img src={c.url} alt={c.title ?? c.capture_id} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-2.5">
                <p className="text-[12px] leading-snug">{c.title ?? c.capture_id}</p>
                <p className={`mt-0.5 font-mono text-[10px] ${muted}`}>
                  {c.device_id} · live blob
                </p>
              </figcaption>
            </figure>
          ))}
          {VAULT_MOMENTS.map((m) => (
            <figure
              key={m.id}
              className={`overflow-hidden rounded-2xl border ${
                light ? "border-[#e2d8c8]" : "border-white/10"
              }`}
            >
              <Photo kind={m.kind} />
              <figcaption className="p-2.5">
                <p className="text-[12px] leading-snug">{m.title}</p>
                <p className={`mt-0.5 font-mono text-[10px] ${muted}`}>{m.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className={`rounded-2xl border p-4 ${
          light ? "border-[#e2d8c8] bg-white/70" : "border-white/10 bg-elevated/80"
        }`}
      >
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase ${muted}`}>
          Audio moment
        </p>
        <h2 className="mt-1 font-serif text-[20px]">Lion Rock summit · 15s</h2>
        <p className={`mt-1 text-[12px] ${muted}`}>
          Ambient spatial clip — wind over the palace terrace, tour group below.
        </p>
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          className={`mt-3 flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 ${
            light ? "border-[#e2d8c8]" : "border-white/10"
          }`}
        >
          <span className="font-mono text-[12px] text-sun">
            {playing ? "Pause" : "Play"}
          </span>
          <span className="flex h-6 flex-1 items-end gap-0.5">
            {[6, 14, 10, 18, 9, 16, 12, 20, 8, 15, 11, 17, 7, 13].map((h, i) => (
              <span
                key={i}
                className="wave-bar w-full rounded-sm bg-sun/70"
                style={{
                  height: playing ? `${h}px` : "4px",
                  animationPlayState: playing ? "running" : "paused",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </span>
        </button>
      </section>

      <div className="grid gap-2">
        <button
          type="button"
          className="rounded-2xl bg-heritage py-3 text-[13px] font-medium text-white"
        >
          Export 4K Trip Reel to Phone
        </button>
        <button
          type="button"
          className={`rounded-2xl border py-3 text-[13px] ${
            light ? "border-[#cbbda8]" : "border-white/10"
          }`}
        >
          Share Curated Day Recap
        </button>
      </div>
    </div>
  );
}

function BeforeAfter({ light }: { light: boolean }) {
  const [x, setX] = useState(48);

  return (
    <section>
      <p className={`label ${light ? "!text-[#7a6e5e]" : ""}`}>
        Before & after · Fountain #3
      </p>
      <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
        <div className="absolute inset-0">
          <GardenAfter />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
        >
          <RuinBefore />
        </div>
        <div
          className="absolute top-0 bottom-0 w-px bg-white"
          style={{ left: `${x}%` }}
        />
        <div
          className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm"
          style={{ left: `${x}%` }}
        />
        <input
          type="range"
          min={4}
          max={96}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="absolute inset-0 cursor-ew-resize opacity-0"
          aria-label="Before and after slider"
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[10px] text-white">
          Today
        </span>
        <span className="absolute right-2 bottom-2 rounded-full bg-black/50 px-2 py-0.5 font-mono text-[10px] text-sun">
          5th c. overlay
        </span>
      </div>
    </section>
  );
}

function RuinBefore() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      <rect width="400" height="300" fill="#8a7a64" />
      <rect width="400" height="180" fill="#6f6454" />
      <rect x="40" y="150" width="320" height="90" fill="#c4b49a" />
      <rect x="56" y="166" width="130" height="58" fill="#b39f82" />
      <rect x="214" y="166" width="130" height="58" fill="#b39f82" />
      <path d="M0 250 L400 220 L400 300 L0 300Z" fill="#5c5348" />
      <circle cx="80" cy="70" r="18" fill="#d9cfc0" opacity="0.5" />
    </svg>
  );
}

function GardenAfter() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      <rect width="400" height="300" fill="#1d3a32" />
      <rect width="400" height="160" fill="#c98a3a" />
      <rect x="40" y="140" width="320" height="110" fill="#0a4a58" />
      <rect x="56" y="156" width="130" height="70" fill="#0ea5e9" opacity="0.45" />
      <rect x="214" y="156" width="130" height="70" fill="#0ea5e9" opacity="0.45" />
      <path d="M120 226 L132 156 L144 226" fill="#e8ecf1" opacity="0.5" />
      <path d="M278 226 L290 148 L302 226" fill="#e8ecf1" opacity="0.5" />
      <path d="M0 250 L400 230 L400 300 L0 300Z" fill="#245c3a" />
      <path d="M0 0 L400 0 L400 90 L0 140Z" fill="#f59e0b" opacity="0.18" />
    </svg>
  );
}

function Photo({ kind }: { kind: (typeof VAULT_MOMENTS)[number]["kind"] }) {
  const scenes: Record<string, ReactNode> = {
    water: <GardenAfter />,
    wall: (
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        <rect width="400" height="300" fill="#cfc3ae" />
        <path d="M0 40 L400 10 L400 300 L0 300Z" fill="#b7aa94" />
        <path d="M40 80 h80 M40 100 h120 M40 120 h60" stroke="#6f6454" strokeWidth="2" />
      </svg>
    ),
    fresco: (
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        <rect width="400" height="300" fill="#5a2e24" />
        <ellipse cx="160" cy="140" rx="50" ry="70" fill="#c45c3a" />
        <ellipse cx="250" cy="150" rx="46" ry="66" fill="#d97706" />
        <rect width="400" height="300" fill="#2a1814" opacity="0.25" />
      </svg>
    ),
    lion: (
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        <rect width="400" height="300" fill="#3d3428" />
        <path d="M40 220 C80 140 120 140 160 220" fill="#c4b49a" />
        <path d="M240 220 C280 140 320 140 360 220" fill="#c4b49a" />
        <rect x="170" y="80" width="60" height="140" fill="#2a261f" />
      </svg>
    ),
    summit: (
      <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
        <rect width="400" height="300" fill="#87a0b8" />
        <path d="M0 160 L400 130 L400 300 L0 300Z" fill="#5a6e4a" />
        <path d="M0 0 L400 0 L400 90 L0 70Z" fill="#f59e0b" opacity="0.35" />
      </svg>
    ),
  };
  return <div className="aspect-[4/3]">{scenes[kind]}</div>;
}
