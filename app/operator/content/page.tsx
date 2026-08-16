import type { Metadata } from "next";
import { AR_LAYER } from "@/lib/tour";

export const metadata: Metadata = {
  title: "AR Assets — AISee Enterprise",
};

const ASSETS = [
  {
    name: AR_LAYER.name,
    ver: "4.2.1",
    size: "186 MB",
    status: "Live",
    accuracy: `${AR_LAYER.accuracy}%`,
    node: "Water Gardens",
  },
  {
    name: "Frescoes pigment reconstruction",
    ver: "2.8.0",
    size: "94 MB",
    status: "Live",
    accuracy: "96.4%",
    node: "Western pocket",
  },
  {
    name: "Summit palace ghost architecture",
    ver: "1.9.3",
    size: "241 MB",
    status: "Live",
    accuracy: "94.1%",
    node: "Summit",
  },
  {
    name: "Lion Gate scale overlay",
    ver: "3.0.0",
    size: "52 MB",
    status: "Live",
    accuracy: "97.8%",
    node: "Lion’s Paw",
  },
  {
    name: "Mirror Wall inscription translation",
    ver: "5.1.2",
    size: "18 MB",
    status: "Live",
    accuracy: "99.0%",
    node: "Mirror Wall",
  },
];

export default function ContentPage() {
  return (
    <section className="panel overflow-hidden">
      <div className="border-b border-white/10 px-4 py-3">
        <p className="label">Content & AR assets</p>
        <h2 className="mt-1 text-[15px] tracking-tight">
          Sigiriya spatial pack · 5 layers synced
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead className="font-mono text-[10px] tracking-[0.12em] text-telemetry uppercase">
            <tr className="border-b border-white/10">
              <th className="px-4 py-2 font-normal">Layer</th>
              <th className="px-4 py-2 font-normal">Node</th>
              <th className="px-4 py-2 font-normal">Version</th>
              <th className="px-4 py-2 font-normal">Size</th>
              <th className="px-4 py-2 font-normal">Tracking</th>
              <th className="px-4 py-2 font-normal">State</th>
            </tr>
          </thead>
          <tbody>
            {ASSETS.map((a) => (
              <tr key={a.name} className="border-b border-white/6">
                <td className="px-4 py-3">{a.name}</td>
                <td className="px-4 py-3 text-ink-dim">{a.node}</td>
                <td className="px-4 py-3 font-mono text-[12px]">{a.ver}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-dim">
                  {a.size}
                </td>
                <td className="px-4 py-3 font-mono text-signal">{a.accuracy}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-health/30 bg-health/10 px-2 py-0.5 font-mono text-[10px] text-health">
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
