"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const TABS = [
  { href: "/companion", label: "Live", icon: "live" },
  { href: "/companion/vault", label: "Vault", icon: "vault" },
  { href: "/companion/journey", label: "Journey", icon: "path" },
] as const;

export function CompanionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [evening, setEvening] = useState(false);

  return (
    <div className={`min-h-dvh bg-obsidian text-ink ${evening ? "theme-evening" : ""}`}>
        <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col md:max-w-[400px] md:py-8">
          <div className="flex min-h-dvh flex-1 flex-col overflow-hidden border-line bg-elevated md:min-h-0 md:rounded-[28px] md:border md:shadow-[0_24px_60px_rgba(28,24,20,0.12)]">
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <Link href="/" className="font-serif text-[18px] tracking-tight">
                See Mo
              </Link>
              <button
                type="button"
                onClick={() => setEvening((v) => !v)}
                className="rounded-full border border-line px-2.5 py-1 text-[12px] text-ink-dim"
              >
                {evening ? "Day" : "Evening"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-24">{children}</div>
            <nav className="sticky bottom-0 grid grid-cols-3 border-t border-line bg-elevated px-2 py-2">
              {TABS.map((t) => {
                const active =
                  t.href === "/companion"
                    ? pathname === "/companion"
                    : pathname.startsWith(t.href);
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`flex flex-col items-center gap-1 rounded-lg py-2 text-[11px] ${
                      active ? "text-sun" : "text-ink-dim"
                    }`}
                  >
                    <TabIcon name={t.icon} />
                    {t.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
  );
}

function TabIcon({ name }: { name: (typeof TABS)[number]["icon"] }) {
  const c = "h-4 w-4";
  if (name === "live")
    return (
      <svg viewBox="0 0 16 16" className={c} fill="none" aria-hidden>
        <circle cx="8" cy="8" r="3" stroke="currentColor" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      </svg>
    );
  if (name === "vault")
    return (
      <svg viewBox="0 0 16 16" className={c} fill="none" aria-hidden>
        <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" />
        <path d="M2 7h12" stroke="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 16 16" className={c} fill="none" aria-hidden>
      <path d="M3 12 L7 6 L10 9 L13 4" stroke="currentColor" />
    </svg>
  );
}
