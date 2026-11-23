"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Music2, Play, ExternalLink, CheckCircle2 } from "lucide-react";
import type { Release } from "@/components/ReleaseCard";
import { trackOutbound, withUtm } from "@/lib/analytics";

interface ListenClientProps {
  initialRelease: Release;
  allReleases: Release[];
}

export function ListenClient({ initialRelease, allReleases }: ListenClientProps) {
  const [currentRelease, setCurrentRelease] = useState<Release>(initialRelease);

  const handleOutbound = (
    platform: "spotify" | "youtube" | "apple",
    url: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    trackOutbound(`listen_${platform}`, url, {
      platform,
      context: "listen_smart_link",
      label: currentRelease.title,
    });
  };

  const spotifyTarget = withUtm(currentRelease.spotifyUrl, {
    platform: "spotify",
    context: "meta_ad_smartlink",
    label: currentRelease.title,
  });

  const youtubeTarget = withUtm(currentRelease.youtubeUrl, {
    platform: "youtube",
    context: "meta_ad_smartlink",
    label: currentRelease.title,
  });

  const hasValidAppleUrl =
    Boolean(currentRelease.appleUrl) &&
    !currentRelease.appleUrl.includes("1234567890") &&
    !currentRelease.appleUrl.includes("6GpedMdbQvByp6IlgiL25c") &&
    !currentRelease.appleUrl.includes("0P8rmFRZXf5gqD1B3gcPIX") &&
    !currentRelease.appleUrl.includes("0oEfyZmJ1hdAj1BLXHVHfB") &&
    !currentRelease.appleUrl.includes("0oNLdEU8xMhLq6I7gFMXhH");

  const appleTarget = hasValidAppleUrl
    ? withUtm(currentRelease.appleUrl, {
        platform: "apple",
        context: "meta_ad_smartlink",
        label: currentRelease.title,
      })
    : "";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 sm:py-12 overflow-hidden bg-black text-white selection:bg-emerald-500 selection:text-black font-sans">
      {/* Dynamic blurred ambient glow behind cover */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.8) 0%, rgba(124,58,237,0.5) 50%, transparent 70%)",
        }}
      />
      
      {/* Background grid overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      {/* Main Container */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center z-10 space-y-6">
        
        {/* Artist Header / Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-zinc-300 font-medium">
            New Album + Full Catalog on Spotify & YouTube
          </span>
        </div>

        {/* Artwork Card */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950/40 border border-white/10 group">
          <Image
            src={currentRelease.cover}
            alt={currentRelease.title}
            fill
            priority
            sizes="(max-width: 640px) 256px, 288px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </div>

        {/* Track & Artist Info */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            {currentRelease.title}
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-sm font-medium">
            <span>Deyan</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-500">Bucharest Underground</span>
          </div>
        </div>

        {/* Audio Visualizer Pulse Bars */}
        <div className="flex items-center gap-1 h-4">
          <div className="w-1 bg-emerald-400/80 rounded-full animate-bounce [animation-delay:0.1s] h-3" />
          <div className="w-1 bg-emerald-400/80 rounded-full animate-bounce [animation-delay:0.3s] h-4" />
          <div className="w-1 bg-emerald-400/80 rounded-full animate-bounce [animation-delay:0.2s] h-2" />
          <div className="w-1 bg-emerald-400/80 rounded-full animate-bounce [animation-delay:0.4s] h-3.5" />
          <div className="w-1 bg-emerald-400/80 rounded-full animate-bounce [animation-delay:0.15s] h-2.5" />
        </div>

        {/* Streaming Platform CTA Stack */}
        <div className="w-full space-y-3 pt-2">
          
          {/* PRIMARY: SPOTIFY (The conversion goal) */}
          <a
            href={spotifyTarget}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleOutbound("spotify", currentRelease.spotifyUrl, e)}
            className="group relative flex items-center justify-between w-full px-5 py-4 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#1DB954]/25 hover:shadow-[#1DB954]/40"
          >
            <div className="flex items-center gap-3">
              {/* Spotify Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306a.754.754 0 0 1-1.037.25c-2.842-1.737-6.42-2.13-10.635-1.168a.752.752 0 1 1-.336-1.467c4.615-1.055 8.57-.611 11.758 1.348.36.22.47.69.25 1.037zm1.466-3.26a.94.94 0 0 1-1.296.311c-3.252-2-8.21-2.58-12.056-1.413a.942.942 0 0 1-.555-1.801c4.394-1.334 9.873-.687 13.596 1.606.422.26.554.815.311 1.297zm.126-3.398c-3.899-2.316-10.334-2.53-14.076-1.393a1.13 1.13 0 1 1-.663-2.161c4.298-1.306 11.398-1.055 15.89 1.613a1.13 1.13 0 0 1-1.151 1.941z"/>
              </svg>
              <div className="text-left">
                <div className="text-base leading-tight">Play on Spotify</div>
                <div className="text-xs font-semibold text-black/70">Full track & playlist add</div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-black/15 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider group-hover:bg-black/25">
              <span>Play</span>
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
          </a>

          {/* SECONDARY: YOUTUBE MUSIC VIDEO */}
          <a
            href={youtubeTarget}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleOutbound("youtube", currentRelease.youtubeUrl, e)}
            className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-red-500/50 text-white font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              {/* YouTube Icon */}
              <svg className="w-6 h-6 fill-[#FF0000]" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Watch Music Video</div>
                <div className="text-xs text-zinc-400">YouTube Official Release</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500" />
          </a>

          {/* YOUTUBE SUBSCRIBE DIRECT CONVERSION BUTTON */}
          <a
            href="https://www.youtube.com/@realdeyan?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleOutbound("youtube", "https://www.youtube.com/@realdeyan?sub_confirmation=1", e)}
            className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-white font-medium transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-bold text-red-100 group-hover:text-white">
                  Subscribe on YouTube
                </div>
                <div className="text-[11px] text-zinc-400">
                  New album drops, live concert videos & exclusives
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-red-600 group-hover:bg-red-500 text-[11px] font-bold text-white uppercase tracking-wider">
              Subscribe
            </span>
          </a>

          {/* TERTIARY: APPLE MUSIC (Only shown if valid link exists) */}
          {hasValidAppleUrl && (
            <a
              href={appleTarget}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleOutbound("apple", currentRelease.appleUrl, e)}
              className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 text-zinc-300 font-medium transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 fill-[#FA2D48]" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.088 5.75c.088 0 .177.01.265.03l.088.025c.088.024.168.064.24.119.071.054.129.124.173.208.043.085.065.18.065.286v6.079c0 .48-.13.882-.39 1.205-.26.323-.62.532-1.08.627l-.337.045c-.477.062-.882.203-1.216.423-.334.22-.589.516-.766.887-.176.371-.264.805-.264 1.303 0 .543.109 1.011.327 1.404.218.393.526.697.925.912.398.215.867.323 1.407.323.541 0 1.012-.11 1.413-.33.402-.22.709-.53.921-.931.212-.4.318-.879.318-1.436V8.672l6.096-1.503v6.398c0 .48-.13.883-.391 1.207-.26.324-.62.532-1.08.627l-.336.044c-.477.062-.883.203-1.217.423-.334.22-.589.516-.765.887-.176.371-.265.805-.265 1.303 0 .543.109 1.011.327 1.404.218.393.527.697.926.912.398.215.867.323 1.406.323.541 0 1.012-.11 1.413-.33.402-.22.709-.53.921-.931.212-.4.318-.879.318-1.436V4.183c0-.309-.108-.567-.323-.775-.215-.207-.492-.323-.83-.347L12.56 4.79c-.198.05-.371.144-.518.283-.148.138-.242.316-.282.533-.01.047-.015.095-.015.144h.167z"/>
                </svg>
                <span className="text-xs sm:text-sm">Apple Music</span>
              </div>
              <span className="text-xs text-zinc-500">Listen</span>
            </a>
          )}

        </div>

        {/* Other Discography Quick Picker */}
        <div className="w-full pt-4 border-t border-white/5">
          <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3 text-center">
            More Releases
          </div>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {allReleases.slice(0, 4).map((rel) => {
              const isSelected = rel.title === currentRelease.title;
              return (
                <button
                  key={rel.title}
                  type="button"
                  onClick={() => setCurrentRelease(rel)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-white/15 text-white border border-white/30"
                      : "bg-white/5 text-zinc-400 hover:text-white border border-transparent"
                  }`}
                >
                  <Music2 className="w-3 h-3" />
                  <span className="truncate max-w-[110px]">{rel.title}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 z-10 space-y-1">
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1"
        >
          <span>Official Artist Website</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
        <div className="text-[11px] text-zinc-600">
          © {new Date().getFullYear()} Deyan. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
