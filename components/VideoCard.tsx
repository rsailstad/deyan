"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { formatDate } from "@/lib/utils";

export type Video = {
  title: string;
  youtubeId: string;
  thumb: string;
  date: string;
  description: string;
};

interface VideoCardProps {
  video: Video;
  onPlay?: (video: Video) => void;
  context?: string;
}

export function VideoCard({ video, onPlay, context = "videos" }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onPlay?.(video);
        const href = withUtm(`https://youtu.be/${video.youtubeId}`, {
          platform: "youtube",
          context,
          label: video.title,
        });
        trackOutbound("youtube_click", href, {
          platform: "youtube",
          context,
          label: video.title,
        });
      }}
      className="group text-left"
    >
      <Card className="glass-panel overflow-hidden border-white/10 bg-[#0c0c15]/80 transition group-hover:translate-y-[-4px] group-hover:shadow-[var(--glow-violet)]">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={video.thumb}
            alt={`${video.title} thumbnail`}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-fg">
              Play Video
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-fg-muted">
            {formatDate(video.date)}
          </p>
          <h3 className="text-lg font-semibold text-fg">{video.title}</h3>
          <p className="text-sm text-fg-muted line-clamp-2">{video.description}</p>
        </div>
      </Card>
    </button>
  );
}
