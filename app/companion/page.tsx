import type { Metadata } from "next";
import { LiveTour } from "@/components/companion/live-tour";

export const metadata: Metadata = {
  title: "Live tour — See Mo",
};

export default function CompanionPage() {
  return <LiveTour />;
}
