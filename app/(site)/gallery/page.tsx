import type { Metadata } from "next";

import { PhotoCard } from "@/components/PhotoCard";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "High-impact photos primed for press, socials, and mood boards.",
};

export default function GalleryPage() {
  const photos = getGallery();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Gallery</p>
        <h1 className="mt-3 text-4xl font-semibold text-fg md:text-5xl">Visual assets to share everywhere</h1>
        <p className="mt-4 text-sm text-fg-muted">
          Download-ready imagery for press, playlists, and socials. Mix of live energy, concept shoots, and behind-the-scenes glimpses.
        </p>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo) => (
          <PhotoCard key={photo.src} photo={photo} />
        ))}
      </div>
    </div>
  );
}
