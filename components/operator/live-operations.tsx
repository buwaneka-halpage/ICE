import { LiveCaptures } from "@/components/media/live-captures";
import { FleetRack } from "@/components/operator/fleet-rack";
import { KpiStrip } from "@/components/operator/kpi-strip";
import { RoiTracker } from "@/components/operator/roi-tracker";
import { SpatialMap } from "@/components/operator/spatial-map";
import { SpeechQa } from "@/components/operator/speech-qa";

export function LiveOperations() {
  return (
    <div className="flex flex-col gap-3">
      <KpiStrip />
      <LiveCaptures layout="strip" />
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,1fr)]">
        <SpatialMap />
        <FleetRack />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <SpeechQa />
        <RoiTracker />
      </div>
    </div>
  );
}
