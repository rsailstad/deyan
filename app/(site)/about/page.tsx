import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Music2, Youtube, Instagram, Radio } from "lucide-react";

import BioContent from "@/content/bio.mdx";

export const metadata: Metadata = {
  title: "About | Deyan",
  description: "Deyan: Bucharest-based artist background, sonic DNA, and direct representation.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 pt-28">
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono tracking-widest text-[var(--accent-green)] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
          <span>DOSSIER // ARTIST PROFILE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">The Archive & Story</h1>
        <p className="mt-4 text-base text-fg-muted leading-relaxed">
          Background, artistic philosophy, and production narrative behind Deyan&apos;s music.
        </p>
      </header>

      {/* Bio Markdown content */}
      <div className="mt-10 glass-panel space-y-6 rounded-[32px] border-white/10 bg-[#0e0e16]/90 p-8 sm:p-12 backdrop-blur-xl">
        <BioContent />
      </div>

      {/* Direct Inquiries & Official Channels Card */}
      <div className="mt-10 rounded-[32px] border border-white/10 bg-[#0c0c14]/80 p-8 sm:p-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
              Direct Representation
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Management & Bookings</h2>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">
              For live bookings, synchronization licensing, production collaboration, and curator inquiries, please contact management directly.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="mailto:realdeyan@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-mono uppercase tracking-widest text-black font-semibold hover:bg-white/90 transition shadow-lg"
              >
                <Mail className="h-4 w-4 text-black" />
                realdeyan@gmail.com
              </Link>
            </div>
          </div>

          {/* Social & Streaming Links */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-white/50">
              Official Hubs
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 p-3 text-xs font-semibold text-white transition"
              >
                <Music2 className="h-4 w-4 text-[#1db954]" />
                <span>Spotify</span>
              </Link>
              <Link
                href="https://www.youtube.com/@realdeyan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 p-3 text-xs font-semibold text-white transition"
              >
                <Youtube className="h-4 w-4 text-red-500" />
                <span>YouTube</span>
              </Link>
              <Link
                href="https://www.instagram.com/realdeyan/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 p-3 text-xs font-semibold text-white transition"
              >
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>Instagram</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 p-3 text-xs font-semibold text-white transition"
              >
                <Radio className="h-4 w-4 text-[var(--accent-green)]" />
                <span>Contact Hub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
