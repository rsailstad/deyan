import type { Metadata } from "next";

import { VideoGallery } from "@/components/VideoGallery";
import { getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Videos",
  description: "Queue the visuals. Watch realDEYAN's latest drops and live moments, autoplay ready.",
};

export default function VideosPage() {
  const videos = getVideos();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Video vault</p>
        <h1 className="mt-3 text-4xl font-semibold text-fg md:text-5xl">Watch the drop, then what&apos;s next</h1>
        <p className="mt-4 text-sm text-fg-muted">
          Every video opens in a privacy-friendly YouTube modal with autoplay and a suggested follow-up to keep fans watching longer.
        </p>
      </header>
      <div className="mt-10">
        <VideoGallery videos={videos} />
      </div>
    </div>
  );
}
