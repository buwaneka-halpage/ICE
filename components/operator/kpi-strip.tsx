import { Sparkline } from "@/components/ui/sparkline";
import { FLEET_COUNTS } from "@/lib/fleet";
import {
  ANCILLARY_MTD_USD,
  ANCILLARY_TARGET_USD,
  FLEET_SIZE,
  LANGUAGE_SHARE,
  QA_RATING_PCT,
  TRANSLATION_NON_ENGLISH_PCT,
  ancillaryProgressPct,
  utilizationPct,
} from "@/lib/metrics";
import { UTILIZATION_SPARK } from "@/lib/tour";

function Kpi({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="panel p-3.5">
      <p className="label">{label}</p>
      {children}
    </article>
  );
}

export function KpiStrip() {
  const util = utilizationPct(FLEET_COUNTS.deployed, FLEET_SIZE);
  const progress = ancillaryProgressPct(ANCILLARY_MTD_USD, ANCILLARY_TARGET_USD);

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <Kpi label="Active fleet utilization">
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl tracking-tight">
              {FLEET_COUNTS.deployed}
              <span className="text-ink-dim"> / {FLEET_SIZE}</span>
            </p>
            <p className="mt-0.5 text-[12px] text-ink-dim">
              Units deployed · {util}%
            </p>
          </div>
          <div className="text-right">
            <Sparkline values={UTILIZATION_SPARK} color="#F59E0B" />
            <p className="mt-1 font-mono text-[10px] text-telemetry">12h load</p>
          </div>
        </div>
      </Kpi>

      <Kpi label="Language translation load">
        <p className="mt-2 text-2xl tracking-tight">
          {TRANSLATION_NON_ENGLISH_PCT}%
          <span className="ml-2 text-sm font-normal text-ink-dim">
            Non-English stream
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(
            [
              ["German", LANGUAGE_SHARE.german, "#F59E0B"],
              ["Mandarin", LANGUAGE_SHARE.mandarin, "#0EA5E9"],
              ["Hindi", LANGUAGE_SHARE.hindi, "#10B981"],
              ["English Direct", LANGUAGE_SHARE.english, "#64748B"],
            ] as const
          ).map(([name, pct, color]) => (
            <span
              key={name}
              className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-ink-dim"
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
              {pct}% {name}
            </span>
          ))}
        </div>
      </Kpi>

      <Kpi label="Guide quality index">
        <div className="mt-2 flex items-end justify-between">
          <p className="text-2xl tracking-tight">{QA_RATING_PCT}%</p>
          <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-health/30 bg-health/10 px-2 py-0.5 font-mono text-[10px] text-health">
            <span className="h-1.5 w-1.5 rounded-full bg-health" />
            Tone & pacing optimal
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
          <div className="h-full rounded-full bg-health" style={{ width: `${QA_RATING_PCT}%` }} />
        </div>
      </Kpi>

      <Kpi label="Net ancillary revenue · MTD">
        <p className="mt-2 text-2xl tracking-tight">
          ${ANCILLARY_MTD_USD.toLocaleString("en-US")}
          <span className="ml-1.5 text-sm font-normal text-ink-dim">USD</span>
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-sun"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-telemetry">
            {progress}% of monthly breakeven
          </span>
        </div>
      </Kpi>
    </section>
  );
}
