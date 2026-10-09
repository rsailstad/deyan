"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Youtube,
  Music2,
  Play,
  ExternalLink,
  Mail,
  Calendar,
  ArrowRight,
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

const SPOTIFY_URL = "https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56";
const YOUTUBE_URL = "https://www.youtube.com/@realdeyan";
const INSTAGRAM_URL = "https://www.instagram.com/realdeyan/";
const APPLE_URL = "https://music.apple.com/us/artist/deyan/1234567890";
const CONTACT_EMAIL = "realdeyan@gmail.com";

export function InteractiveHome({ releases, videos }: InteractiveHomeProps) {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const featuredVideo = videos[0];

  // Oclu event info
  const eventVenue = "Oclu Events";
  const eventCity = "Bucharest";

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      // Open email client with prefilled subject
      const subject = encodeURIComponent("Add me to the Deyan email list");
      const body = encodeURIComponent(`Email: ${emailInput}\n\nAdd me to the list for exclusive drops, unreleased tracks, and event invites.`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setEmailSent(true);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* ============================================================
          1. HERO - Artistic tagline + featured video thumbnail
          (Adapted from misskrystle.com: poetic tagline + clickable video)
      ============================================================ */}
      <section className="relative min-h-[88vh] flex flex-col justify-center px-4 pt-28 pb-12 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-900/20 blur-[130px] -z-10 pointer-events-none" />

        {/* Artistic tagline */}
        <div className="text-center mb-10">
          <p className="text-base sm:text-lg font-light italic text-white/70 leading-relaxed max-w-2xl mx-auto">
            Swimming through the noise of modern decay. Self-produced soundscapes from the underground.
          </p>
        </div>

        {/* Name */}
        <h1 className="text-center text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight text-white leading-none mb-8">
          <span className="text-gradient">DEYAN</span>
        </h1>

        {/* Featured video thumbnail (clickable to YouTube) */}
        <div className="max-w-2xl mx-auto w-full">
          <a
            href={`https://youtu.be/${featuredVideo?.youtubeId || "am5f5fLTpLs"}`}
            target="_blank"
            rel="noreferrer"
            className="group block relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl transition-all hover:border-white/30"
          >
            {featuredVideo && (
              <Image
                src={featuredVideo.thumb}
                alt={featuredVideo.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-xs font-bold uppercase tracking-widest text-black shadow-2xl transition group-hover:bg-white group-hover:scale-110">
                <Play className="h-4 w-4 fill-current translate-x-0.5" />
                Watch Latest
              </span>
            </div>
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-green)]">
                  Latest Drop
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {featuredVideo?.title || "31st Sedative"}
                </h3>
              </div>
            </div>
          </a>
        </div>

        {/* Quick action button row */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={SPOTIFY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1db954] px-6 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(29,185,84,0.35)] transition-all hover:bg-[#1ed760] hover:scale-105 active:scale-95"
          >
            <Music2 className="h-4 w-4 fill-current" />
            Stream on Spotify
          </Link>
          <Link
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            <Youtube className="h-4 w-4 fill-red-500" />
            Subscribe on YouTube
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            Booking & Inquiries
          </Link>
        </div>

        {/* Audio wave visualizer */}
        <div className="mt-10 max-w-lg mx-auto w-full">
          <AudioWaveVisualizer />
        </div>
      </section>

      {/* ============================================================
          2. EMAIL LIST SIGNUP
          (Adapted from misskrystle.com: "Sign Up To My Email List")
      ============================================================ */}
      <section className="relative z-10 mx-auto max-w-2xl px-4 py-16 sm:px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-12 backdrop-blur-md">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)] mb-3">
            Stay Connected
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Join the List
          </h2>
          <p className="text-sm text-fg-muted max-w-md mx-auto mb-6">
            Exclusive drops, unreleased tracks, event invites, and early access to everything Deyan.
          </p>

          {emailSent ? (
            <p className="text-sm text-[var(--accent-green)] font-semibold">
              Your email client should have opened. Thanks for joining.
            </p>
          ) : (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent-green)] focus:bg-white/10"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/90 active:scale-95"
              >
                Sign Up
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-white/30">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ============================================================
          3. OCLU EVENT - Upcoming show
          (Surface the hidden event as a focal point)
      ============================================================ */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-[var(--accent-green)]/20 bg-gradient-to-r from-[var(--accent-green)]/5 to-transparent p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center justify-center rounded-xl bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 px-4 py-3 shrink-0">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-green)]">Nov</span>
                <span className="text-2xl font-black text-white leading-none mt-1">14</span>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent-green)] mb-1">
                  Live Listening Experience
                </p>
                <h3 className="text-lg font-bold text-white">
                  SEVEN SEAS (SSYSS) @ {eventVenue}
                </h3>
                <p className="text-sm text-fg-muted mt-1">
                  {eventCity} - 20:00 EEST - RSVP Required
                </p>
                <p className="text-xs text-white/40 mt-2">
                  Intimate preview of unreleased tracks. 120 guests max.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=RSVP%20SSYSS%20Listening%20Experience`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-green)] px-5 py-2.5 text-sm font-bold text-black transition hover:scale-105 active:scale-95 shrink-0"
            >
              <Calendar className="h-4 w-4" />
              RSVP
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. ALBUM / MUSIC GRID
          (Adapted from misskrystle.com: row of album covers linking to all platforms)
      ============================================================ */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
              Catalog
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white">
              The Archive
            </h2>
          </div>
          <Link
            href="/music"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-fg-muted hover:text-white transition"
          >
            Full Discography <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Album cover row - scrollable on mobile, grid on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {releases.slice(0, 5).map((release) => (
            <a
              key={release.title}
              href={release.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-all duration-300 group-hover:border-white/30 group-hover:scale-[1.03]">
                <Image
                  src={release.cover}
                  alt={release.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-8 w-8 fill-white text-white" />
                </div>
              </div>
              <p className="mt-2 text-xs font-mono text-white/40">{formatDate(release.releaseDate)}</p>
              <h3 className="text-sm font-bold text-white group-hover:text-[var(--accent-green)] transition-colors truncate">
                {release.title}
              </h3>
            </a>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/music"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-fg-muted hover:text-white transition"
          >
            Full Discography <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      {/* ============================================================
          5. SPOTIFY EMBEDDED PLAYER
      ============================================================ */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-[#0d0d14]/80 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
                Direct Audio Stream
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">Listen on Spotify</h2>
            </div>
            <Link
              href={SPOTIFY_URL}
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

      {/* ============================================================
          6. VIDEO GALLERY
      ============================================================ */}
      <section className="relative z-10 bg-[#08080c] py-20 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
                Motion & Direction
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white">
                Visual Archive
              </h2>
            </div>
            <Link
              href={YOUTUBE_URL}
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
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c15]/80 transition hover:border-white/20"
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
                      <Play className="h-3.5 w-3.5 fill-current" /> Watch
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-mono uppercase tracking-widest text-fg-muted">
                    {formatDate(vid.date)}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">{vid.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted line-clamp-2">{vid.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          7. PLATFORM LINKS ROW
          (Adapted from misskrystle.com: all streaming platforms in one row)
      ============================================================ */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
            Find Deyan Everywhere
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <Music2 className="h-6 w-6 text-[#1db954]" />
              <span className="text-xs font-semibold text-white">Spotify</span>
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <Youtube className="h-6 w-6 text-red-500" />
              <span className="text-xs font-semibold text-white">YouTube</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <svg className="h-6 w-6 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.281.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.444 1.441 1.444 1.441-.648 1.441-1.444-.645-1.441-1.441-1.441z"/>
              </svg>
              <span className="text-xs font-semibold text-white">Instagram</span>
            </a>
            <a
              href={APPLE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <Music2 className="h-6 w-6 text-white/70" />
              <span className="text-xs font-semibold text-white">Apple Music</span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/25 hover:bg-white/10"
            >
              <Mail className="h-6 w-6 text-white/70" />
              <span className="text-xs font-semibold text-white">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. BOOKING & COLLABORATION
          (Adapted from misskrystle.com: "Collaboration / Interview Requests")
      ============================================================ */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-12 text-center backdrop-blur-md">
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-[var(--accent-green)] mb-4">
            Booking & Collaboration
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Let&apos;s Build Something Dark
          </h2>
          <p className="text-sm text-fg-muted max-w-md mx-auto mb-8">
            All management, booking, licensing, and press inquiries go through the same channel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-white/90"
            >
              <Mail className="h-4 w-4" />
              Send Inquiry
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-widest text-white hover:bg-white/10 transition"
            >
              Read Bio
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          9. BRAND FOOTER
          (Adapted from misskrystle.com: "Dukes Up Records")
      ============================================================ */}
      <section className="relative z-10 border-t border-white/5 bg-[#08080c] py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-gradient text-3xl font-black uppercase tracking-[0.55em] drop-shadow-[0_0_18px_rgba(181,255,63,0.35)]">
            D<span className="text-white">EYAN</span>
          </p>
          <p className="mt-3 text-xs font-mono uppercase tracking-[0.3em] text-white/30">
            SSYSS // Seven Seas You Should Swim // Bucharest
          </p>
          <p className="mt-6 text-xs text-white/20">
            {new Date().getFullYear()} Deyan. All rights reserved. Self-produced in Bucharest.
          </p>
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
