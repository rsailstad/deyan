"use client";

import { useState } from "react";

import { VideoCard, type Video } from "@/components/VideoCard";
import { YouTubeModal } from "@/components/YouTubeModal";

interface VideoGalleryProps {
  videos: Video[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Video | null>(null);

  const handleOpen = (video: Video) => {
    setActive(video);
    setOpen(true);
  };

  const nextVideo = active
    ? videos[(videos.findIndex((video) => video.youtubeId === active.youtubeId) + 1) % videos.length]
    : null;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.youtubeId} video={video} onPlay={handleOpen} context="videos-page" />
        ))}
      </div>
      <YouTubeModal
        open={open}
        video={active}
        nextVideo={nextVideo}
        onOpenChange={setOpen}
        onQueueNext={(video) => {
          setActive(video);
          setOpen(true);
        }}
      />
    </>
  );
}
