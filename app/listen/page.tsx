import type { Metadata } from "next";
import { getReleases } from "@/lib/content";
import { ListenClient } from "./ListenClient";

export const metadata: Metadata = {
  title: "Listen to Lemon Tree by Deyan | Stream on Spotify",
  description:
    "Stream Lemon Tree, the latest underground hip-hop release by Bucharest artist Deyan. Available now on Spotify, YouTube, and Apple Music.",
  openGraph: {
    title: "Deyan - Lemon Tree (Official Release)",
    description: "Stream the new single on Spotify and watch the official music video.",
    url: "https://realdeyan.com/listen",
    siteName: "Deyan",
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d0000b2738bac069cdcd69bc0a842f491",
        width: 640,
        height: 640,
        alt: "Deyan - Lemon Tree Cover Art",
      },
    ],
    type: "music.song",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deyan - Lemon Tree | Stream on Spotify",
    description: "Stream the new single on Spotify and watch the official music video.",
    images: ["https://i.scdn.co/image/ab67616d0000b2738bac069cdcd69bc0a842f491"],
  },
};

export default function ListenPage() {
  const releases = getReleases();
  
  // Find Lemon Tree as initial focus release, or default to the top release
  const initialRelease =
    releases.find((r) => r.title.toLowerCase().includes("lemon tree")) ||
    releases[0];

  return <ListenClient initialRelease={initialRelease} allReleases={releases} />;
}
