import type { Metadata } from "next";
import { FLEET_COUNTS } from "@/lib/fleet";
import {
  FLEET_SIZE,
  LANGUAGE_SHARE,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
  utilizationPct,
} from "@/lib/metrics";

export const metadata: Metadata = {
  title: "Capacity — AISee Enterprise",
};

export default function FleetPage() {
  const util = utilizationPct(FLEET_COUNTS.deployed, FLEET_SIZE);
  const idle = FLEET_COUNTS.docked;
  const idleUsd = Math.round(MONTHLY_NET_PROFIT_PER_GLASS_USD * idle);

  return (
    <div className="grid max-w-4xl gap-3">
      <section className="panel p-5">
        <p className="label">Capacity</p>
        <h1 className="mt-1 text-2xl tracking-tight">
          {util}% of the fleet is earning. {idle} glasses are not.
        </h1>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-dim">
          Spare hardware on Bus #04 is a commercial choice, not a technical one.
          At the current run-rate those {idle} units are worth about ${idleUsd} a
          month if they go back on heads.
        </p>
        <dl className="mt-5 grid grid-cols-3 gap-3 text-[13px]">
          <div className="rounded-lg border border-white/10 bg-surface p-3">
            <dt className="font-mono text-[10px] text-telemetry">On tour</dt>
            <dd className="mt-1 text-xl">{FLEET_COUNTS.deployed}</dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface p-3">
            <dt className="font-mono text-[10px] text-telemetry">Idle / charged</dt>
            <dd className="mt-1 text-xl text-sun">{idle}</dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface p-3">
            <dt className="font-mono text-[10px] text-telemetry">Low-battery swaps</dt>
            <dd className="mt-1 text-xl">{FLEET_COUNTS.lowBattery}</dd>
          </div>
        </dl>
      </section>
      <section className="panel p-5">
        <p className="label">Decision</p>
        <h2 className="mt-1 text-[17px] tracking-tight">
          Commit the idle six to the German FIT wave in week 35
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
          {LANGUAGE_SHARE.german}% of today’s language stream is German. Those
          guests already pay the surcharge. Field can absorb six more units
          without a new bus.
        </p>
      </section>
    </div>
  );
}
