"use client";

/* eslint-disable @next/next/no-img-element -- live blob URLs are store-specific */

import { useEffect, useState } from "react";
import type { Capture } from "@/lib/captures";
import { mergeCaptures } from "@/lib/demo";

export function MemoryVault() {
  const [playing, setPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [live, setLive] = useState<Capture[]>(() => mergeCaptures([]));

  useEffect(() => {
    const load = () =>
      fetch("/api/v1/media")
        .then((r) => r.json())
        .then((d: { captures?: Capture[] }) => setLive(mergeCaptures(d.captures ?? [])))
        .catch(() => setLive(mergeCaptures([])));
    void load();
    const id = setInterval(load, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-5 pt-1">
      <header>
        <p className="text-[13px] text-ink-dim">First-person capture</p>
        <h1 className="mt-1 font-serif text-[28px] leading-tight">Memory vault</h1>
      </header>

      <BeforeAfter />

      <section>
        <p className="label">Auto captures</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {live.map((c) => (
            <figure
              key={c.pathname}
              className="overflow-hidden rounded-lg border border-line"
            >
              <img src={c.url} alt={c.title ?? c.capture_id} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-2.5">
                <p className="text-[12px] leading-snug">{c.title ?? c.capture_id}</p>
                <p className="mt-0.5 text-[11px] text-ink-dim">
                  {c.device_id}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-obsidian p-4">
        <p className="text-[13px] text-ink-dim">Audio moment</p>
        <h2 className="mt-1 font-serif text-[20px]">Lion Rock summit · 15s</h2>
        <p className="mt-1 text-[12px] text-ink-dim">
          Ambient clip — wind over the palace terrace, tour group below.
        </p>
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          className="mt-3 flex w-full items-center gap-3 rounded-md border border-line bg-elevated px-3 py-2.5"
        >
          <span className="text-[12px] text-sun">
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
          onClick={() => setSaved(true)}
          className="rounded-lg bg-heritage py-3 text-[13px] font-medium text-white"
        >
          {saved ? "Saved to camera roll" : "Export 4K trip reel to phone"}
        </button>
        <button
          type="button"
          className="rounded-lg border border-line py-3 text-[13px]"
        >
          Share curated day recap
        </button>
      </div>
    </div>
  );
}

function BeforeAfter() {
  const [x, setX] = useState(48);
  const [thenOk, setThenOk] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/demo/fountain-then.jpg")
      .then((res) => {
        if (live) setThenOk(res.ok);
      })
      .catch(() => {
        if (live) setThenOk(false);
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <section>
      <p className="label">Before & after · water gardens</p>
      <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-lg border border-line">
        <div className="absolute inset-0">
          {thenOk ? (
            <img
              src="/demo/fountain-then.jpg"
              alt="5th century reconstruction"
              className="h-full w-full object-cover"
              onError={() => setThenOk(false)}
            />
          ) : (
            <GardenAfter />
          )}
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
        >
          <img
            src="/demo/fountain-today.jpg"
            alt="Water gardens today"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-px bg-white"
          style={{ left: `${x}%` }}
        />
        <div
          className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-ink/40"
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
        <span className="absolute bottom-2 left-2 rounded-full bg-ink/55 px-2 py-0.5 text-[11px] text-white">
          Today
        </span>
        <span className="absolute right-2 bottom-2 rounded-full bg-ink/55 px-2 py-0.5 text-[11px] text-white">
          5th c. overlay
        </span>
      </div>
    </section>
  );
}

function GardenAfter() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
      <rect width="400" height="300" fill="#1d3a32" />
      <rect width="400" height="160" fill="#c98a3a" />
      <rect x="40" y="140" width="320" height="110" fill="#0a4a58" />
      <rect x="56" y="156" width="130" height="70" fill="#3f5c56" opacity="0.55" />
      <rect x="214" y="156" width="130" height="70" fill="#3f5c56" opacity="0.55" />
      <path d="M120 226 L132 156 L144 226" fill="#f4ede0" opacity="0.5" />
      <path d="M278 226 L290 148 L302 226" fill="#f4ede0" opacity="0.5" />
      <path d="M0 250 L400 230 L400 300 L0 300Z" fill="#245c3a" />
      <path d="M0 0 L400 0 L400 90 L0 140Z" fill="#c45c26" opacity="0.18" />
    </svg>
  );
}
