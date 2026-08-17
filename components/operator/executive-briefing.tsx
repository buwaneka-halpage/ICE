"use client";

import { LiveCaptures } from "@/components/media/live-captures";
import { RoiTracker } from "@/components/operator/roi-tracker";
import { useDemoDecisions } from "@/components/operator/use-demo-decisions";
import { Sparkline } from "@/components/ui/sparkline";
import { SCENARIO_LABEL } from "@/lib/demo";
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
} from "@/lib/metrics";
import { TOUR_GROUPS, UTILIZATION_SPARK } from "@/lib/tour";

const pax = TOUR_GROUPS.reduce((n, g) => n + g.headcount, 0);
const progress = ancillaryProgressPct(ANCILLARY_MTD_USD, ANCILLARY_TARGET_USD);

export function ExecutiveBriefing() {
  const {
    surge,
    roster,
    approveSurge,
    requestRoster,
    reset,
    docked,
    deployed,
    util,
    idleUsd,
  } = useDemoDecisions();

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label">
            {SCENARIO_LABEL}
            {(surge || roster) && (
              <>
                {" · "}
                <button type="button" onClick={reset} className="underline-offset-2 hover:underline">
                  Reset
                </button>
              </>
            )}
          </p>
          <h1 className="mt-1 font-serif text-2xl tracking-tight">Sigiriya · what to decide today</h1>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-dim">
            {pax} guests on property, {deployed} glasses earning.
            Quality is not the constraint — spare hardware and German coverage are.
          </p>
        </div>
        <p className="text-[13px] text-health">On plan · no safety flags</p>
      </header>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Insight
          label="Contribution this month"
          value={`$${ANCILLARY_MTD_USD.toLocaleString("en-US")}`}
          note={`${progress}% of monthly breakeven`}
          bar={progress}
          color="#C45C26"
        />
        <Insight
          label="Hardware paying its way"
          value={`${util}%`}
          note={
            surge
              ? `${deployed} of ${FLEET_SIZE} on tour · surge approved`
              : `${deployed} of ${FLEET_SIZE} units on tour`
          }
          spark
        />
        <Insight
          label="Guest experience"
          value={`${QA_RATING_PCT}%`}
          note="Hold the standard — do not add QA headcount"
          bar={QA_RATING_PCT}
          color="#3D6B47"
        />
        <Insight
          label="Payback already cleared"
          value={`M${BREAK_EVEN_MONTH}`}
          note={`$${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)} net / glass / month`}
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <article className="panel p-5">
          <p className="text-[13px] text-sun">Capacity · September</p>
          <h2 className="mt-2 font-serif text-[18px] tracking-tight">
            {surge
              ? "Approved — 6 units to the German FIT block"
              : "Release the 6 docked glasses into the German FIT block"}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            {surge
              ? `Utilization is ${util}%. Bus #04 is empty. The ~$${Math.round(MONTHLY_NET_PROFIT_PER_GLASS_USD * FLEET_COUNTS.docked)}/month that was sitting on the charger is back on heads.`
              : `Utilization is ${util}% with ${docked} units idle on Bus #04. At the current $${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)} net per glass, leaving them docked forgoes ~$${idleUsd}/month through high season.`}
          </p>
          {surge ? (
            <p className="mt-4 inline-flex rounded-md bg-health/15 px-3 py-1.5 text-[12px] text-health">
              Surge deployed
            </p>
          ) : (
            <button
              type="button"
              onClick={approveSurge}
              className="mt-4 rounded-md bg-heritage px-3 py-1.5 text-[12px] font-medium text-white hover:bg-heritage/90"
            >
              Approve surge deployment
            </button>
          )}
        </article>
        <article className="panel p-5">
          <p className="text-[13px] text-signal">Demand mix</p>
          <h2 className="mt-2 font-serif text-[18px] tracking-tight">
            {roster
              ? "Roster request sent — German-speaking guide, week 35"
              : "Staff one extra German-speaking guide before week 35"}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            {LANGUAGE_SHARE.german}% of today’s stream is German — the largest non-English cohort.
            Mandarin is second at {LANGUAGE_SHARE.mandarin}%. English-direct is only{" "}
            {LANGUAGE_SHARE.english}%.
          </p>
          {roster ? (
            <p className="mt-4 inline-flex rounded-md bg-health/15 px-3 py-1.5 text-[12px] text-health">
              Requested
            </p>
          ) : (
            <button
              type="button"
              onClick={requestRoster}
              className="mt-4 rounded-md border border-line px-3 py-1.5 text-[12px] text-ink hover:bg-surface"
            >
              Open roster request
            </button>
          )}
        </article>
      </section>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <RoiTracker />
        <section className="panel p-4">
          <p className="label">Who is buying the surcharge</p>
          <h2 className="mt-1 font-serif text-[17px] tracking-tight">Language mix · market signal</h2>
          <ul className="mt-4 space-y-3">
            {(
              [
                ["German FIT", LANGUAGE_SHARE.german, "#C45C26"],
                ["Mandarin groups", LANGUAGE_SHARE.mandarin, "#3F5C56"],
                ["Hindi / subcontinent", LANGUAGE_SHARE.hindi, "#3D6B47"],
                ["English direct", LANGUAGE_SHARE.english, "#6B6258"],
              ] as const
            ).map(([name, pct, color]) => (
              <li key={name}>
                <div className="flex justify-between text-[13px]">
                  <span>{name}</span>
                  <span className="text-ink-dim">{pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
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

      <section className="panel p-5">
        <p className="label">Where this goes next</p>
        <h2 className="mt-1 font-serif text-[18px] tracking-tight">Same $5, same DMC motion</h2>
        <ol className="mt-3 space-y-2 text-[13px] leading-relaxed text-ink-dim">
          <li>
            <span className="text-ink">Sigiriya</span> — 48 glasses, this season. The wedge.
          </li>
          <li>
            <span className="text-ink">Cultural Triangle</span> — Dambulla, Polonnaruwa,
            Anuradhapura. Same buses, next sites.
          </li>
          <li>
            <span className="text-ink">Galle Fort</span> — southern circuit. Same surcharge,
            same operator playbook.
          </li>
        </ol>
      </section>

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
      <p className="mt-2 font-serif text-2xl tracking-tight">{value}</p>
      <p className="mt-1 text-[12px] text-ink-dim">{note}</p>
      {spark && (
        <div className="mt-3">
          <Sparkline values={UTILIZATION_SPARK} color="#C45C26" />
        </div>
      )}
      {bar != null && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full"
            style={{ width: `${Math.min(100, bar)}%`, background: color }}
          />
        </div>
      )}
    </article>
  );
}
