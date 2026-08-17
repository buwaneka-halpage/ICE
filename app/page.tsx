import Link from "next/link";
import { Mark } from "@/components/brand/mark";

export default function Home() {
  return (
    <div className="min-h-dvh bg-obsidian">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <Mark className="h-7 w-7 text-ink" />
          <div>
            <p className="font-serif text-[20px] tracking-tight">See Mo</p>
            <p className="text-[12px] text-ink-dim">Aitken Spence Travels · Sigiriya</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        <section className="max-w-2xl pt-8 pb-12">
          <p className="label">Glasses as a $5 ancillary. Paid back inside a season.</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.12] tracking-tight md:text-5xl">
            See more of the walk. Remember more of the day.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-dim">
            A briefing for destination directors, and a pocket companion for the
            guest. Same fleet, same day at Sigiriya.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <PortalCard
            href="/operator"
            kicker="Start here with investors"
            title="Operator"
            body="Contribution, idle hardware as a P&L line, language demand, and which decision to take today."
          />
          <PortalCard
            href="/companion"
            kicker="Then the guest"
            title="Companion"
            body="Live tour at Fountain #3, a before/after of the water gardens, and the photos from this morning’s walk."
          />
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
}: {
  href: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group panel block p-6 transition-colors hover:border-heritage/40"
    >
      <p className="label">{kicker}</p>
      <h2 className="mt-2 font-serif text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-dim">{body}</p>
      <p className="mt-6 text-[13px] text-sun group-hover:underline">Open →</p>
    </Link>
  );
}
