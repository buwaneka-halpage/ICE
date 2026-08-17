import Link from "next/link";
import { Mark } from "@/components/brand/mark";
import { FLEET_COUNTS } from "@/lib/fleet";
import {
  BREAK_EVEN_MONTH,
  FLEET_SIZE,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
  QA_RATING_PCT,
} from "@/lib/metrics";
import { TOUR_GROUPS } from "@/lib/tour";

const PITCH = [
  {
    feature: "Idle glasses as a P&L line",
    proof: "Directors see the monthly dollars left on the charger — not a 48-tile battery rack.",
  },
  {
    feature: "HaaS amortization & ROI",
    proof: `Operators see $${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)}/month net per glass after month ${BREAK_EVEN_MONTH}.`,
  },
  {
    feature: "Guest experience, not speech waveforms",
    proof: "Quality is a go/no-go for staffing — not a live WPM gauge.",
  },
  {
    feature: "Before/after AR memory slider",
    proof: "The consumer reason tourists pay a premium for the tour.",
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-obsidian">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <Mark className="h-7 w-7 text-ink" />
          <div>
            <p className="text-[15px] tracking-tight">AISee Travel</p>
            <p className="font-mono text-[10px] tracking-[0.16em] text-telemetry uppercase">
              Sigiriya operations · Aug 2026
            </p>
          </div>
        </div>
        <p className="hidden font-mono text-[11px] text-telemetry md:block">
          {TOUR_GROUPS.length} tours · {FLEET_COUNTS.deployed}/{FLEET_SIZE} glasses · QA{" "}
          {QA_RATING_PCT}%
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="max-w-3xl pt-10 pb-12">
          <p className="label">Destination management · AR fleet</p>
          <h1 className="mt-4 text-4xl leading-[1.1] tracking-tight md:text-5xl">
            Editorial operations for a live heritage site — not another neon dashboard.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-dim">
            Two surfaces, one system: a B2B console for Aitken Spence Travels, and a
            tourist companion that turns the Sigiriya walk into a memory vault.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <PortalCard
            href="/operator"
            kicker="B2B · leadership"
            title="Operator Portal"
            body="A briefing for destination directors: contribution, idle hardware, language demand, and which decision to take today."
            stats={[
              `$${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)} net / glass`,
              `Break-even month ${BREAK_EVEN_MONTH}`,
              "German FIT is the growth line",
            ]}
          />
          <PortalCard
            href="/companion"
            kicker="Guest · mobile"
            title="Tourist Companion"
            body="In-pocket live tour, a vault of Sri Lanka’s heritage sites, and the day’s knowledge graph — default dark, golden-hour light."
            stats={["Sigiriya, Dambulla, Kandy", "Anuradhapura · Polonnaruwa", "Galle Fort · Sri Pada"]}
          />
        </section>

        <section className="mt-14 overflow-hidden rounded-xl border border-white/10">
          <div className="border-b border-white/10 px-5 py-3">
            <p className="label">What the dashboards prove</p>
          </div>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/10 font-mono text-[10px] tracking-[0.12em] text-telemetry uppercase">
                <th className="px-5 py-2 font-normal">Feature</th>
                <th className="px-5 py-2 font-normal">For judges / operators</th>
              </tr>
            </thead>
            <tbody>
              {PITCH.map((row) => (
                <tr key={row.feature} className="border-b border-white/6 last:border-0">
                  <td className="px-5 py-3 text-sun">{row.feature}</td>
                  <td className="px-5 py-3 text-ink-dim">{row.proof}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function PortalCard({
  href,
  kicker,
  title,
  body,
  stats,
}: {
  href: string;
  kicker: string;
  title: string;
  body: string;
  stats: string[];
}) {
  return (
    <Link
      href={href}
      className="group panel block p-6 transition-colors hover:border-white/20"
    >
      <p className="label">{kicker}</p>
      <h2 className="mt-3 text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-dim">{body}</p>
      <ul className="mt-5 space-y-1.5 font-mono text-[11px] text-telemetry">
        {stats.map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-sun" />
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[13px] text-sun group-hover:underline">Open →</p>
    </Link>
  );
}
