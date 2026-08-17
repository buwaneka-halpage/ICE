import type { Metadata } from "next";
import { RoiTracker } from "@/components/operator/roi-tracker";
import { FLEET_COUNTS } from "@/lib/fleet";
import {
  ANCILLARY_MTD_USD,
  BREAK_EVEN_MONTH,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
} from "@/lib/metrics";

export const metadata: Metadata = {
  title: "Revenue & HaaS ROI — See Mo",
};

const LINES = [
  { label: "Rental surcharge ($5)", amount: 3120, share: 73 },
  { label: "Photo reel export", amount: 740, share: 17 },
  { label: "Memory vault unlock", amount: 420, share: 10 },
];

export default function RevenuePage() {
  const monthlyFleet =
    Math.round(MONTHLY_NET_PROFIT_PER_GLASS_USD * FLEET_COUNTS.deployed * 100) /
    100;

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <RoiTracker />
      <section className="panel p-4">
        <p className="label">Ancillary mix · August 2026</p>
        <h2 className="mt-1 font-serif text-[17px] tracking-tight">
          ${ANCILLARY_MTD_USD.toLocaleString("en-US")} MTD
        </h2>
        <ul className="mt-4 space-y-3">
          {LINES.map((l) => (
            <li key={l.label}>
              <div className="flex justify-between text-[13px]">
                <span>{l.label}</span>
                <span className="text-ink-dim">
                  ${l.amount.toLocaleString("en-US")}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-sun"
                  style={{ width: `${l.share}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-md border border-line bg-surface p-3">
            <p className="text-[12px] text-telemetry">Per-glass run-rate</p>
            <p className="font-serif text-xl">${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-line bg-surface p-3">
            <p className="text-[12px] text-telemetry">
              {FLEET_COUNTS.deployed} units deployed
            </p>
            <p className="font-serif text-xl">${monthlyFleet.toLocaleString("en-US")}</p>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-ink-dim">
          Break-even at month {BREAK_EVEN_MONTH} is the operator pitch: capex is
          recovered inside a single high season.
        </p>
      </section>
    </div>
  );
}
