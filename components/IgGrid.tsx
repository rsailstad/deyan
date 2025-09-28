"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type IgPost = {
  thumb: string;
  url: string;
  alt: string;
};

interface IgGridProps {
  posts: IgPost[];
  className?: string;
  context?: string;
}

export function IgGrid({ posts, className, context = "ig-grid" }: IgGridProps) {
  const [isStickyVisible, setStickyVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setStickyVisible(window.scrollY < 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4", className)}>
        {posts.map((post, index) => (
          <button
            key={`${post.url}-${index}`}
            type="button"
            onClick={() => {
              const tracked = withUtm(post.url, { platform: "instagram", context });
              trackOutbound("instagram_click", tracked, { platform: "instagram", context });
              window.open(tracked, "_blank", "noreferrer");
            }}
            className="group overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="relative h-40 w-full sm:h-48">
              {post.thumb.startsWith("http") ? (
                <img
                  src={post.thumb}
                  alt={post.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <Image
                  src={post.thumb}
                  alt={post.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      <div
        className={cn(
          "fixed inset-x-4 bottom-6 z-30 md:hidden",
          !isStickyVisible && "translate-y-32 opacity-0",
        )}
      >
        <div className="glass-panel flex items-center justify-between rounded-full border border-white/10 bg-black/70 px-5 py-4 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold text-fg">Follow realDEYAN on Instagram</p>
          <Button
            size="sm"
            className="rounded-full bg-[var(--accent-green)] px-4 text-xs font-bold uppercase tracking-[0.3em] text-black"
            onClick={() => {
              const href = withUtm("https://www.instagram.com/deyan", { platform: "instagram", context: "ig-sticky" });
              trackOutbound("instagram_click", href, { platform: "instagram", context: "ig-sticky" });
              window.open(href, "_blank", "noreferrer");
            }}
          >
            Open IG
          </Button>
        </div>
      </div>
    </div>
  );
}
