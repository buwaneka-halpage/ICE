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
    feature: "Before/after memory slider",
    proof: "The consumer reason tourists pay a premium for the tour.",
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-obsidian">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <Mark className="h-7 w-7 text-ink" />
          <div>
            <p className="font-serif text-[20px] tracking-tight">See Mo</p>
            <p className="text-[12px] text-ink-dim">Sigiriya · August 2026</p>
          </div>
        </div>
        <p className="hidden text-[13px] text-ink-dim md:block">
          {TOUR_GROUPS.length} tours · {FLEET_COUNTS.deployed}/{FLEET_SIZE} glasses ·
          quality {QA_RATING_PCT}%
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        <section className="max-w-2xl pt-8 pb-12">
          <p className="label">Aitken Spence Travels · Central Province</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.12] tracking-tight md:text-5xl">
            See more of the walk. Remember more of the day.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-dim">
            Two surfaces, one system: a briefing for destination directors, and a
            pocket companion that turns the Sigiriya walk into a memory vault.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <PortalCard
            href="/operator"
            kicker="For leadership"
            title="Operator"
            body="Contribution, idle hardware, language demand, and which decision to take today."
            stats={[
              `$${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)} net / glass`,
              `Break-even month ${BREAK_EVEN_MONTH}`,
              "German FIT is the growth line",
            ]}
          />
          <PortalCard
            href="/companion"
            kicker="For guests"
            title="Companion"
            body="Live tour in the pocket, a vault of Sri Lanka’s heritage sites, and the day’s questions answered."
            stats={["Sigiriya, Dambulla, Kandy", "Anuradhapura · Polonnaruwa", "Galle Fort · Sri Pada"]}
          />
        </section>

        <section className="panel mt-14 overflow-hidden">
          <div className="border-b border-line px-5 py-3">
            <p className="label">What the screens prove</p>
          </div>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-line text-ink-dim">
                <th className="px-5 py-2 font-normal">Feature</th>
                <th className="px-5 py-2 font-normal">For judges / operators</th>
              </tr>
            </thead>
            <tbody>
              {PITCH.map((row) => (
                <tr key={row.feature} className="border-b border-line last:border-0">
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
      className="group panel block p-6 transition-colors hover:border-heritage/40"
    >
      <p className="label">{kicker}</p>
      <h2 className="mt-2 font-serif text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-dim">{body}</p>
      <ul className="mt-5 space-y-1.5 text-[13px] text-ink-dim">
        {stats.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="mt-6 text-[13px] text-sun group-hover:underline">Open →</p>
    </Link>
  );
}
