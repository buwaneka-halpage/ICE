import type { Metadata } from "next";
import { LiveOperations } from "@/components/operator/live-operations";

export const metadata: Metadata = {
  title: "Briefing — See Mo",
};

export default function OperatorPage() {
  return <LiveOperations />;
}
