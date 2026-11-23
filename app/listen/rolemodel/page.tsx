import type { Metadata } from "next";
import { getReleases } from "@/lib/content";
import { ListenClient } from "../ListenClient";

export const metadata: Metadata = {
  title: "Listen to Role Model by Deyan | Stream on Spotify & YouTube",
  description:
    "Stream Role Model from Seven Seas You Should Swim (SSYSS) by Bucharest artist Deyan. Watch the official visual release and stream on Spotify.",
  openGraph: {
    title: "Deyan - Role Model (Official Release)",
    description: "Stream the new track from Seven Seas You Should Swim on Spotify and YouTube.",
    url: "https://realdeyan.com/listen/rolemodel",
    siteName: "Deyan",
    images: [
      {
        url: "https://realdeyan.com/images/ssyss-cover.jpg",
        width: 1080,
        height: 1080,
        alt: "Deyan - Role Model (SSYSS) Cover Art",
      },
    ],
    type: "music.song",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deyan - Role Model | Stream on Spotify & YouTube",
    description: "Stream the new track from Seven Seas You Should Swim on Spotify and YouTube.",
    images: ["https://realdeyan.com/images/ssyss-cover.jpg"],
  },
};

export default function RoleModelListenPage() {
  const releases = getReleases();
  const initialRelease =
    releases.find((r) => r.title.toLowerCase().includes("role model")) ||
    releases[0];

  return <ListenClient initialRelease={initialRelease} allReleases={releases} />;
}
