"use client";

/* eslint-disable @next/next/no-img-element -- blob host is per-store; native img avoids next/image remote config */

import { useEffect, useState } from "react";
import type { Capture } from "@/lib/captures";

type Payload = { configured?: boolean; captures?: Capture[]; error?: { message: string } };

export function LiveCaptures({
  layout = "strip",
  allowUpload = false,
}: {
  layout?: "strip" | "grid";
  allowUpload?: boolean;
}) {
  const [configured, setConfigured] = useState(true);
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      fetch("/api/v1/media")
        .then((res) => res.json() as Promise<Payload>)
        .then((data) => {
          if (cancelled) return;
          setConfigured(Boolean(data.configured));
          setCaptures(data.captures ?? []);
          setError(data.error?.message ?? null);
        })
        .catch((err: unknown) => {
          if (!cancelled) setError(err instanceof Error ? err.message : "list failed");
        });
    const first = setTimeout(load, 0);
    const id = setInterval(load, 10_000);
    return () => {
      cancelled = true;
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.set("file", file);
      body.set(
        "meta",
        JSON.stringify({
          device_id: "AS-ARIA-024",
          capture_id: `cap_${Date.now()}`,
          title: file.name,
          node_id: "water-gardens",
        }),
      );
      const res = await fetch("/api/v1/media", { method: "POST", body });
      const data = (await res.json()) as Payload & { capture?: Capture };
      if (!res.ok) {
        setError(data.error?.message ?? `upload ${res.status}`);
        return;
      }
      if (data.capture) {
        setCaptures((prev) => [data.capture!, ...prev]);
        setConfigured(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div>
          <p className="label">Vercel Blob · live captures</p>
          <h2 className="mt-1 text-[15px] tracking-tight">
            {configured
              ? `${captures.length} image${captures.length === 1 ? "" : "s"} in store`
              : "Blob store not connected"}
          </h2>
        </div>
        {allowUpload && (
          <label className="cursor-pointer rounded-lg border border-white/10 bg-surface px-3 py-1.5 text-[12px] text-ink-dim hover:text-ink">
            {busy ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="hidden"
              disabled={busy}
              onChange={(e) => void onFile(e.target.files?.[0])}
            />
          </label>
        )}
      </div>

      {!configured && (
        <p className="px-4 py-3 text-[13px] text-ink-dim">
          In Vercel → Storage, create a Blob store and connect it to this project.
          Redeploy so <span className="font-mono text-[12px]">BLOB_READ_WRITE_TOKEN</span> is
          set. Then POST to <span className="font-mono text-[12px]">/api/v1/media</span>.
        </p>
      )}
      {error && <p className="px-4 py-2 text-[12px] text-sun">{error}</p>}

      {captures.length > 0 && (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-2 gap-2 p-3 md:grid-cols-4"
              : "flex gap-2 overflow-x-auto p-3"
          }
        >
          {captures.map((c) => (
            <figure
              key={c.pathname}
              className={
                layout === "strip"
                  ? "w-36 shrink-0 overflow-hidden rounded-lg border border-white/10"
                  : "overflow-hidden rounded-lg border border-white/10"
              }
            >
              {/* ponytail: remote blob host varies per store; <img> skips next/image config */}
              <img
                src={c.url}
                alt={c.title ?? c.capture_id}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-2 py-1.5">
                <p className="truncate font-mono text-[10px] text-sun">{c.device_id}</p>
                <p className="truncate font-mono text-[10px] text-telemetry">
                  {new Date(c.uploadedAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Colombo",
                  })}{" "}
                  SLST
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
