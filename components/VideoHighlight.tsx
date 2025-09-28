"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { YouTubeModal } from "@/components/YouTubeModal";
import type { Video } from "@/components/VideoCard";
import { formatDate } from "@/lib/utils";

interface VideoHighlightProps {
  videos: Video[];
}

export function VideoHighlight({ videos }: VideoHighlightProps) {
  const [active, setActive] = useState<Video | null>(videos[0] ?? null);
  const [modalOpen, setModalOpen] = useState(false);

  const nextVideo = useMemo(() => {
    if (!active) return null;
    const index = videos.findIndex((video) => video.youtubeId === active.youtubeId);
    if (index === -1) return null;
    return videos[(index + 1) % videos.length];
  }, [active, videos]);

  if (!active) return null;

  return (
    <div className="glass-panel overflow-hidden rounded-[36px] border-white/10 bg-[#10101b]/70 p-6 sm:p-10">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full flex-1 rounded-3xl border border-white/10 bg-black/60 p-6">
          <p className="text-xs uppercase tracking-[0.45em] text-fg-muted">
            Latest Video · {formatDate(active.date)}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-fg md:text-4xl">{active.title}</h2>
          <p className="mt-4 max-w-xl text-sm text-fg-muted">{active.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              className="rounded-full bg-[var(--accent-violet)] px-5 py-3 text-sm font-semibold text-white"
              onClick={() => setModalOpen(true)}
            >
              Watch now
            </Button>
            <Button
              variant="ghost"
              className="rounded-full px-4 py-3 text-sm text-fg"
              onClick={() => setActive(nextVideo ?? active)}
            >
              Next up
            </Button>
          </div>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {videos.slice(0, 4).map((video) => (
            <button
              key={video.youtubeId}
              type="button"
              onClick={() => {
                setActive(video);
                setModalOpen(true);
              }}
              className="group rounded-3xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-white/25"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-fg-muted">
                {formatDate(video.date)}
              </p>
              <p className="mt-3 text-sm font-semibold text-fg group-hover:text-fg">
                {video.title}
              </p>
              <p className="mt-2 line-clamp-2 text-xs text-fg-muted">{video.description}</p>
              <span className="mt-4 inline-flex items-center text-xs text-[var(--accent-green)]">
                Tap to play -&gt;
              </span>
            </button>
          ))}
        </div>
      </div>

      <YouTubeModal
        open={modalOpen}
        video={modalOpen ? active : null}
        nextVideo={nextVideo}
        onOpenChange={setModalOpen}
        onQueueNext={(video) => {
          setActive(video);
          setModalOpen(true);
        }}
      />
    </div>
  );
}
