import { QA_FLAGS_TODAY, TOUR_GROUPS } from "@/lib/tour";
import { OPTIMAL_WPM, QA_RATING_PCT } from "@/lib/metrics";

const BARS = [18, 28, 22, 36, 30, 24, 40, 26, 34, 20, 38, 25, 32, 19, 29, 35, 22, 31, 27, 33];

export function SpeechQa() {
  const guide = TOUR_GROUPS[0];

  return (
    <section className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">Guide quality · speech telemetry</p>
          <h2 className="mt-1 text-[15px] tracking-tight">Live audio QA · Tour A</h2>
        </div>
        <span className="rounded-full border border-health/30 bg-health/10 px-2 py-0.5 font-mono text-[10px] text-health">
          {QA_FLAGS_TODAY} flags today
        </span>
      </div>

      <div className="mt-4 flex h-14 items-end gap-[3px]">
        {BARS.map((h, i) => (
          <span
            key={i}
            className="wave-bar w-full rounded-sm bg-signal/80"
            style={{
              height: `${h * 1.4}px`,
              animationDelay: `${(i % 7) * 0.08}s`,
              opacity: 0.45 + (h / 40) * 0.55,
            }}
          />
        ))}
      </div>

      <blockquote className="mt-4 rounded-lg border border-white/10 bg-surface p-3 text-[13px] leading-relaxed text-ink-dim">
        <span className="font-medium text-sun">{guide.guide}</span>
        <span className="text-telemetry"> · Guide · </span>
        “{guide.snippet}”
      </blockquote>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Stat k="Pace" v={`${OPTIMAL_WPM} WPM`} s="Optimal" />
        <Stat k="QA index" v={`${QA_RATING_PCT}%`} s="Steady dB" />
        <Stat k="Safety notes" v="All hit" s="No misses" />
      </div>
    </section>
  );
}

function Stat({ k, v, s }: { k: string; v: string; s: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface px-3 py-2">
      <p className="font-mono text-[10px] text-telemetry">{k}</p>
      <p className="text-[14px]">{v}</p>
      <p className="text-[11px] text-health">{s}</p>
    </div>
  );
}
