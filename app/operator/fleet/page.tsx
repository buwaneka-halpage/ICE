import type { Metadata } from "next";
import { FleetRack } from "@/components/operator/fleet-rack";
import { FLEET, FLEET_COUNTS } from "@/lib/fleet";
import { FLEET_SIZE } from "@/lib/metrics";

export const metadata: Metadata = {
  title: "Fleet Telemetry — AISee Enterprise",
};

export default function FleetPage() {
  const hot = FLEET.filter((u) => u.tempC >= 35);
  const low = FLEET.filter((u) => u.status === "low-battery");

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <FleetRack />
      <div className="flex flex-col gap-3">
        <section className="panel p-4">
          <p className="label">Thermal watch</p>
          <h2 className="mt-1 text-[15px] tracking-tight">
            Units ≥ 35°C · {hot.length} of {FLEET_SIZE}
          </h2>
          <ul className="mt-3 divide-y divide-white/6">
            {hot.map((u) => (
              <li key={u.id} className="flex items-center justify-between py-2 text-[13px]">
                <span className="font-mono text-sun">{u.id}</span>
                <span className="text-ink-dim">
                  {u.tempC}°C · {u.battery}% · {u.language}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="panel p-4">
          <p className="label">Swap queue</p>
          <h2 className="mt-1 text-[15px] tracking-tight">
            Low battery · {low.length} · dock has {FLEET_COUNTS.docked} ready
          </h2>
          <ul className="mt-3 space-y-2">
            {low.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between rounded-lg border border-sun/20 bg-sun/5 px-3 py-2 text-[13px]"
              >
                <span className="font-mono">{u.id}</span>
                <span className="text-sun">{u.battery}% · Tour {u.tour}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
