"use client";

import { useState } from "react";
import { COMPANION } from "@/lib/tour";
import { useCompanionTheme } from "./shell";

const LANGS = ["English", "Deutsch", "中文", "Français"] as const;

export function LiveTour() {
  const { theme } = useCompanionTheme();
  const light = theme === "light";
  const [lang, setLang] = useState<(typeof LANGS)[number]>("Deutsch");
  const [isolation, setIsolation] = useState(true);
  const [prompt, setPrompt] = useState<string | null>(null);

  const card = light
    ? "border-[#e2d8c8] bg-white/70"
    : "border-white/10 bg-elevated/80";
  const muted = light ? "text-[#7a6e5e]" : "text-ink-dim";

  return (
    <div className="flex flex-col gap-4 pt-1">
      <header>
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase ${muted}`}>
          In progress with Guide {COMPANION.guide}
        </p>
        <h1 className="mt-1 font-serif text-[28px] leading-tight tracking-tight">
          {COMPANION.site}
        </h1>
      </header>

      <section className={`rounded-2xl border p-4 ${card}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium">AISee Glasses Connected</p>
            <p className={`mt-0.5 font-mono text-[11px] ${muted}`}>
              Bluetooth LE · {COMPANION.mode}
            </p>
          </div>
          <Battery pct={COMPANION.battery} light={light} />
        </div>
      </section>

      <section>
        <p className={`label ${light ? "!text-[#7a6e5e]" : ""}`}>Audio language</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full border px-3 py-1.5 text-[12px] whitespace-nowrap ${
                lang === l
                  ? light
                    ? "border-heritage bg-heritage text-white"
                    : "border-sun/40 bg-sun/15 text-sun"
                  : light
                    ? "border-[#e2d8c8] text-[#5c5348]"
                    : "border-white/10 text-ink-dim"
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
          className={`mt-3 flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-[13px] ${card}`}
        >
          <span>Guide Voice Isolation</span>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
              isolation
                ? "bg-health/15 text-health"
                : light
                  ? "bg-[#e2d8c8] text-[#7a6e5e]"
                  : "bg-white/8 text-telemetry"
            }`}
          >
            {isolation ? "On" : "Off"}
          </span>
        </button>
      </section>

      <section className={`rounded-2xl border p-4 ${card}`}>
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase ${muted}`}>
          Looking at
        </p>
        <h2 className="mt-1 font-serif text-[22px] leading-snug">
          {COMPANION.lookingAt.title}
        </h2>
        <p className={`mt-2 text-[13px] leading-relaxed ${muted}`}>
          {COMPANION.lookingAt.body}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {COMPANION.prompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrompt(p)}
              className={`rounded-xl border px-3 py-2.5 text-left text-[13px] ${
                prompt === p
                  ? light
                    ? "border-heritage bg-[#f7efe3]"
                    : "border-sun/30 bg-sun/10"
                  : light
                    ? "border-[#e2d8c8]"
                    : "border-white/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {prompt && (
          <p className={`mt-3 text-[13px] leading-relaxed ${muted}`}>
            {prompt === "How did the hydraulics work?"
              ? "Gravity-fed cisterns on the upper terraces pressurised limestone conduits. Fountain #3 sits 1.4 m below the supply line — enough head to jet without a pump."
              : prompt === "Show ancient water level"
                ? "AR overlay: water would have stood 42 cm above the current dry basin. The rill still holds the original fall line."
                : "The gardens used downhill water pressure. No motors — just height, stone pipes, and careful levels."}
          </p>
        )}
      </section>
    </div>
  );
}

function Battery({ pct, light }: { pct: number; light: boolean }) {
  return (
    <div className="text-right">
      <div
        className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-1 ${
          light ? "border-[#e2d8c8]" : "border-white/10"
        }`}
      >
        <span
          className={`block h-3 w-6 overflow-hidden rounded-[2px] border ${
            light ? "border-[#cbbda8]" : "border-white/25"
          }`}
        >
          <span
            className="block h-full bg-health"
            style={{ width: `${pct}%` }}
          />
        </span>
        <span className="font-mono text-[10px]">{pct}%</span>
      </div>
    </div>
  );
}
