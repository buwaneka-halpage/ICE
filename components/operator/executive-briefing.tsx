import { LiveCaptures } from "@/components/media/live-captures";
import { RoiTracker } from "@/components/operator/roi-tracker";
import { Sparkline } from "@/components/ui/sparkline";
import { FLEET_COUNTS } from "@/lib/fleet";
import {
  ANCILLARY_MTD_USD,
  ANCILLARY_TARGET_USD,
  BREAK_EVEN_MONTH,
  FLEET_SIZE,
  LANGUAGE_SHARE,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
  QA_RATING_PCT,
  ancillaryProgressPct,
  utilizationPct,
} from "@/lib/metrics";
import { TOUR_GROUPS, UTILIZATION_SPARK } from "@/lib/tour";

const pax = TOUR_GROUPS.reduce((n, g) => n + g.headcount, 0);
const util = utilizationPct(FLEET_COUNTS.deployed, FLEET_SIZE);
const progress = ancillaryProgressPct(ANCILLARY_MTD_USD, ANCILLARY_TARGET_USD);
const idleValue = Math.round(MONTHLY_NET_PROFIT_PER_GLASS_USD * FLEET_COUNTS.docked);

const DECISIONS = [
  {
    tone: "sun" as const,
    kicker: "Capacity · September",
    title: "Release the 6 docked glasses into the German FIT block",
    body: `Utilization is ${util}% with ${FLEET_COUNTS.docked} units idle on Bus #04. At the current $${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)} net per glass, leaving them docked forgoes ~$${idleValue}/month through high season.`,
    action: "Approve surge deployment",
  },
  {
    tone: "signal" as const,
    kicker: "Demand mix",
    title: "Staff one extra German-speaking guide before week 35",
    body: `${LANGUAGE_SHARE.german}% of today’s stream is German — the largest non-English cohort. Mandarin is second at ${LANGUAGE_SHARE.mandarin}%. English-direct is only ${LANGUAGE_SHARE.english}%.`,
    action: "Open roster request",
  },
];

export function ExecutiveBriefing() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label">Executive briefing</p>
          <h1 className="mt-1 text-2xl tracking-tight">Sigiriya · what to decide today</h1>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-dim">
            {pax} guests on property, {FLEET_COUNTS.deployed} glasses earning.
            Quality is not the constraint — spare hardware and German coverage are.
          </p>
        </div>
        <p className="font-mono text-[11px] text-health">On plan · no safety flags</p>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Insight
          label="Contribution this month"
          value={`$${ANCILLARY_MTD_USD.toLocaleString("en-US")}`}
          note={`${progress}% of monthly breakeven`}
          bar={progress}
          color="#F59E0B"
        />
        <Insight
          label="Hardware paying its way"
          value={`${util}%`}
          note={`${FLEET_COUNTS.deployed} of ${FLEET_SIZE} units on tour`}
          spark
        />
        <Insight
          label="Guest experience"
          value={`${QA_RATING_PCT}%`}
          note="Hold the standard — do not add QA headcount"
          bar={QA_RATING_PCT}
          color="#10B981"
        />
        <Insight
          label="Payback already cleared"
          value={`M${BREAK_EVEN_MONTH}`}
          note={`$${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)} net / glass / month`}
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        {DECISIONS.map((d) => (
          <article key={d.title} className="panel p-5">
            <p
              className={`font-mono text-[10px] tracking-[0.14em] uppercase ${
                d.tone === "sun" ? "text-sun" : "text-signal"
              }`}
            >
              {d.kicker}
            </p>
            <h2 className="mt-2 text-[17px] tracking-tight">{d.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">{d.body}</p>
            <p className="mt-4 inline-flex rounded-lg border border-white/10 px-3 py-1.5 text-[12px] text-ink-dim">
              {d.action}
            </p>
          </article>
        ))}
      </section>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <RoiTracker />
        <section className="panel p-4">
          <p className="label">Who is buying the surcharge</p>
          <h2 className="mt-1 text-[15px] tracking-tight">Language mix · market signal</h2>
          <ul className="mt-4 space-y-3">
            {(
              [
                ["German FIT", LANGUAGE_SHARE.german, "#F59E0B"],
                ["Mandarin groups", LANGUAGE_SHARE.mandarin, "#0EA5E9"],
                ["Hindi / subcontinent", LANGUAGE_SHARE.hindi, "#10B981"],
                ["English direct", LANGUAGE_SHARE.english, "#64748B"],
              ] as const
            ).map(([name, pct, color]) => (
              <li key={name}>
                <div className="flex justify-between text-[13px]">
                  <span>{name}</span>
                  <span className="font-mono text-ink-dim">{pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/6">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-dim">
            Translation load is a revenue line, not an IT metric: non-English guests
            are the ones paying the $5 glasses surcharge.
          </p>
        </section>
      </div>

      <LiveCaptures layout="strip" />
    </div>
  );
}

function Insight({
  label,
  value,
  note,
  bar,
  color,
  spark,
}: {
  label: string;
  value: string;
  note: string;
  bar?: number;
  color?: string;
  spark?: boolean;
}) {
  return (
    <article className="panel p-4">
      <p className="label">{label}</p>
      <p className="mt-2 text-2xl tracking-tight">{value}</p>
      <p className="mt-1 text-[12px] text-ink-dim">{note}</p>
      {spark && (
        <div className="mt-3">
          <Sparkline values={UTILIZATION_SPARK} color="#F59E0B" />
        </div>
      )}
      {bar != null && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(100, bar)}%`, background: color }}
          />
        </div>
      )}
    </article>
  );
}
