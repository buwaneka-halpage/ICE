import type { Metadata } from "next";
import { Journey } from "@/components/companion/journey";

export const metadata: Metadata = {
  title: "Journey — See Mo",
};

export default function JourneyPage() {
  return <Journey />;
}
