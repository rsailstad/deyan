import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Youtube, Music2, Download, Mail, ExternalLink, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Electronic Press Kit (EPK)",
  description: "Official EPK for Bucharest-based hip-hop artist Deyan. Bio, key releases, press assets, and management contacts.",
};

export default function EpkPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[var(--accent-green)]">
          <span>Electronic Press Kit (EPK)</span>
        </div>
        <h1 className="mt-4 text-5xl font-black text-white sm:text-6xl">DEYAN</h1>
        <p className="mt-2 text-base font-mono uppercase tracking-widest text-fg-muted">
          Underground Hip-Hop // Dark Wave // Bucharest, Romania
        </p>
      </div>

      {/* Hero Overview Grid */}
      <div className="mt-10 grid gap-8 md:grid-cols-12 items-center">
        <div className="relative aspect-square md:col-span-5 overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
          <Image
            src="/images/ssyss-cover.jpg"
            alt="Seven Seas You Should Swim Album Cover"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="md:col-span-7 space-y-5">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-green)]">
            Focus Era: Seven Seas You Should Swim (SSYSS)
          </span>
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Dark Cinematic Soundscapes & Introspective Songwriting
          </h2>
          <p className="text-sm text-fg-muted leading-relaxed">
            Sitting at the intersection of cinematic hip-hop, dark experimental wave, and atmospheric worldbuilding, Bucharest-based 16-year-old artist and self-producer Deyan blends heavy 808s with razor-sharp songwriting.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1db954] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#1ed760]"
            >
              <Music2 className="h-4 w-4 fill-current" />
              Spotify Artist Profile
            </Link>
            <Link
              href="https://www.youtube.com/@realdeyan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-red-500"
            >
              <Youtube className="h-4 w-4 fill-current" />
              YouTube Channel
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Performance Film */}
      <section className="mt-16 rounded-3xl border border-white/15 bg-gradient-to-r from-purple-950/30 via-black to-black p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <a
            href="https://youtu.be/uXT1oRVVfFI"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-video w-full md:w-72 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-black"
          >
            <Image
              src="https://i.ytimg.com/vi/uXT1oRVVfFI/maxresdefault.jpg"
              alt="Seven Seas You Should Swim @ Oclu Events"
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="h-10 w-10 fill-white text-white" />
            </div>
          </a>
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-green)]">
              Full Concert Film
            </span>
            <h3 className="text-xl font-bold text-white">
              Seven Seas You Should Swim: The Experience @ Oclu Events
            </h3>
            <p className="text-xs text-fg-muted">
              41-minute live concert recording featuring 14 self-produced tracks, multi-channel stems, and live visual performance in Bucharest.
            </p>
            <a
              href="https://youtu.be/uXT1oRVVfFI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-red-400 hover:underline pt-2"
            >
              Watch Full Film on YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Discography & Key Releases */}
      <section className="mt-16">
        <h2 className="text-2xl font-black text-white mb-6">Key Releases</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-green)]">Album</span>
            <h4 className="font-bold text-white">Seven Seas You Should Swim (SSYSS)</h4>
            <p className="text-xs text-fg-muted">Sophomore record featuring lead single Lemon Tree and Wave: 31st Sedative.</p>
            <a href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#1db954] hover:underline pt-1">
              Listen on Spotify <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-green)]">Single</span>
            <h4 className="font-bold text-white">Wave: 31st Sedative</h4>
            <p className="text-xs text-fg-muted">1.5K+ organic views. Nocturnal 808 bass & dark wave atmosphere.</p>
            <a href="https://www.youtube.com/watch?v=am5f5fLTpLs" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline pt-1">
              Watch Video <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-green)]">Single / Video</span>
            <h4 className="font-bold text-white">Lemon Tree</h4>
            <p className="text-xs text-fg-muted">Official music video directed and edited by Deyan-Iosif Iary.</p>
            <a href="https://youtu.be/D45ntFK-XlI" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-red-400 hover:underline pt-1">
              Watch Video <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Press Contact & Download Section */}
      <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
        <h2 className="text-2xl font-black text-white">Management & Press Inquiries</h2>
        <p className="mt-2 text-sm text-fg-muted max-w-md mx-auto">
          For feature coverage, playlist additions, premiere inquiries, and festival/booking requests.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:music@realdeyan.com?subject=EPK%20Inquiry%20-%20Deyan"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-white/90"
          >
            <Mail className="h-4 w-4" />
            Email music@realdeyan.com
          </a>
          <a
            href="/images/ssyss-cover.jpg"
            download="Deyan_SSYSS_Album_Artwork.jpg"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-mono uppercase tracking-widest text-white hover:bg-white/10 transition"
          >
            <Download className="h-4 w-4" />
            Download High-Res Artwork
          </a>
        </div>
      </section>
    </div>
  );
}
