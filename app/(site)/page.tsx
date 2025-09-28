import type { Metadata } from "next";

import { Hero } from "@/components/Hero";
import { VideoHighlight } from "@/components/VideoHighlight";
import { IgGrid } from "@/components/IgGrid";
import { ReleaseCard } from "@/components/ReleaseCard";
import type { Release } from "@/components/ReleaseCard";
import { getGallery, getReleases, getVideos } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Tap into Deyan's world: stream the latest single, binge the new videos, and follow the neon trail across socials.",
};


export default function HomePage() {
  const releases = getReleases();
  const videos = getVideos();
  const gallery = getGallery();
  const latestRelease = releases[0];
  const heroPlaylistThumb = "/images/hero/herothumb.png" as const;

  const jaguarRelease: Release | null = videos[0]
    ? {
        title: "JAGUAR (Official Video)",
        cover: videos[0].thumb,
        spotifyUrl: "https://open.spotify.com/track/3VvwExampleRISING",
        youtubeUrl: `https://youtu.be/${videos[0].youtubeId}`,
        appleUrl: "https://music.apple.com/album/rising-single/1234567890",
        releaseDate: videos[0].date,
        tags: ["video"],
      }
    : null;
  const heroFeaturedVideo = {
    title: "The Conference Playlist",
    url: "https://www.youtube.com/playlist?list=PLWe3iEB5Hvxqp-fvM3--0F4DaSz-l4qMf",
    thumb: heroPlaylistThumb,
  } as const;
  const igPosts = gallery.slice(0, 9).map((photo) => ({
    thumb: photo.src,
    url: photo.url ?? "https://www.instagram.com/realdeyan/",
    alt: photo.alt,
  }));

  const heroSpotify = "https://open.spotify.com/album/0x5rXTicbgVz3EhgnHnaEN";
  const heroYoutube = "https://www.youtube.com/playlist?list=PLWe3iEB5Hvxqp-fvM3--0F4DaSz-l4qMf";

  const heroStats = [
    latestRelease
      ? {
          label: "Latest Drop",
          value: latestRelease.title,
          hint: formatDate(latestRelease.releaseDate),
        }
      : null,
    videos[0]
      ? {
          label: "Fresh Visual",
          value: videos[0].title,
          hint: formatDate(videos[0].date),
        }
      : null,
    {
      label: "Monthly Listeners",
      value: "150K+",
      hint: "Across Spotify & YouTube",
    },
  ].filter(Boolean) as Array<{ label: string; value: string; hint?: string }>;

  return (
    <>
      <Hero
        bg="/images/hero/background.png"
        title={latestRelease?.title ?? "The Conference"}
        subtitle="Tap to stream the full Conference playlist"
        spotifyUrl={heroSpotify}
        youtubeUrl={heroYoutube}
        latestVideoTitle={undefined}
        stats={heroStats}
        featuredVideo={heroFeaturedVideo}
      />

      <section className="relative z-10 mx-auto mt-8 max-w-6xl px-4 pb-24 sm:-mt-8 sm:px-6 lg:-mt-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.2fr_0.8fr]">
          <VideoHighlight videos={videos} />
          <div className="flex flex-col gap-6">
            {jaguarRelease ? (
              <ReleaseCard
                release={jaguarRelease}
                singleCta={{ label: "Watch Jaguar", href: jaguarRelease.youtubeUrl, platform: "youtube" }}
              />
            ) : latestRelease ? (
              <ReleaseCard release={latestRelease} />
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#08080d] py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Instagram Stories</p>
              <h2 className="mt-2 text-3xl font-semibold text-fg md:text-4xl">
                Swipe the latest captures
              </h2>
            </div>
            <a
              href="https://www.instagram.com/realdeyan/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[var(--accent-green)]"
            >
              Follow @realdeyan
            </a>
          </div>
          <IgGrid posts={igPosts} className="mt-10" />
        </div>
      </section>

    </>
  );
}
