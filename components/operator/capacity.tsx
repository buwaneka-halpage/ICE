"use client";

import { useDemoDecisions } from "@/components/operator/use-demo-decisions";
import { SCENARIO_LABEL } from "@/lib/demo";
import { FLEET_COUNTS } from "@/lib/fleet";
import {
  FLEET_SIZE,
  LANGUAGE_SHARE,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
} from "@/lib/metrics";

export function CapacityView() {
  const { surge, docked, deployed, util, idleUsd } = useDemoDecisions();

  return (
    <div className="grid max-w-4xl gap-3">
      <section className="panel p-5">
        <p className="label">{SCENARIO_LABEL}</p>
        <h1 className="mt-1 font-serif text-2xl tracking-tight">
          {util}% of the fleet is earning. {docked} glasses are not.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-dim">
          {surge
            ? "The idle six are on the German FIT block. Spare hardware on Bus #04 is no longer a commercial leak."
            : `Spare hardware on Bus #04 is a commercial choice, not a technical one. At the current run-rate those ${docked} units are worth about $${idleUsd} a month if they go back on heads.`}
        </p>
        <dl className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
          <div className="rounded-md border border-line bg-surface p-3">
            <dt className="text-[12px] text-telemetry">On tour</dt>
            <dd className="mt-1 font-serif text-xl">{deployed}</dd>
          </div>
          <div className="rounded-md border border-line bg-surface p-3">
            <dt className="text-[12px] text-telemetry">Idle / charged</dt>
            <dd className="mt-1 font-serif text-xl text-sun">{docked}</dd>
          </div>
          <div className="rounded-md border border-line bg-surface p-3">
            <dt className="text-[12px] text-telemetry">Low-battery swaps</dt>
            <dd className="mt-1 font-serif text-xl">{FLEET_COUNTS.lowBattery}</dd>
          </div>
        </dl>
      </section>
      <section className="panel p-5">
        <p className="label">Decision</p>
        <h2 className="mt-1 font-serif text-[18px] tracking-tight">
          {surge
            ? "Six units released to the German FIT wave in week 35"
            : "Commit the idle six to the German FIT wave in week 35"}
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
          {LANGUAGE_SHARE.german}% of today’s language stream is German. Those
          guests already pay the surcharge. Field can absorb six more units
          without a new bus
          {surge ? "." : ` — about $${Math.round(MONTHLY_NET_PROFIT_PER_GLASS_USD * (FLEET_SIZE - deployed))} a month.`}
        </p>
      </section>
    </div>
  );
}
