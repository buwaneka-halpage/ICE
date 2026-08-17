import type { Metadata } from "next";
import { LiveCaptures } from "@/components/media/live-captures";

export const metadata: Metadata = {
  title: "Guest memories — See Mo",
};

export default function ContentPage() {
  return (
    <div className="flex max-w-5xl flex-col gap-3">
      <section className="panel p-5">
        <p className="label">Guest memories</p>
        <h1 className="mt-1 font-serif text-2xl tracking-tight">What travellers took home today</h1>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-dim">
          Photos posted by glasses into Vercel Blob. This is the consumer proof
          that justifies the surcharge — not a content CMS.
        </p>
      </section>
      <LiveCaptures layout="grid" allowUpload />
    </div>
  );
}
