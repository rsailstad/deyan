"use client";
import type { CSSProperties } from "react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PlayCta } from "@/components/PlayCta";
import { trackOutbound } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface HeroProps {
  bg: string;
  title: string;
  subtitle?: string;
  spotifyUrl: string;
  youtubeUrl: string;
  latestVideoTitle?: string;
  stats?: Array<{
    label: string;
    value: string;
    hint?: string;
  }>;
  featuredVideo?: {
    title: string;
    url: string;
    thumb: string;
    date?: string;
  };
}

export function Hero({
  bg,
  title,
  subtitle,
  spotifyUrl,
  youtubeUrl,
  latestVideoTitle,
  stats,
  featuredVideo,
}: HeroProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setOffset(Math.min(y * 0.12, 40));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt="realDEYAN hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 grid-outline opacity-30" aria-hidden />
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-32 pt-24 sm:px-6 lg:pb-40",
          "parallax-wrap",
        )}
        style={{
          // offset in px - we invert to go opposite direction for parallax
          "--parallax-y": `${offset * -1}`,
        } as CSSProperties}
      >
        <div className="glass-panel w-full max-w-3xl rounded-[34px] border border-white/10 bg-black/30 p-8 sm:p-10 lg:max-w-none lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" aria-hidden />
                <span>New album out now</span>
              </div>
              <h1 className="mt-6 text-balance text-5xl font-black tracking-tight text-fg sm:text-6xl md:text-7xl">
                <span className="text-gradient block text-[clamp(3rem,6vw,5rem)] font-extrabold leading-tight">
                  {title}
                </span>
              </h1>
              {subtitle ? (
                <p className="mt-6 max-w-xl text-base text-fg/80 sm:text-lg">
                  {subtitle}
                </p>
              ) : null}
              <div className="mt-8">
                <PlayCta spotifyUrl={spotifyUrl} youtubeUrl={youtubeUrl} />
              </div>
              {latestVideoTitle ? (
                <p className="mt-6 flex items-center gap-3 text-sm text-fg-muted">
                  <span className="inline-flex h-8 items-center rounded-full border border-white/15 px-3 text-xs uppercase tracking-[0.35em]">
                    Latest Video
                  </span>
                  {latestVideoTitle}
                </p>
              ) : null}
            </div>
            {featuredVideo ? (
              <aside className="hidden min-w-[260px] shrink-0 rounded-[28px] border border-white/10 bg-white/5 p-4 text-left text-sm text-fg-muted shadow-[var(--shadow-soft)] lg:flex lg:flex-col lg:gap-4">
                <Link
                  href={featuredVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-3xl"
                  onClick={() =>
                    trackOutbound("youtube_click", featuredVideo.url, {
                      platform: "youtube",
                      context: "hero-featured",
                      label: featuredVideo.title,
                    })
                  }
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={featuredVideo.thumb}
                      alt={`${featuredVideo.title} thumbnail`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 280px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                      <span className="rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black">
                        Play
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="space-y-1 text-fg">
                  <p className="text-xs uppercase tracking-[0.35em] text-fg-muted">Featured Visual</p>
                  <p className="text-base font-semibold text-fg">{featuredVideo.title}</p>
                  {featuredVideo.date ? (
                    <p className="text-xs text-fg-muted/80">{featuredVideo.date}</p>
                  ) : null}
                </div>
              </aside>
            ) : stats?.length ? (
              <aside className="hidden min-w-[260px] shrink-0 rounded-[28px] border border-white/10 bg-white/5 p-6 text-left text-sm text-fg-muted shadow-[var(--shadow-soft)] lg:flex lg:flex-col lg:gap-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-fg">{stat.value}</p>
                    {stat.hint ? <p className="mt-1 text-xs text-fg-muted/80">{stat.hint}</p> : null}
                  </div>
                ))}
              </aside>
            ) : null}
          </div>

          {featuredVideo ? (
            <div className="mt-8 lg:hidden">
              <Link
                href={featuredVideo.url}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-white/10"
                onClick={() =>
                  trackOutbound("youtube_click", featuredVideo.url, {
                    platform: "youtube",
                    context: "hero-featured",
                    label: featuredVideo.title,
                  })
                }
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={featuredVideo.thumb}
                    alt={`${featuredVideo.title} thumbnail`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black">
                      Play
                    </span>
                  </div>
                </div>
              </Link>
              <div className="mt-3 space-y-1 text-sm text-fg">
                <p className="text-xs uppercase tracking-[0.35em] text-fg-muted">Featured Visual</p>
                <p className="text-base font-semibold text-fg">{featuredVideo.title}</p>
                {featuredVideo.date ? (
                  <p className="text-xs text-fg-muted/80">{featuredVideo.date}</p>
                ) : null}
              </div>
            </div>
          ) : stats?.length ? (
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-fg-muted lg:hidden">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-fg-muted">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold text-fg">{stat.value}</p>
                  {stat.hint ? <p className="mt-1 text-xs text-fg-muted/80">{stat.hint}</p> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
