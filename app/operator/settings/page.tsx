import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — AISee Enterprise",
};

const TOGGLES = [
  { k: "Auto-swap glasses below 15% battery", on: true },
  { k: "Wandering alert at 40 m from group centroid", on: true },
  { k: "Push QA flags to guide earpiece", on: true },
  { k: "Allow guest language self-select", on: true },
  { k: "Store spatial audio clips in Memory Vault", on: true },
  { k: "Share telemetry with Aitken Spence HQ", on: false },
];

export default function SettingsPage() {
  return (
    <div className="grid max-w-3xl gap-3">
      <section className="panel p-4">
        <p className="label">Fleet policy</p>
        <h2 className="mt-1 text-[15px] tracking-tight">Central Province defaults</h2>
        <ul className="mt-4 divide-y divide-white/6">
          {TOGGLES.map((t) => (
            <li key={t.k} className="flex items-center justify-between py-3 text-[13px]">
              <span>{t.k}</span>
              <span
                className={`relative h-5 w-9 rounded-full ${
                  t.on ? "bg-health/80" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white ${
                    t.on ? "right-0.5" : "left-0.5"
                  }`}
                />
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="panel p-4">
        <p className="label">Broadcast templates</p>
        <div className="mt-3 space-y-2 text-[13px] text-ink-dim">
          <p className="rounded-lg border border-white/10 bg-surface px-3 py-2">
            Weather hold — Pidurangala cell
          </p>
          <p className="rounded-lg border border-white/10 bg-surface px-3 py-2">
            Medical — request site first-aid to Lion terrace
          </p>
          <p className="rounded-lg border border-white/10 bg-surface px-3 py-2">
            Close fresco pocket — occupancy cap reached
          </p>
        </div>
      </section>
    </div>
  );
}
