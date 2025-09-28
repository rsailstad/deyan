"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { formatDate } from "@/lib/utils";

export type Release = {
  title: string;
  cover: string;
  spotifyUrl: string;
  youtubeUrl: string;
  appleUrl: string;
  releaseDate: string;
  tags: string[];
};

interface ReleaseCardProps {
  release: Release;
  variant?: "primary" | "compact";
  singleCta?: {
    label: string;
    href: string;
    platform?: string;
  };
}

export function ReleaseCard({ release, variant = "primary", singleCta }: ReleaseCardProps) {
  return (
    <Card className="glass-panel flex h-full flex-col overflow-hidden border-white/10 bg-[#0c0c15]/70">
      <CardHeader className="relative p-0">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={release.cover}
            alt={`${release.title} cover art`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={variant === "primary"}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 py-3 text-xs text-fg-muted">
          <span>{formatDate(release.releaseDate)}</span>
          <div className="flex gap-2">
            {release.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full border-white/15 bg-black/30">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-xl font-semibold text-fg">{release.title}</h3>
        </div>
        <p className="text-sm text-fg-muted">
          {singleCta
            ? "Instant premiere access. Watch the drop in one tap."
            : "Deep-link to Spotify & Apple Music with tracking on each click. Keep fans inside the play flow."}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 p-6 pt-0">
        {singleCta ? (
          <div className="flex w-full justify-center">
            <Button
              asChild
              className="rounded-full bg-[var(--accent-violet)] px-6 py-3 text-sm font-semibold text-white"
            >
              <Link
                href={withUtm(singleCta.href, {
                  platform: singleCta.platform ?? "other",
                  context: "release-card-single",
                  label: release.title,
                })}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackOutbound("single_cta_click", singleCta.href, {
                    platform: singleCta.platform ?? "other",
                    context: "release-card-single",
                    label: release.title,
                  })
                }
              >
                {singleCta.label}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-[var(--accent-violet)] px-4 py-2 text-sm font-semibold text-white"
            >
              <Link
                href={withUtm(release.spotifyUrl, { platform: "spotify", context: "release-card", label: release.title })}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackOutbound("spotify_click", release.spotifyUrl, {
                    platform: "spotify",
                    context: "release-card",
                    label: release.title,
                  })
                }
              >
                Play
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/15 px-4 py-2 text-sm text-fg hover:border-white/25"
            >
              <Link
                href={withUtm(release.youtubeUrl, { platform: "youtube", context: "release-card", label: release.title })}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackOutbound("youtube_click", release.youtubeUrl, {
                    platform: "youtube",
                    context: "release-card",
                    label: release.title,
                  })
                }
              >
                Watch
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-4 py-2 text-sm text-fg-muted"
            >
              <Link
                href={withUtm(release.appleUrl, { platform: "other", context: "release-card", label: release.title })}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackOutbound("apple_click", release.appleUrl, {
                    platform: "other",
                    context: "release-card",
                    label: release.title,
                  })
                }
              >
                Apple Music
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
