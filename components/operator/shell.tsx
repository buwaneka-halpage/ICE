"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/mark";
import { FLEET_COUNTS } from "@/lib/fleet";
import { OPERATOR_SITE, TOUR_GROUPS } from "@/lib/tour";

const NAV = [
  { href: "/operator", label: "Live Operations", icon: "live" },
  { href: "/operator/fleet", label: "Fleet Telemetry", icon: "fleet" },
  { href: "/operator/quality", label: "Tour Quality & QA", icon: "qa" },
  { href: "/operator/revenue", label: "Revenue & HaaS ROI", icon: "roi" },
  { href: "/operator/content", label: "Content & AR Assets", icon: "ar" },
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

  const online = FLEET_COUNTS.deployed;
  const tours = TOUR_GROUPS.length;

  return (
    <div className="flex min-h-dvh bg-obsidian text-ink">
      <aside
        className={`sticky top-0 flex h-dvh shrink-0 flex-col border-r border-white/10 bg-surface transition-[width] duration-200 ${
          collapsed ? "w-[64px]" : "w-[232px]"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-3">
          {!collapsed && <Wordmark compact />}
          {collapsed && (
            <span className="mx-auto font-mono text-[10px] text-telemetry">AS</span>
          )}
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
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-white/6 text-ink"
                    : "text-ink-dim hover:bg-white/4 hover:text-ink"
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
        <div className="border-t border-white/10 p-2">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] text-ink-dim hover:bg-white/4 hover:text-ink"
          >
            <span className="font-mono text-[11px]">{collapsed ? "›" : "‹"}</span>
            {!collapsed && <span>Collapse</span>}
          </button>
          <Link
            href="/"
            className="mt-0.5 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] text-ink-dim hover:bg-white/4 hover:text-ink"
          >
            <span className="font-mono text-[11px]">↑</span>
            {!collapsed && <span>Portal hub</span>}
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-white/10 bg-obsidian/85 px-4 backdrop-blur-md">
          <div className="min-w-0">
            <Wordmark
              subtitle={`${OPERATOR_SITE.company} — ${OPERATOR_SITE.fleetLabel}`}
            />
          </div>
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-elevated px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-health shadow-[0_0_8px_#10B981]" />
              <span className="font-mono text-[11px] text-ink-dim">
                {tours} Active Tours
                <span className="mx-2 text-white/15">|</span>
                {online} Glasses Online
                <span className="mx-2 text-white/15">|</span>
                All Spatial Nodes Synced
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-lg border border-white/10 bg-elevated px-2.5 py-1.5 text-right md:block">
              <p className="font-mono text-[10px] text-telemetry">{clock} SLST</p>
              <p className="text-[11px] text-ink-dim">{OPERATOR_SITE.filter}</p>
            </div>
            <button
              type="button"
              onClick={() => setBroadcast(true)}
              className="rounded-lg border border-heritage/40 bg-heritage/15 px-3 py-1.5 text-[12px] font-medium text-sun hover:bg-heritage/25"
            >
              Emergency Broadcast
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-elevated py-1 pr-2.5 pl-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface font-mono text-[10px] text-sun">
                PM
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-[12px]">{OPERATOR_SITE.admin.name}</p>
                <p className="font-mono text-[10px] text-telemetry">
                  {OPERATOR_SITE.admin.role}
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>

      {broadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="panel w-full max-w-md p-5 shadow-2xl">
            <p className="label">Priority channel</p>
            <h2 className="mt-2 text-lg tracking-tight">Emergency Broadcast</h2>
            <p className="mt-1 text-[13px] text-ink-dim">
              Pushes to all 42 online glasses and three guide earpieces. Use for
              weather, medical, or site closure.
            </p>
            <textarea
              defaultValue="Hold position at current node. Storm cell west of Pidurangala — 18 min. Guides acknowledge."
              className="mt-4 h-24 w-full resize-none rounded-lg border border-white/10 bg-surface p-3 text-[13px] text-ink outline-none focus:border-sun/50"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setBroadcast(false)}
                className="rounded-lg px-3 py-1.5 text-[13px] text-ink-dim hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setBroadcast(false)}
                className="rounded-lg bg-heritage px-3 py-1.5 text-[13px] font-medium text-white"
              >
                Send to fleet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
