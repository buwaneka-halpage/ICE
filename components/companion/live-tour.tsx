"use client";

/* eslint-disable @next/next/no-img-element -- local demo stills; native img is enough */

import { useState } from "react";
import { COMPANION } from "@/lib/tour";

const LANGS = ["English", "Deutsch", "中文", "Français"] as const;

const COPY = {
  English: {
    connected: "Glasses connected",
    isolation: "Guide voice isolation",
    looking: "Looking at",
    title: "Western Water Gardens (Fountain #3)",
    body: "A gravity-fed fountain head. Conduits under the limestone still hold the original fall line.",
    prompts: [
      "How did the hydraulics work?",
      "Show ancient water level",
      "Simplify explanation",
    ],
    replies: [
      "Gravity-fed cisterns on the upper terraces pressurised limestone conduits. Fountain #3 sits 1.4 m below the supply line — enough head to jet without a pump.",
      "The overlay shows water 42 cm above the dry basin. The rill still holds the original fall line.",
      "The gardens used downhill water pressure. No motors — just height, stone pipes, and careful levels.",
    ],
  },
  Deutsch: {
    connected: "Brille verbunden",
    isolation: "Stimme des Guides isolieren",
    looking: "Blick auf",
    title: "Westliche Wassergärten (Brunnen #3)",
    body: "Ein schwerkraftbetriebener Brunnenkopf. Die Leitungen unter dem Kalkstein folgen noch der ursprünglichen Falllinie.",
    prompts: [
      "Wie funktionierte die Hydraulik?",
      "Alten Wasserstand zeigen",
      "Einfacher erklären",
    ],
    replies: [
      "Zisternen auf den oberen Terrassen setzten die Kalksteinleitungen unter Druck. Brunnen #3 liegt 1,4 m unter der Zulaufleitung — genug Gefälle, um ohne Pumpe zu sprudeln.",
      "Die Überlagerung zeigt Wasser 42 cm über dem trockenen Becken. Die Rinne hält noch die originale Falllinie.",
      "Die Gärten nutzten nur Gefälle. Keine Motoren — Höhe, Steinrohre, genaue Niveaus.",
    ],
  },
  中文: {
    connected: "眼镜已连接",
    isolation: "导览语音隔离",
    looking: "正在看",
    title: "西苑水花园（3号喷泉）",
    body: "重力供水的喷泉头。石灰岩下的管道仍保持原来的落差线。",
    prompts: ["水力系统如何运作？", "显示古代水位", "说得简单些"],
    replies: [
      "上层台地的蓄水池给石灰岩管道加压。3号喷泉低于供水管 1.4 米，落差足以不用泵喷水。",
      "叠层显示水面比干池高出 42 厘米。水槽仍是原来的落差线。",
      "花园只用高差。没有马达——高度、石管、仔细找平。",
    ],
  },
  Français: {
    connected: "Lunettes connectées",
    isolation: "Isoler la voix du guide",
    looking: "Regarde",
    title: "Jardins d’eau de l’ouest (fontaine n° 3)",
    body: "Une tête de fontaine alimentée par gravité. Les conduits sous le calcaire suivent encore la ligne de pente d’origine.",
    prompts: [
      "Comment fonctionnait l’hydraulique ?",
      "Montrer le niveau d’eau antique",
      "Expliquer plus simplement",
    ],
    replies: [
      "Des citernes sur les terrasses hautes mettaient les conduits sous pression. La fontaine n° 3 est 1,4 m sous la ligne d’alimentation — assez de charge pour jaillir sans pompe.",
      "La superposition montre l’eau 42 cm au-dessus du bassin à sec. Le rigole garde la pente d’origine.",
      "Les jardins n’utilisaient que la pente. Pas de moteur — la hauteur, des tuyaux de pierre, des niveaux soignés.",
    ],
  },
} as const;

export function LiveTour() {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("Deutsch");
  const [isolation, setIsolation] = useState(true);
  const [prompt, setPrompt] = useState<number | null>(null);
  const copy = COPY[lang];

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
          src="/demo/fountain-today.jpg"
          alt="Sigiriya water gardens, looking toward Lion Rock"
          className="aspect-[16/10] w-full object-cover"
        />
        <figcaption className="px-3 py-2 text-[12px] text-ink-dim">
          Water gardens · looking east to Lion Rock
        </figcaption>
      </figure>

      <section className="rounded-lg border border-line bg-obsidian p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium">{copy.connected}</p>
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
              onClick={() => {
                setLang(l);
                setPrompt(null);
              }}
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
          <span>{copy.isolation}</span>
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
        <p className="text-[13px] text-ink-dim">{copy.looking}</p>
        <h2 className="mt-1 font-serif text-[22px] leading-snug">{copy.title}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">{copy.body}</p>
        <div className="mt-4 flex flex-col gap-2">
          {copy.prompts.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => setPrompt(i)}
              className={`rounded-md border px-3 py-2.5 text-left text-[13px] ${
                prompt === i ? "border-heritage bg-elevated" : "border-line bg-elevated"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        {prompt != null && (
          <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">
            {copy.replies[prompt]}
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
