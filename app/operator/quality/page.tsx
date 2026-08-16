import type { Metadata } from "next";
import { SpeechQa } from "@/components/operator/speech-qa";
import { QA_RATING_PCT } from "@/lib/metrics";
import { QA_FLAGS_TODAY, TOUR_GROUPS } from "@/lib/tour";

export const metadata: Metadata = {
  title: "Tour Quality — AISee Enterprise",
};

const GUIDES = [
  { name: "Chaminda K.", score: 99.1, tours: 18, note: "Hydraulic sequence complete" },
  { name: "Ruwan P.", score: 97.8, tours: 14, note: "Mirror Wall poems covered" },
  { name: "Nimali S.", score: 98.2, tours: 11, note: "Lion Gate safety brief hit" },
];

export default function QualityPage() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <SpeechQa />
      <section className="panel p-4">
        <p className="label">Guide roster · today</p>
        <h2 className="mt-1 text-[15px] tracking-tight">
          Fleet QA {QA_RATING_PCT}% · {QA_FLAGS_TODAY} incident flags
        </h2>
        <ul className="mt-4 space-y-2">
          {GUIDES.map((g) => (
            <li
              key={g.name}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-surface px-3 py-3"
            >
              <div>
                <p className="text-[14px]">{g.name}</p>
                <p className="text-[12px] text-ink-dim">{g.note}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[13px] text-health">{g.score}%</p>
                <p className="font-mono text-[10px] text-telemetry">{g.tours} pax</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] text-ink-dim">
          Flags trigger if a mandatory safety note is skipped. Mandatory set:
          lion terrace edge, wasp nesting, and summit wind shear.
        </p>
        <div className="mt-4 rounded-lg border border-white/10 p-3">
          <p className="label">Active tours</p>
          <ul className="mt-2 space-y-1 text-[13px] text-ink-dim">
            {TOUR_GROUPS.map((t) => (
              <li key={t.id}>
                {t.guide} — {t.location} ({t.wpm} WPM)
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
