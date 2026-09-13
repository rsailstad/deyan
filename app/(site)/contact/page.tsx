import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Music2, Youtube, Instagram, ShieldCheck, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Deyan",
  description: "Official management, booking, licensing, and press inquiries for Deyan.",
};

const inquiryCategories = [
  {
    title: "Booking & Live Shows",
    description: "Festival appearances, live venue bookings, showcase sets, and club events.",
    subject: "Booking Inquiry - Deyan",
  },
  {
    title: "Sync, Film & Licensing",
    description: "Master and publishing clearance for film, television, games, and commercial media.",
    subject: "Sync & Licensing Request - Deyan",
  },
  {
    title: "Production & Collabs",
    description: "Beats, features, producer collaboration, stems, and songwriting.",
    subject: "Production / Collaboration - Deyan",
  },
  {
    title: "Press & Curators",
    description: "Interviews, editorial features, review coverage, and playlist consideration.",
    subject: "Press / Playlist Pitch - Deyan",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 pt-28">
      {/* Header */}
      <header className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono tracking-widest text-[var(--accent-green)] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
          <span>MANAGEMENT & INQUIRIES</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Contact Representation
        </h1>
        <p className="mt-4 text-base text-fg-muted leading-relaxed">
          All professional business, bookings, licensing, and creative inquiries are managed directly by representation.
        </p>
      </header>

      {/* Main Direct Email Action Card */}
      <div className="mt-12 rounded-[32px] border border-white/15 bg-[#0e0e17]/90 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
              Direct Inbox
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
              realdeyan@gmail.com
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Managed inbox • Typical response time: within 24 hours
            </p>
          </div>

          <Link
            href="mailto:realdeyan@gmail.com"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--accent-green)] hover:bg-[#c2ff57] px-7 py-3.5 text-sm font-bold text-black transition hover:scale-105 active:scale-95 shadow-lg shrink-0"
          >
            <Mail className="h-4 w-4 text-black" />
            Send Email
          </Link>
        </div>

        {/* Structured Inquiry Triggers */}
        <div className="mt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-white/50 mb-4">
            Select an inquiry type for a pre-formatted email:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {inquiryCategories.map((cat) => (
              <Link
                key={cat.title}
                href={`mailto:realdeyan@gmail.com?subject=${encodeURIComponent(cat.subject)}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/25 hover:bg-white/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--accent-green)] transition">
                      {cat.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
                  </div>
                  <p className="mt-2 text-xs text-fg-muted leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <span className="mt-4 text-[11px] font-mono text-[var(--accent-green)]">
                  Draft {cat.title.split(" ")[0]} Email →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Protection / Minor Policy Notice */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-4 flex items-start gap-3 text-xs text-fg-muted">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Professional & Privacy Boundary:</strong> As Deyan is an independent minor artist, direct social media DMs are filtered. All contracts, bookings, sponsorships, and collaboration negotiations must route through management via email.
          </div>
        </div>
      </div>

      {/* Official Social & Streaming Channels */}
      <div className="mt-12 rounded-[32px] border border-white/10 bg-[#0c0c14]/80 p-8">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-green)]">
          Follow The Rollout
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white">
          Official Artist Channels
        </h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition group"
          >
            <div className="flex items-center gap-3">
              <Music2 className="h-5 w-5 text-[#1db954]" />
              <div>
                <p className="text-sm font-bold text-white">Spotify</p>
                <p className="text-[11px] text-white/40">Verified Artist</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
          </Link>

          <Link
            href="https://www.youtube.com/@realdeyan"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition group"
          >
            <div className="flex items-center gap-3">
              <Youtube className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-bold text-white">YouTube</p>
                <p className="text-[11px] text-white/40">@realdeyan</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
          </Link>

          <Link
            href="https://www.instagram.com/realdeyan/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition group"
          >
            <div className="flex items-center gap-3">
              <Instagram className="h-5 w-5 text-pink-400" />
              <div>
                <p className="text-sm font-bold text-white">Instagram</p>
                <p className="text-[11px] text-white/40">@realdeyan</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
