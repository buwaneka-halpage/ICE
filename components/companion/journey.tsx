"use client";

/* eslint-disable @next/next/no-img-element -- heritage stills from Wikimedia Commons */

import { useState } from "react";
import { JOURNEY, QA_LOG } from "@/lib/tour";
import { SIGHT_BY_ID } from "@/lib/sights";
import { useCompanionTheme } from "./shell";

export function Journey() {
  const { theme } = useCompanionTheme();
  const light = theme === "light";
  const muted = light ? "text-[#7a6e5e]" : "text-ink-dim";
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-5 pt-1">
      <header>
        <p className={`font-mono text-[10px] tracking-[0.14em] uppercase ${muted}`}>
          16 Aug 2026 · Sigiriya
        </p>
        <h1 className="mt-1 font-serif text-[28px] leading-tight">
          Discovery journey
        </h1>
      </header>

      <ol className="relative space-y-4 pl-1">
        {JOURNEY.map((j, i) => (
          <li key={j.time} className="flex gap-3">
            <div className="flex w-10 flex-col items-center">
              <span className="font-mono text-[10px] text-sun">{j.time}</span>
              {i < JOURNEY.length - 1 && (
                <span
                  className={`mt-1 w-px flex-1 ${light ? "bg-[#e2d8c8]" : "bg-white/10"}`}
                />
              )}
            </div>
            <div
              className={`flex-1 overflow-hidden rounded-2xl border ${
                light ? "border-[#e2d8c8] bg-white/70" : "border-white/10 bg-elevated/80"
              }`}
            >
              <img
                src={SIGHT_BY_ID[j.sight].src}
                alt={j.title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-3">
              <p className="text-[14px]">{j.title}</p>
              <p className={`mt-0.5 text-[12px] ${muted}`}>{j.detail}</p>
              {j.badge && (
                <span className="mt-2 inline-flex rounded-full border border-sun/30 bg-sun/10 px-2 py-0.5 font-mono text-[10px] text-sun">
                  Unlocked · {j.badge}
                </span>
              )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section>
        <p className={`label ${light ? "!text-[#7a6e5e]" : ""}`}>AI Q&A log</p>
        <div className="mt-2 space-y-2">
          {QA_LOG.map((item, i) => (
            <button
              key={item.q}
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className={`block w-full rounded-2xl border p-3 text-left ${
                light ? "border-[#e2d8c8] bg-white/70" : "border-white/10 bg-elevated/80"
              }`}
            >
              <p className="text-[13px]">Q: {item.q}</p>
              {open === i && (
                <p className={`mt-2 text-[13px] leading-relaxed ${muted}`}>
                  A: {item.a}
                </p>
              )}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
