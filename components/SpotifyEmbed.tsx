"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function toDeepLink(url: string) {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length >= 2) {
      return `spotify:${segments[0]}:${segments[1]}`;
    }
    return url;
  } catch {
    return url;
  }
}

interface SpotifyEmbedProps {
  title: string;
  spotifyUrl: string;
  className?: string;
}

export function SpotifyEmbed({ title, spotifyUrl, className }: SpotifyEmbedProps) {
  const deepLink = toDeepLink(spotifyUrl);
  const embedUrl = `${spotifyUrl.replace("open.spotify.com", "open.spotify.com/embed")}?utm_source=generator&theme=0`;

  const handlePlay = useCallback(() => {
    const tracked = withUtm(spotifyUrl, {
      platform: "spotify",
      context: "spotify-embed",
      label: title,
    });
    trackOutbound("spotify_click", tracked, {
      platform: "spotify",
      context: "spotify-embed",
      label: title,
    });
    window.setTimeout(() => {
      window.open(tracked, "_blank", "noreferrer");
    }, 800);
    window.location.href = deepLink;

  }, [spotifyUrl, deepLink, title]);

  return (
    <div className={cn("glass-panel overflow-hidden border-white/10 bg-[#11111a]/80", className)}>
      <iframe
        title={`${title} Spotify preview`}
        src={embedUrl}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="h-[152px] w-full"
      />
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-fg">{title}</p>
          <p className="text-xs text-fg-muted">Listen in the Spotify app</p>
        </div>
        <Button
          onClick={handlePlay}
          className="rounded-full bg-[var(--accent-violet)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white"
        >
          Launch App
        </Button>
      </div>
    </div>
  );
}
