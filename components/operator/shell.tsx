"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark, Wordmark } from "@/components/brand/mark";
import { ANCILLARY_MTD_USD } from "@/lib/metrics";
import { OPERATOR_SITE, TOUR_GROUPS } from "@/lib/tour";

const NAV = [
  { href: "/operator", label: "Briefing", icon: "live" },
  { href: "/operator/fleet", label: "Capacity", icon: "fleet" },
  { href: "/operator/quality", label: "Guest experience", icon: "qa" },
  { href: "/operator/revenue", label: "Unit economics", icon: "roi" },
  { href: "/operator/content", label: "Guest memories", icon: "ar" },
  { href: "/operator/settings", label: "Settings", icon: "gear" },
] as const;

function NavIcon({ name }: { name: (typeof NAV)[number]["icon"] }) {
  const common = "h-4 w-4";
  switch (name) {
    case "live":
      return (
        <svg viewBox="0 0 16 16" className={common} fill="none" aria-hidden>
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeOpacity="0.5" />
        </svg>
      );
    case "fleet":
      return (
        <svg viewBox="0 0 16 16" className={common} fill="none" aria-hidden>
          <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" />
          <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" />
          <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" />
        </svg>
      );
    case "qa":
      return (
        <svg viewBox="0 0 16 16" className={common} fill="none" aria-hidden>
          <path d="M2 10c2-4 4-6 6-6s4 2 6 6" stroke="currentColor" strokeLinecap="round" />
          <path d="M4 12h8" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "roi":
      return (
        <svg viewBox="0 0 16 16" className={common} fill="none" aria-hidden>
          <path d="M2 12 L6 7 L9 9 L14 3" stroke="currentColor" strokeLinejoin="round" />
          <path d="M14 3v3M14 3h-3" stroke="currentColor" strokeLinecap="round" />
        </svg>
      );
    case "ar":
      return (
        <svg viewBox="0 0 16 16" className={common} fill="none" aria-hidden>
          <path d="M3 5l5-2 5 2v6l-5 2-5-2V5z" stroke="currentColor" />
          <path d="M8 3v10M3 5l5 2 5-2" stroke="currentColor" strokeOpacity="0.6" />
        </svg>
      );
    case "gear":
      return (
        <svg viewBox="0 0 16 16" className={common} fill="none" aria-hidden>
          <circle cx="8" cy="8" r="2.2" stroke="currentColor" />
          <path
            d="M8 2.2v1.6M8 12.2v1.6M2.2 8h1.6M12.2 8h1.6M4 4l1.1 1.1M10.9 10.9L12 12M12 4l-1.1 1.1M5.1 10.9L4 12"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function OperatorShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [broadcast, setBroadcast] = useState(false);
  const [clock, setClock] = useState("14:32");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Colombo",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const paxToday = TOUR_GROUPS.reduce((n, g) => n + g.headcount, 0);
  const mtdK = `$${(ANCILLARY_MTD_USD / 1000).toFixed(1)}k`;

  return (
    <div className="flex min-h-dvh bg-obsidian text-ink">
      <aside
        className={`sticky top-0 flex h-dvh shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-200 ${
          collapsed ? "w-[64px]" : "w-[232px]"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-3">
          {!collapsed && <Wordmark compact />}
          {collapsed && <Mark className="mx-auto h-6 w-6 text-ink" />}
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {NAV.map((item) => {
            const active =
              item.href === "/operator"
                ? pathname === "/operator"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-elevated text-ink"
                    : "text-ink-dim hover:bg-elevated/70 hover:text-ink"
                }`}
              >
                <span className={active ? "text-sun" : "text-telemetry"}>
                  <NavIcon name={item.icon} />
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-ink-dim hover:bg-elevated hover:text-ink"
          >
            <span className="text-[11px]">{collapsed ? "›" : "‹"}</span>
            {!collapsed && <span>Collapse</span>}
          </button>
          <Link
            href="/"
            className="mt-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 text-[12px] text-ink-dim hover:bg-elevated hover:text-ink"
          >
            <span className="text-[11px]">↑</span>
            {!collapsed && <span>Portal hub</span>}
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-line bg-obsidian px-4">
          <div className="min-w-0">
            <Wordmark
              subtitle={`${OPERATOR_SITE.company} — ${OPERATOR_SITE.fleetLabel}`}
            />
          </div>
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-health" />
              <span className="text-[12px] text-ink-dim">
                {paxToday} guests · {mtdK} MTD · quality on plan
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-md border border-line bg-elevated px-2.5 py-1.5 text-right md:block">
              <p className="text-[11px] text-telemetry">{clock} SLST</p>
              <p className="text-[11px] text-ink-dim">{OPERATOR_SITE.filter}</p>
            </div>
            <button
              type="button"
              onClick={() => setBroadcast(true)}
              className="rounded-md bg-heritage px-3 py-1.5 text-[12px] font-medium text-white hover:bg-heritage/90"
            >
              Advisory
            </button>
            <div className="flex items-center gap-2 rounded-md border border-line bg-elevated py-1 pr-2.5 pl-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-surface text-[11px] text-sun">
                PM
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-[12px]">{OPERATOR_SITE.admin.name}</p>
                <p className="text-[11px] text-telemetry">
                  {OPERATOR_SITE.admin.role}
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>

      {broadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="panel w-full max-w-md p-5">
            <p className="label">Leadership channel</p>
            <h2 className="mt-1 font-serif text-lg tracking-tight">Property advisory</h2>
            <p className="mt-1 text-[13px] text-ink-dim">
              Goes to site managers and lead guides — not a public guest
              interrupt. Use for tomorrow’s yield, weather, or a site closure.
            </p>
            <textarea
              defaultValue="Hold position at current node. Storm cell west of Pidurangala — 18 min. Guides acknowledge."
              className="mt-4 h-24 w-full resize-none rounded-md border border-line bg-elevated p-3 text-[13px] text-ink outline-none focus:border-sun"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setBroadcast(false)}
                className="rounded-md px-3 py-1.5 text-[13px] text-ink-dim hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setBroadcast(false)}
                className="rounded-md bg-heritage px-3 py-1.5 text-[13px] font-medium text-white"
              >
                Issue advisory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
