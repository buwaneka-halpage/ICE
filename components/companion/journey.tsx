"use client";

/* eslint-disable @next/next/no-img-element -- heritage stills from Wikimedia Commons */

import { useState } from "react";
import { JOURNEY, QA_LOG } from "@/lib/tour";
import { SIGHT_BY_ID } from "@/lib/sights";

export function Journey() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-5 pt-1">
      <header>
        <p className="text-[13px] text-ink-dim">16 Aug 2026 · Sigiriya</p>
        <h1 className="mt-1 font-serif text-[28px] leading-tight">
          Discovery journey
        </h1>
      </header>

      <ol className="relative space-y-4 pl-1">
        {JOURNEY.map((j, i) => (
          <li key={j.time} className="flex gap-3">
            <div className="flex w-10 flex-col items-center">
              <span className="text-[11px] text-sun">{j.time}</span>
              {i < JOURNEY.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-line" />
              )}
            </div>
            <div className="flex-1 overflow-hidden rounded-lg border border-line bg-obsidian">
              <img
                src={SIGHT_BY_ID[j.sight].src}
                alt={j.title}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-3">
              <p className="text-[14px]">{j.title}</p>
              <p className="mt-0.5 text-[12px] text-ink-dim">{j.detail}</p>
              {j.badge && (
                <span className="mt-2 inline-flex rounded-full border border-line px-2 py-0.5 text-[11px] text-sun">
                  Unlocked · {j.badge}
                </span>
              )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <section>
        <p className="label">Questions from the walk</p>
        <div className="mt-2 space-y-2">
          {QA_LOG.map((item, i) => (
            <button
              key={item.q}
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="block w-full rounded-lg border border-line bg-obsidian p-3 text-left"
            >
              <p className="text-[13px]">Q: {item.q}</p>
              {open === i && (
                <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
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
