import type { Metadata } from "next";
import { LiveTour } from "@/components/companion/live-tour";

export const metadata: Metadata = {
  title: "Live Tour — AISee Companion",
};

export default function CompanionPage() {
  return <LiveTour />;
}
