"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function useCompanionTheme() {
  return useContext(ThemeCtx);
}

const TABS = [
  { href: "/companion", label: "Live", icon: "live" },
  { href: "/companion/vault", label: "Vault", icon: "vault" },
  { href: "/companion/journey", label: "Journey", icon: "path" },
] as const;

export function CompanionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const light = theme === "light";

  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(light ? "dark" : "light") }}>
      <div
        className={`min-h-dvh ${
          light
            ? "bg-[#d9cfc0] text-sand-ink"
            : "bg-[radial-gradient(1200px_600px_at_50%_-10%,#2a241c_0%,#0b0d11_55%)] text-ink"
        }`}
      >
        <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col md:max-w-[400px] md:py-8">
          <div
            className={`flex min-h-dvh flex-1 flex-col overflow-hidden md:min-h-0 md:rounded-[36px] md:border md:shadow-2xl ${
              light
                ? "border-[#cbbda8] bg-sand"
                : "border-white/10 bg-[#12151c] md:shadow-black/50"
            }`}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <Link
                href="/"
                className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
                  light ? "text-[#7a6e5e]" : "text-telemetry"
                }`}
              >
                AISee Companion
              </Link>
              <button
                type="button"
                onClick={() => setTheme(light ? "dark" : "light")}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] ${
                  light
                    ? "border-[#cbbda8] text-[#7a6e5e]"
                    : "border-white/10 text-ink-dim"
                }`}
              >
                {light ? "Dark" : "Light"}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-24">{children}</div>
            <nav
              className={`sticky bottom-0 grid grid-cols-3 border-t px-2 py-2 backdrop-blur-md ${
                light
                  ? "border-[#e2d8c8] bg-sand/90"
                  : "border-white/10 bg-[#12151c]/90"
              }`}
            >
              {TABS.map((t) => {
                const active =
                  t.href === "/companion"
                    ? pathname === "/companion"
                    : pathname.startsWith(t.href);
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] ${
                      active
                        ? light
                          ? "text-heritage"
                          : "text-sun"
                        : light
                          ? "text-[#7a6e5e]"
                          : "text-telemetry"
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
    </ThemeCtx.Provider>
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
