import type { Metadata } from "next";
import { InteractiveHome } from "@/components/InteractiveHome";
import { JsonLd } from "@/components/JsonLd";
import { getReleases, getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Deyan",
  description:
    "Official website and archive for Bucharest-based hip-hop artist Deyan. Out Now: 'Seven Seas You Should Swim' (SSYSS) album on Spotify & YouTube.",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  const releases = getReleases();
  const videos = getVideos();

  return (
    <>
      <JsonLd releases={releases} videos={videos} />
      <InteractiveHome releases={releases} videos={videos} />
    </>
  );
}
