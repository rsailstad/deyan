"use client";

import { Play, Radio, Youtube } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface PlayCtaProps {
  spotifyUrl: string;
  youtubeUrl: string;
  compact?: boolean;
  context?: string;
}

export function PlayCta({ spotifyUrl, youtubeUrl, compact = false, context = "hero" }: PlayCtaProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", compact && "gap-2")}
    >
      <Button
        asChild
        size={compact ? "sm" : "lg"}
        className="rounded-full bg-[var(--accent-violet)] px-6 text-base font-semibold text-white shadow-[var(--glow-violet)] transition hover:opacity-90"
      >
        <a
          href={withUtm(spotifyUrl, { platform: "spotify", context })}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackOutbound("spotify_click", spotifyUrl, { platform: "spotify", context })}
        >
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            <span>Play on Spotify</span>
          </div>
        </a>
      </Button>
      <a
        href={withUtm(youtubeUrl, { platform: "youtube", context })}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackOutbound("youtube_click", youtubeUrl, { platform: "youtube", context })}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-full border border-white/15 bg-transparent px-6 text-base font-semibold text-fg hover:border-white/25",
          compact && "px-4 text-sm",
        )}
      >
        <Youtube className="h-4 w-4" />
        <span>Watch on YouTube</span>
      </a>
      <span className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-fg-muted">
        <Radio className="h-3.5 w-3.5" />
        <span>New music weekly</span>
      </span>
    </div>
  );
}
