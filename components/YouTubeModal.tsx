"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackOutbound } from "@/lib/analytics";
import type { Video } from "@/components/VideoCard";
import { cn } from "@/lib/utils";

type YouTubePlayerEvent = {
  data: number;
};

type YouTubePlayer = {
  loadVideoById: (videoId: string) => void;
  stopVideo: () => void;
  destroy: () => void;
};

type YouTubeNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: YouTubePlayerEvent) => void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: {
    ENDED: number;
  };
};

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_SCRIPT_SRC = "https://www.youtube.com/iframe_api";
let ytScriptLoading: Promise<void> | null = null;

function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytScriptLoading) return ytScriptLoading;

  ytScriptLoading = new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${YT_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.YT && window.YT.Player) {
        resolve();
      } else {
        window.onYouTubeIframeAPIReady = () => resolve();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = YT_SCRIPT_SRC;
    script.async = true;
    window.onYouTubeIframeAPIReady = () => resolve();
    document.body.appendChild(script);
  });

  return ytScriptLoading;
}

interface YouTubeModalProps {
  open: boolean;
  video?: Video | null;
  nextVideo?: Video | null;
  onOpenChange: (open: boolean) => void;
  onQueueNext?: (video: Video) => void;
}

export function YouTubeModal({ open, video, nextVideo, onOpenChange, onQueueNext }: YouTubeModalProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (!open || !video) return;

    let isCancelled = false;

    loadYouTubeApi().then(() => {
      if (isCancelled || !containerRef.current) return;
      if (!window.YT) return;

      if (playerRef.current) {
        playerRef.current.loadVideoById(video.youtubeId);
        return;
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: video.youtubeId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (event) => {
            if (event.data === window.YT?.PlayerState.ENDED && nextVideo) {
              onQueueNext?.(nextVideo);
            }
          },
        },
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [open, video, nextVideo, onQueueNext]);

  useEffect(() => {
    if (!open) {
      playerRef.current?.stopVideo?.();
    }
  }, [open]);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-white/10 bg-[#050508]/95 text-fg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {video?.title ?? "Watch on YouTube"}
          </DialogTitle>
          <DialogDescription className="text-fg-muted">
            Streaming via youtube-nocookie embeds. Autoplay on open.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10">
          <div
            ref={containerRef}
            className={cn("h-full w-full", !playerReady && "animate-pulse bg-white/10")}
          />
        </div>
        {nextVideo ? (
          <div className="glass-panel mt-4 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-fg">
            <p className="text-sm text-fg-muted">
              Next up once this finishes: <span className="text-fg">{nextVideo.title}</span>
            </p>
            <Button
              variant="outline"
              className="w-max rounded-full border-white/20 px-4"
              onClick={() => {
                if (!nextVideo) return;
                trackOutbound("youtube_click", `https://youtu.be/${nextVideo.youtubeId}`, {
                  platform: "youtube",
                  context: "modal-next",
                  label: nextVideo.title,
                });
                onQueueNext?.(nextVideo);
              }}
            >
              Queue Next Video
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
