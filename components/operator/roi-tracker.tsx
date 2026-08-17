import {
  BREAK_EVEN_MONTH,
  CAPEX_PER_GLASS_USD,
  MONTHLY_NET_PROFIT_PER_GLASS_USD,
  SURCHARGE_PER_TOURIST_USD,
  cumulativeRevenueAt,
} from "@/lib/metrics";

const MONTHS = [0, 1, 2, 3, 4, 5, 6];

export function RoiTracker() {
  const w = 360;
  const h = 120;
  const pad = { l: 28, r: 8, t: 10, b: 22 };
  const maxY = 420;
  const x = (m: number) => pad.l + (m / 6) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / maxY) * (h - pad.t - pad.b);

  const revenue = MONTHS.map((m) => [x(m), y(cumulativeRevenueAt(m))] as const);
  const cost = MONTHS.map((m) => [x(m), y(CAPEX_PER_GLASS_USD)] as const);
  const revPath = revenue
    .map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`)
    .join(" ");
  const costPath = cost
    .map(([px, py], i) => `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)}`)
    .join(" ");
  const bx = x(BREAK_EVEN_MONTH);
  const by = y(CAPEX_PER_GLASS_USD);

  return (
    <section className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">HaaS unit economics</p>
          <h2 className="mt-1 font-serif text-[17px] tracking-tight">
            6-month hardware amortization
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-telemetry">
            ${CAPEX_PER_GLASS_USD} capex / lease
          </p>
          <p className="text-[12px] text-sun">
            ${SURCHARGE_PER_TOURIST_USD} / tourist surcharge
          </p>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-full" aria-hidden>
        <path d={costPath} fill="none" stroke="#6B6258" strokeDasharray="4 3" strokeWidth="1.2" />
        <path d={revPath} fill="none" stroke="#3D6B47" strokeWidth="1.8" />
        <circle cx={bx} cy={by} r="3.5" fill="#C45C26" />
        <text x={bx + 6} y={by - 6} fill="#C45C26" fontSize="9" fontFamily="ui-sans-serif, system-ui, sans-serif">
          BE {BREAK_EVEN_MONTH} mo
        </text>
        {MONTHS.slice(1).map((m) => (
          <text
            key={m}
            x={x(m)}
            y={h - 6}
            fill="#6B6258"
            fontSize="9"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle"
          >
            M{m}
          </text>
        ))}
      </svg>

      <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
        Device break-even achieved in month {BREAK_EVEN_MONTH}. Current monthly net
        profit per glass:{" "}
        <span className="text-health">
          ${MONTHLY_NET_PROFIT_PER_GLASS_USD.toFixed(2)}
        </span>
        .
      </p>
    </section>
  );
}
