import type { Metadata } from "next";
import { InteractiveHome } from "@/components/InteractiveHome";
import { getReleases, getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Deyan | Official Audio & Visual Archive",
  description:
    "Official website and archive for Bucharest-based hip-hop artist Deyan. Stream 'Wave: 31st Sedative', 'Lemon Tree', and the Seven Seas You Should Swim rollout.",
};

export default function HomePage() {
  const releases = getReleases();
  const videos = getVideos();

  return <InteractiveHome releases={releases} videos={videos} />;
}
