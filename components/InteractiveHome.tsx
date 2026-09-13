"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Youtube,
  Music2,
  Play,
  Disc3,
  ExternalLink,
} from "lucide-react";

import { AudioWaveVisualizer } from "@/components/AudioWaveVisualizer";
import { YouTubeModal } from "@/components/YouTubeModal";
import { formatDate } from "@/lib/utils";

export interface ReleaseItem {
  title: string;
  cover: string;
  spotifyUrl: string;
  youtubeUrl: string;
  appleUrl: string;
  releaseDate: string;
  tags: string[];
}

export interface VideoItem {
  title: string;
  youtubeId: string;
  thumb: string;
  date: string;
  description: string;
}

interface InteractiveHomeProps {
  releases: ReleaseItem[];
  videos: VideoItem[];
}

export function InteractiveHome({ releases, videos }: InteractiveHomeProps) {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [embedVideoId, setEmbedVideoId] = useState<string | null>(null);

  const latestRelease = releases[0];

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO / LIVE TRANSMISSION SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-4 pt-28 pb-16 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-900/20 blur-[130px] -z-10 pointer-events-none" />

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono tracking-widest text-[var(--accent-green)] mb-6 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
              <span>SSYSS // SEVEN SEAS ARCHIVE</span>
            </div>

            <h1 className="text-balance text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
              REAL<span className="text-gradient">DEYAN</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-fg-muted max-w-xl leading-relaxed">
              Dark cinematic hip-hop, distorted low-end, and introspective underground storytelling from Bucharest. Self-produced soundscapes exploring desire, ego, and modern decay.
            </p>

            {/* Audio Wave Visualizer Box */}
            <div className="mt-8 max-w-lg">
              <AudioWaveVisualizer />
            </div>

            {/* Main Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1db954] px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_30px_rgba(29,185,84,0.35)] transition-all hover:bg-[#1ed760] hover:scale-105 active:scale-95"
              >
                <Music2 className="h-4 w-4 fill-current" />
                Stream on Spotify
              </Link>

              <Link
                href="https://www.youtube.com/@realdeyan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
              >
                <Youtube className="h-4 w-4 fill-red-500" />
                Subscribe on YouTube
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 max-w-lg">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/40">Latest Drop</p>
                <p className="mt-1 font-semibold text-white text-sm truncate">31st Sedative</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/40">Catalog</p>
                <p className="mt-1 font-semibold text-white text-sm">46+ Releases</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-white/40">Status</p>
                <p className="mt-1 font-semibold text-[var(--accent-green)] text-sm">Active Rollout</p>
              </div>
            </div>
          </div>

          {/* Featured Spotlight Card with Embedded Player */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 to-lime-500/20 blur-xl opacity-75" />
            <div className="relative rounded-3xl border border-white/15 bg-[#0e0e16]/90 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Disc3 className="h-4 w-4 text-[var(--accent-green)] animate-spin" />
                  <span className="text-xs font-mono tracking-wider text-white/70 uppercase">
                    Featured Transmission
                  </span>
                </div>
                <span className="text-xs font-mono text-white/40">{latestRelease.releaseDate}</span>
              </div>

              {/* Video Player or Thumbnail */}
              <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                {embedVideoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${embedVideoId}?autoplay=1&rel=0`}
                    title="Deyan Music Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full group">
                    <Image
                      src={latestRelease.cover}
                      alt={latestRelease.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setEmbedVideoId("am5f5fLTpLs")}
                        className="group/btn flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-black px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-2xl transition hover:scale-110 active:scale-95"
                      >
                        <Play className="h-4 w-4 fill-current translate-x-0.5" />
                        Play Instantly
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-green)]">
                          Lead Audio Single
                        </span>
                        <h3 className="text-lg font-bold text-white">{latestRelease.title}</h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-fg-muted leading-relaxed">
                Experience the atmospheric underground wave sound. Heavy distorted basslines paired with cinematic pacing and lyricism.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  href={latestRelease.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 py-2.5 text-xs font-semibold text-white transition"
                >
                  <Youtube className="h-4 w-4 text-red-500" />
                  YouTube Visual
                </Link>
                <Link
                  href={latestRelease.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 py-2.5 text-xs font-semibold text-white transition"
                >
                  <Music2 className="h-4 w-4 text-emerald-400" />
                  Spotify Master
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPOTIFY EMBEDDED STREAMING PLAYER */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-[#0d0d14]/80 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
                Direct Audio Stream
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">Listen to Deyan on Spotify</h2>
            </div>
            <Link
              href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
              target="_blank"
              rel="noreferrer"
              className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1db954] hover:underline"
            >
              Open Spotify App <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
          <iframe
            style={{ borderRadius: "16px" }}
            src="https://open.spotify.com/embed/artist/0m4xsZn25PBXtXokxXBT56?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Deyan Spotify Streamer"
          />
        </div>
      </section>

      {/* 3. DISCOGRAPHY GRID */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
              Vault & Discography
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white">
              Official Sonic Releases
            </h2>
          </div>
          <Link
            href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
            target="_blank"
            rel="noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-fg-muted hover:text-white transition"
          >
            Full Spotify Profile <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((release) => (
            <div
              key={release.title}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0d14]/70 p-4 transition-all duration-300 hover:border-white/25 hover:bg-[#12121c]"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/40">
                  <Image
                    src={release.cover}
                    alt={release.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white/80 backdrop-blur-md">
                      {release.tags[0]}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] font-mono text-white/40">{formatDate(release.releaseDate)}</p>
                  <h3 className="mt-1 text-base font-bold text-white group-hover:text-[var(--accent-green)] transition-colors">
                    {release.title}
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 pt-3 border-t border-white/10">
                <Link
                  href={release.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 py-2 text-xs font-medium text-white transition"
                >
                  <Music2 className="h-3.5 w-3.5 text-[#1db954]" />
                  Spotify
                </Link>
                <Link
                  href={release.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 py-2 text-xs font-medium text-white transition"
                >
                  <Youtube className="h-3.5 w-3.5 text-red-500" />
                  YouTube
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VIDEO GALLERY WITH INSTANT PLAYBACK MODAL */}
      <section className="relative z-10 bg-[#08080c] py-20 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
                Motion & Direction
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white">
                Official Visual Gallery
              </h2>
            </div>
            <Link
              href="https://www.youtube.com/@realdeyan"
              target="_blank"
              rel="noreferrer"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-red-400 hover:text-red-300 transition"
            >
              Watch All on YouTube <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.youtubeId}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c15]/80 transition hover:border-white/20"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveModalVideo(vid)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveModalVideo(vid);
                    }
                  }}
                  className="relative h-64 w-full cursor-pointer overflow-hidden group"
                >
                  <Image
                    src={vid.thumb}
                    alt={`${vid.title} thumbnail`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/60">
                    <span className="flex items-center gap-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 text-xs font-mono uppercase tracking-widest text-white transition">
                      <Play className="h-3.5 w-3.5 fill-current" /> Watch Video
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-mono uppercase tracking-widest text-fg-muted">
                    {formatDate(vid.date)}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">{vid.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-2">{vid.description}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalVideo(vid)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition"
                    >
                      <Play className="h-3 w-3 fill-current" /> Play in Modal
                    </button>
                    <Link
                      href={`https://youtu.be/${vid.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 transition"
                    >
                      <Youtube className="h-3 w-3 fill-current" /> Open in YouTube
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ARTIST STATEMENT / PRESS GATEWAY */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 py-24 sm:px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-14 backdrop-blur-md">
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-[var(--accent-green)]">
            Artist Statement
          </p>
          <blockquote className="mt-6 text-lg sm:text-2xl font-light italic text-white/90 leading-relaxed">
            &ldquo;Sitting at the intersection of cinematic hip-hop, dark funk, and experimental storytelling. Exploring the psychological effects of modern culture through self-produced soundscapes.&rdquo;
          </blockquote>
          <p className="mt-4 text-xs font-mono text-white/40 tracking-wider">
            DEYAN // BUCHAREST // SSYSS
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-white hover:bg-white/10 transition"
            >
              Read Full Dossier
            </Link>
            <Link
              href="mailto:realdeyan@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-black font-semibold hover:bg-white/90 transition"
            >
              Direct Inquiries
            </Link>
          </div>
        </div>
      </section>

      {/* POPUP YOUTUBE MODAL */}
      {activeModalVideo && (
        <YouTubeModal
          open={Boolean(activeModalVideo)}
          video={activeModalVideo}
          onOpenChange={(open) => {
            if (!open) setActiveModalVideo(null);
          }}
        />
      )}
    </div>
  );
}
