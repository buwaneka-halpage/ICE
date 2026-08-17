import type { Metadata } from "next";
import { CapacityView } from "@/components/operator/capacity";

export const metadata: Metadata = {
  title: "Capacity — See Mo",
};

export default function FleetPage() {
  return <CapacityView />;
}
