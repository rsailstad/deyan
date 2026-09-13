import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyStreamingDock } from "@/components/StickyStreamingDock";
import { Toaster } from "sonner";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg text-fg pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.22),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <Header />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <StickyStreamingDock
        latestTrackTitle="Wave: 31st Sedative"
        youtubeUrl="https://www.youtube.com/watch?v=am5f5fLTpLs"
        spotifyUrl="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
      />
      <Footer />
      <Analytics />
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </div>
  );
}
