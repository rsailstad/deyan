import type { Metadata } from "next";
import Link from "next/link";

import BioContent from "@/content/bio.mdx";
import { SocialRow } from "@/components/SocialRow";
import { getPress } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Meet realDEYAN: bio, highlights, and press-ready assets in one scroll.",
};

export default function AboutPage() {
  const press = getPress();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Artist Bio</p>
        <h1 className="mt-3 text-4xl font-semibold text-fg md:text-5xl">The story so far</h1>
        <p className="mt-4 text-sm text-fg-muted">
          Everything a writer, booker, or creator needs to capture the energy of a 15-year-old artist moving at hyper-speed.
        </p>
      </header>

      <div className="mt-12 glass-panel space-y-6 rounded-[36px] border-white/10 bg-[#10101b]/80 p-8 md:p-12">
        <BioContent />
      </div>

      <div className="mt-12 flex flex-col gap-8 md:flex-row">
        <Link
          href="/press/deyan-onesheet.pdf"
          target="_blank"
          rel="noreferrer"
          className="glass-panel flex w-full flex-col justify-between rounded-[30px] border-white/10 bg-[#0b0b12]/80 p-6 text-left md:w-1/2"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Download</p>
            <h2 className="mt-3 text-2xl font-semibold text-fg">Press Onesheet</h2>
            <p className="mt-3 text-sm text-fg-muted">
              One page summary with socials, stats, and quick facts. Ready for booking outreach and playlist pitching.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--accent-green)]">
            Open PDF -&gt;
          </span>
        </Link>
        <div className="glass-panel flex w-full flex-col rounded-[30px] border-white/10 bg-[#0b0b12]/80 p-6 md:w-1/2">
          <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Press Highlights</p>
          <ul className="mt-4 space-y-4">
            {press.map((item) => (
              <li key={item.url} className="group">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-1 rounded-2xl border border-transparent p-3 transition group-hover:border-white/15"
                >
                  <span className="text-xs uppercase tracking-[0.35em] text-fg-muted">
                    {item.outlet} · {formatDate(item.date)}
                  </span>
                  <span className="text-sm font-semibold text-fg group-hover:text-[var(--accent-green)]">
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <SocialRow context="about" />
          </div>
        </div>
      </div>
    </div>
  );
}
