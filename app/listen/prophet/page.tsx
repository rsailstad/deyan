import type { Metadata } from "next";
import { getReleases } from "@/lib/content";
import { ListenClient } from "../ListenClient";

export const metadata: Metadata = {
  title: "Listen to Prophet by Deyan | Stream on Spotify",
  description:
    "Stream Prophet, the underground hip-hop single by Bucharest artist Deyan. Available now on Spotify, YouTube, and Apple Music.",
  openGraph: {
    title: "Deyan - Prophet (Official Release)",
    description: "Stream the single on Spotify and watch the official music video.",
    url: "https://realdeyan.com/listen/prophet",
    siteName: "Deyan",
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d0000b273e3b11c27de85ccb0a7155e0f",
        width: 640,
        height: 640,
        alt: "Deyan - Prophet Cover Art",
      },
    ],
    type: "music.song",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deyan - Prophet | Stream on Spotify",
    description: "Stream the single on Spotify and watch the official music video.",
    images: ["https://i.scdn.co/image/ab67616d0000b273e3b11c27de85ccb0a7155e0f"],
  },
};

export default function ProphetListenPage() {
  const releases = getReleases();
  const initialRelease =
    releases.find((r) => r.title.toLowerCase() === "prophet") ||
    releases[0];

  return <ListenClient initialRelease={initialRelease} allReleases={releases} />;
}
