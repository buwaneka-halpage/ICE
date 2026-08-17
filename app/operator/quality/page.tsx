import type { Metadata } from "next";
import { QA_RATING_PCT } from "@/lib/metrics";
import { QA_FLAGS_TODAY, TOUR_GROUPS } from "@/lib/tour";

export const metadata: Metadata = {
  title: "Guest experience — AISee Enterprise",
};

const GUIDES = [
  { name: "Chaminda K.", score: 99.1, pax: 18, note: "Highest repeat intent on hydraulic stories" },
  { name: "Ruwan P.", score: 97.8, pax: 14, note: "Mirror Wall verse coverage complete" },
  { name: "Nimali S.", score: 98.2, pax: 11, note: "Safety brief hit; no flags" },
];

export default function QualityPage() {
  const pax = TOUR_GROUPS.reduce((n, g) => n + g.headcount, 0);

  return (
    <div className="grid max-w-4xl gap-3">
      <section className="panel p-5">
        <p className="label">Guest experience</p>
        <h1 className="mt-1 text-2xl tracking-tight">
          {QA_RATING_PCT}% quality · {QA_FLAGS_TODAY} incidents · {pax} guests
        </h1>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-dim">
          Experience is holding. Do not spend on extra QA staff this month —
          the constraint is German-speaking coverage and idle glasses, not
          tone or pacing.
        </p>
      </section>
      <section className="panel p-5">
        <p className="label">Guide contribution</p>
        <ul className="mt-3 divide-y divide-white/6">
          {GUIDES.map((g) => (
            <li key={g.name} className="flex items-center justify-between py-3">
              <div>
                <p className="text-[14px]">{g.name}</p>
                <p className="text-[12px] text-ink-dim">{g.note}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[13px] text-health">{g.score}%</p>
                <p className="font-mono text-[10px] text-telemetry">{g.pax} pax</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
