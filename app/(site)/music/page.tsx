import type { Metadata } from "next";

import { ReleaseCard } from "@/components/ReleaseCard";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { getReleases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Music",
  description: "Dive into Deyan's singles and EPs. One tap to stream on Spotify, Apple Music, or YouTube.",
};

export default function MusicPage() {
  const releases = getReleases();
  const primary = releases[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Discography</p>
        <h1 className="mt-3 text-4xl font-semibold text-fg md:text-5xl">Listen to the catalog</h1>
        <p className="mt-4 text-sm text-fg-muted">
          Every release keeps fans moving between Spotify, YouTube, and Apple Music with share-ready deep links. Swipeable cards make it easy to discover and queue the next track.
        </p>
      </header>

      {primary ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ReleaseCard release={primary} />
          <SpotifyEmbed title={primary.title} spotifyUrl={primary.spotifyUrl} />
        </div>
      ) : null}

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {releases.slice(1).map((release) => (
          <ReleaseCard key={release.title} release={release} variant="compact" />
        ))}
      </div>
    </div>
  );
}
