"use client";

import { Instagram, Music2, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackOutbound, withUtm } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/5examplerealDEYAN",
    icon: Music2,
    platform: "spotify" as const,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@realdeyan",
    icon: Youtube,
    platform: "youtube" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/deyan",
    icon: Instagram,
    platform: "instagram" as const,
  },
];

interface SocialRowProps {
  className?: string;
  context?: string;
  variant?: "ghost" | "solid";
}

export function SocialRow({ className, context = "footer", variant = "ghost" }: SocialRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {SOCIAL_LINKS.map(({ href, label, icon: Icon, platform }) => {
        const trackedHref = withUtm(href, { platform, context });
        return (
          <Button
            key={platform}
            asChild
            variant={variant === "ghost" ? "ghost" : "default"}
            className={cn(
              "group rounded-full border border-white/10 px-4 py-2",
              variant === "solid"
                ? "bg-[var(--accent-violet)] text-white shadow-[var(--glow-violet)]"
                : "bg-transparent text-fg",
            )}
          >
            <a
              href={trackedHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackOutbound(`${platform}_click`, trackedHref, { platform, context })}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{label}</span>
            </a>
          </Button>
        );
      })}
    </div>
  );
}
