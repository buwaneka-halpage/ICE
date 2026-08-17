"use client";

/* eslint-disable @next/next/no-img-element -- heritage stills from Wikimedia Commons */

import { useState } from "react";
import { COMPANION } from "@/lib/tour";
import { SIGHT_BY_ID } from "@/lib/sights";

const LANGS = ["English", "Deutsch", "中文", "Français"] as const;

export function LiveTour() {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("Deutsch");
  const [isolation, setIsolation] = useState(true);
  const [prompt, setPrompt] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 pt-1">
      <header>
        <p className="text-[13px] text-ink-dim">
          In progress with Guide {COMPANION.guide}
        </p>
        <h1 className="mt-1 font-serif text-[28px] leading-tight tracking-tight">
          {COMPANION.site}
        </h1>
      </header>

      <figure className="overflow-hidden rounded-lg border border-line">
        <img
          src={SIGHT_BY_ID.sigiriya.src}
          alt="Sigiriya Rock Fortress"
          className="aspect-[16/10] w-full object-cover"
        />
        <figcaption className="px-3 py-2 text-[12px] text-ink-dim">
          Lion Rock · Central Province
        </figcaption>
      </figure>

      <section className="rounded-lg border border-line bg-obsidian p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium">Glasses connected</p>
            <p className="mt-0.5 text-[12px] text-ink-dim">{COMPANION.mode}</p>
          </div>
          <Battery pct={COMPANION.battery} />
        </div>
      </section>

      <section>
        <p className="label">Audio language</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap ${
                lang === l
                  ? "border-heritage bg-heritage text-white"
                  : "border-line text-ink-dim"
              }`}
            >
              {l}
              {lang === l ? " · Active" : ""}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsolation((v) => !v)}
          className="mt-3 flex w-full items-center justify-between rounded-lg border border-line bg-obsidian px-4 py-3 text-[13px]"
        >
          <span>Guide voice isolation</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] ${
              isolation ? "bg-health/15 text-health" : "bg-surface text-ink-dim"
            }`}
          >
            {isolation ? "On" : "Off"}
          </span>
        </button>
      </section>

      <section className="rounded-lg border border-line bg-obsidian p-4">
        <p className="text-[13px] text-ink-dim">Looking at</p>
        <h2 className="mt-1 font-serif text-[22px] leading-snug">
          {COMPANION.lookingAt.title}
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
          {COMPANION.lookingAt.body}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {COMPANION.prompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrompt(p)}
              className={`rounded-md border px-3 py-2.5 text-left text-[13px] ${
                prompt === p
                  ? "border-heritage bg-elevated"
                  : "border-line bg-elevated"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {prompt && (
          <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">
            {prompt === "How did the hydraulics work?"
              ? "Gravity-fed cisterns on the upper terraces pressurised limestone conduits. Fountain #3 sits 1.4 m below the supply line — enough head to jet without a pump."
              : prompt === "Show ancient water level"
                ? "The overlay shows water 42 cm above the dry basin. The rill still holds the original fall line."
                : "The gardens used downhill water pressure. No motors — just height, stone pipes, and careful levels."}
          </p>
        )}
      </section>
    </div>
  );
}

function Battery({ pct }: { pct: number }) {
  return (
    <div className="text-right">
      <div className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-1">
        <span className="block h-3 w-6 overflow-hidden rounded-[2px] border border-line">
          <span className="block h-full bg-health" style={{ width: `${pct}%` }} />
        </span>
        <span className="text-[11px]">{pct}%</span>
      </div>
    </div>
  );
}
