import type { Metadata } from "next";
import { LiveOperations } from "@/components/operator/live-operations";

export const metadata: Metadata = {
  title: "Briefing — AISee Enterprise",
};

export default function OperatorPage() {
  return <LiveOperations />;
}
