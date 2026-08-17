import type { Metadata } from "next";
import { MemoryVault } from "@/components/companion/memory-vault";

export const metadata: Metadata = {
  title: "Memory vault — See Mo",
};

export default function VaultPage() {
  return <MemoryVault />;
}
