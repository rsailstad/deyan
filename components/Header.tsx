"use client";

import Link from "next/link";
import { Menu, PlayCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Nav } from "@/components/Nav";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const spotifyUrl = "https://open.spotify.com/artist/5examplerealDEYAN";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleCtaClick = () => {
    const url = withUtm(spotifyUrl, {
      platform: "spotify",
      context: "header",
    });
    trackOutbound("spotify_click", url, { platform: "spotify", context: "header" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur-lg",
        "bg-[rgba(11,11,12,0.72)] border-b border-white/5",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-[0.4em] text-fg"
          aria-label="realDEYAN home"
        >
          <span className="text-gradient text-xl font-bold">realDEYAN</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Nav />
          <Button
            asChild
            className="rounded-full bg-[var(--accent-violet)] px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            <Link
              href={spotifyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleCtaClick}
            >
              <div className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" aria-hidden />
                <span>Listen on Spotify</span>
              </div>
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0b0b0c] text-fg">
            <div className="flex flex-col gap-8 pt-12">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-lg font-semibold tracking-[0.35em]"
              >
                realDEYAN
              </Link>
              <Nav orientation="vertical" onNavigate={() => setOpen(false)} />
              <Button
                asChild
                className="rounded-full bg-[var(--accent-violet)] py-6 text-base font-semibold text-white"
              >
                <Link
                  href={withUtm(spotifyUrl, { platform: "spotify", context: "header-mobile" })}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackOutbound("spotify_click", spotifyUrl, {
                      platform: "spotify",
                      context: "header-mobile",
                    });
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" aria-hidden />
                    <span>Play on Spotify</span>
                  </div>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
