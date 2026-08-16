import { CompanionShell } from "@/components/companion/shell";

export default function CompanionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CompanionShell>{children}</CompanionShell>;
}
