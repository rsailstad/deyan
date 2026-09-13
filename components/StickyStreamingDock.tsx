"use client";

import Link from "next/link";
import { Youtube, Music2 } from "lucide-react";

interface StickyStreamingDockProps {
  latestTrackTitle: string;
  youtubeUrl: string;
  spotifyUrl: string;
}

export function StickyStreamingDock({
  latestTrackTitle,
  youtubeUrl,
  spotifyUrl,
}: StickyStreamingDockProps) {
  return (
    <aside
      aria-label="Quick stream player"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-[#09090d]/90 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent-green)]" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
              Latest Transmission
            </p>
            <p className="truncate text-sm font-semibold text-white">
              {latestTrackTitle}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-red-600/90 hover:bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md transition hover:scale-105 active:scale-95"
          >
            <Youtube className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">Watch on</span> YouTube
          </Link>
          <Link
            href={spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1db954] hover:bg-[#1ed760] px-3.5 py-1.5 text-xs font-semibold text-black shadow-md transition hover:scale-105 active:scale-95"
          >
            <Music2 className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">Stream on</span> Spotify
          </Link>
        </div>
      </div>
    </aside>
  );
}
