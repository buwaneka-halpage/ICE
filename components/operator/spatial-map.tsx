"use client";

import { useState } from "react";
import { ACOUSTIC, AR_LAYER, TOUR_GROUPS, WANDERING, type MapNodeId } from "@/lib/tour";

const NODE_POS: Record<MapNodeId, { x: number; y: number }> = {
  "water-gardens": { x: 210, y: 430 },
  "mirror-wall": { x: 250, y: 188 },
  "lion-paw": { x: 400, y: 168 },
  frescoes: { x: 188, y: 150 },
};

export function SpatialMap() {
  const [selected, setSelected] = useState<MapNodeId>("water-gardens");
  const group = TOUR_GROUPS.find((g) => g.node === selected) ?? TOUR_GROUPS[0];

  return (
    <section className="panel relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="label">Live tour operations</p>
          <h2 className="mt-1 text-[15px] tracking-tight">
            Sigiriya Rock Fortress & Water Gardens
          </h2>
        </div>
        <p className="font-mono text-[10px] text-telemetry">2.5D SLAM overlay · WGS84</p>
      </div>

      <div className="relative bg-[#0e1118]">
        <svg viewBox="0 0 720 520" className="h-auto w-full" role="img" aria-label="Sigiriya topological map">
          <defs>
            <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a342c" />
              <stop offset="55%" stopColor="#2a261f" />
              <stop offset="100%" stopColor="#1a1814" />
            </linearGradient>
            <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0b3a48" />
              <stop offset="100%" stopColor="#082830" />
            </linearGradient>
            <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 8 L8 0" stroke="#ffffff" strokeOpacity="0.04" />
            </pattern>
          </defs>

          <rect width="720" height="520" fill="#0e1118" />
          <rect width="720" height="520" fill="url(#hatch)" />

          {/* Jungle apron */}
          <path
            d="M20 500 C80 420 140 390 240 400 C340 412 420 380 520 400 C620 422 680 460 700 500 L20 500Z"
            fill="#12181c"
          />

          {/* Water gardens — south */}
          <g>
            <rect x="70" y="360" width="210" height="78" rx="4" fill="url(#water)" stroke="#0EA5E9" strokeOpacity="0.35" />
            <rect x="92" y="376" width="70" height="22" rx="2" fill="#0a4a58" stroke="#0EA5E9" strokeOpacity="0.2" />
            <rect x="178" y="376" width="70" height="22" rx="2" fill="#0a4a58" stroke="#0EA5E9" strokeOpacity="0.2" />
            <rect x="92" y="404" width="156" height="18" rx="2" fill="#083844" />
            <rect x="310" y="360" width="210" height="78" rx="4" fill="url(#water)" stroke="#0EA5E9" strokeOpacity="0.25" />
            <rect x="332" y="376" width="70" height="22" rx="2" fill="#0a4a58" />
            <rect x="418" y="376" width="70" height="22" rx="2" fill="#0a4a58" />
            <rect x="332" y="404" width="156" height="18" rx="2" fill="#083844" />
            <text x="175" y="348" fill="#64748B" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.4">
              WESTERN WATER GARDENS
            </text>
            <text x="415" y="348" fill="#64748B" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.4">
              EASTERN MOATS
            </text>
          </g>

          {/* Processional path */}
          <path
            d="M360 438 L360 300 L400 250 L400 175"
            fill="none"
            stroke="#d97706"
            strokeOpacity="0.35"
            strokeWidth="3"
            strokeDasharray="6 5"
          />

          {/* Boulder gardens */}
          <ellipse cx="300" cy="310" rx="70" ry="28" fill="#1b1f18" stroke="#ffffff" strokeOpacity="0.08" />
          <ellipse cx="430" cy="318" rx="54" ry="22" fill="#1b1f18" stroke="#ffffff" strokeOpacity="0.08" />
          <text x="268" y="288" fill="#64748B" fontSize="9" fontFamily="ui-monospace, monospace">
            BOULDER GARDENS
          </text>

          {/* Rock mass — isometric-ish */}
          <path
            d="M250 250 L400 120 L560 250 L520 265 L400 155 L280 265 Z"
            fill="#2c2822"
            opacity="0.9"
          />
          <path d="M250 250 L400 155 L560 250 L400 330 Z" fill="url(#rock)" stroke="#F59E0B" strokeOpacity="0.15" />
          <path d="M330 210 L400 155 L470 210 L400 248 Z" fill="#4a4338" opacity="0.55" />
          <text x="378" y="108" fill="#9AA3B2" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="1.6">
            SUMMIT PALACE
          </text>

          {/* Mirror wall west face */}
          <path d="M268 175 L292 155 L305 210 L278 228 Z" fill="#c4b49a" opacity="0.35" />
          <text x="198" y="230" fill="#64748B" fontSize="9" fontFamily="ui-monospace, monospace">
            MIRROR WALL
          </text>

          {/* Lion paw terrace */}
          <rect x="372" y="168" width="56" height="18" rx="2" fill="#3d3428" stroke="#F59E0B" strokeOpacity="0.3" />
          <text x="430" y="162" fill="#64748B" fontSize="9" fontFamily="ui-monospace, monospace">
            LION’S PAW
          </text>

          {/* Fresco pocket */}
          <path d="M175 128 C190 118 210 128 218 148 C200 158 178 152 175 128Z" fill="#7a3b2e" opacity="0.55" />
          <text x="88" y="138" fill="#64748B" fontSize="9" fontFamily="ui-monospace, monospace">
            FRESCOES
          </text>

          {/* Contour ticks */}
          <path d="M300 270 C360 250 440 250 500 270" fill="none" stroke="#fff" strokeOpacity="0.06" />
          <path d="M320 300 C370 284 430 284 480 300" fill="none" stroke="#fff" strokeOpacity="0.05" />

          {/* Nodes */}
          {TOUR_GROUPS.map((g) => {
            const p = NODE_POS[g.node];
            const active = selected === g.node;
            return (
              <g
                key={g.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(g.node)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active ? 11 : 8}
                  fill="#0EA5E9"
                  fillOpacity={active ? 0.35 : 0.18}
                />
                <circle cx={p.x} cy={p.y} r="4.5" fill="#0EA5E9" />
                <text
                  x={p.x + 14}
                  y={p.y - 8}
                  fill="#E8ECF1"
                  fontSize="11"
                  fontFamily="ui-sans-serif, system-ui"
                >
                  Group {g.id} · {g.guide}
                </text>
                <text
                  x={p.x + 14}
                  y={p.y + 6}
                  fill="#9AA3B2"
                  fontSize="10"
                  fontFamily="ui-monospace, monospace"
                >
                  {g.headcount} tourists · {g.location}
                </text>
              </g>
            );
          })}

          {/* Wandering alert */}
          <g>
            <circle
              cx={NODE_POS.frescoes.x}
              cy={NODE_POS.frescoes.y}
              r="16"
              fill="#F59E0B"
              className="pulse-amber"
              opacity="0.25"
            />
            <circle cx={NODE_POS.frescoes.x} cy={NODE_POS.frescoes.y} r="4" fill="#F59E0B" />
            <text
              x={NODE_POS.frescoes.x + 14}
              y={NODE_POS.frescoes.y - 10}
              fill="#F59E0B"
              fontSize="11"
            >
              {WANDERING.label}
            </text>
            <text
              x={NODE_POS.frescoes.x + 14}
              y={NODE_POS.frescoes.y + 4}
              fill="#D97706"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              {WANDERING.detail}
            </text>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
          <div className="hud-scan h-px w-1/3 bg-gradient-to-r from-transparent via-signal/60 to-transparent" />
        </div>

        <div className="absolute top-3 right-3 max-w-[260px] space-y-2">
          <div className="rounded-lg border border-signal/25 bg-[#0e1118]/85 p-3 backdrop-blur-md">
            <p className="label">Spatial AR sync</p>
            <p className="mt-1 text-[13px]">{AR_LAYER.name}</p>
            <p className="mt-1 font-mono text-[11px] text-signal">
              {AR_LAYER.state} · {AR_LAYER.accuracy}% tracking accuracy
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#0e1118]/85 p-3 backdrop-blur-md">
            <p className="label">Acoustic isolation</p>
            <div className="mt-2 space-y-1.5">
              <Meter label="Guide mic" value={70} color="#0EA5E9" />
              <Meter label="Wind / crowd" value={42} color="#64748B" />
            </div>
            <p className="mt-2 font-mono text-[10px] text-health">
              ANC {ACOUSTIC.ancDb} dB active
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 p-3 sm:grid-cols-3">
        {TOUR_GROUPS.map((g) => (
          <button
            type="button"
            key={g.id}
            onClick={() => setSelected(g.node)}
            className={`rounded-lg border px-3 py-2 text-left transition-colors ${
              selected === g.node
                ? "border-signal/40 bg-signal/8"
                : "border-white/10 hover:bg-white/3"
            }`}
          >
            <p className="font-mono text-[10px] text-telemetry">Tour {g.id}</p>
            <p className="text-[13px]">{g.guide}</p>
            <p className="text-[12px] text-ink-dim">
              {g.headcount} · {g.location}
            </p>
          </button>
        ))}
      </div>
      <p className="sr-only">Selected group {group.id}</p>
    </section>
  );
}

function Meter({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[10px] text-telemetry">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
