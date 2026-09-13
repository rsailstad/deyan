import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Train,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Mail,
} from "lucide-react";

import { getEvents } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events & Live Sessions | Deyan",
  description:
    "Upcoming live listening experiences, secret pop-ups, and release events for Deyan in Bucharest.",
};

export default function EventsPage() {
  const events = getEvents();
  const mainEvent = events[0];

  return (
    <div className="relative min-h-screen pb-24 pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <header className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono tracking-widest text-[var(--accent-green)] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] animate-ping" />
            <span>LIVE & AUDIO EXPERIENCES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            Upcoming Events
          </h1>
          <p className="mt-4 text-base text-fg-muted leading-relaxed">
            Intimate listening sessions, release showcases, and live visual experiences exploring the SSYSS universe.
          </p>
        </header>

        {/* Featured Showcase Card */}
        {mainEvent && (
          <div className="relative mt-12">
            <div className="absolute -inset-1.5 rounded-[36px] bg-gradient-to-r from-purple-600/30 via-lime-400/20 to-purple-800/30 blur-xl opacity-75" />

            <div className="relative rounded-[32px] border border-white/15 bg-[#0e0e17]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
              {/* Event Badge & Date Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-mono uppercase tracking-widest text-emerald-400">
                    {mainEvent.status}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-white/50">
                    Bucharest Session #01
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <Calendar className="h-4 w-4 text-[var(--accent-green)]" />
                  <span>{formatDate(mainEvent.date)}</span>
                  <span className="text-white/30">•</span>
                  <Clock className="h-4 w-4 text-[var(--accent-green)]" />
                  <span>{mainEvent.time}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-6">
                <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {mainEvent.title}
                </h2>
                <p className="mt-4 text-base text-fg-muted leading-relaxed">
                  {mainEvent.description}
                </p>
              </div>

              {/* Event Key Highlights */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6">
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent-green)] mb-3 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" /> What to Expect
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-white/80">
                  {mainEvent.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location & Directions Block */}
              <div className="mt-8 grid lg:grid-cols-2 gap-6">
                {/* Venue Details */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50">
                      <MapPin className="h-4 w-4 text-red-400" />
                      <span>Venue & Area</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      {mainEvent.venue.name}
                    </h3>
                    <p className="text-xs font-mono text-[var(--accent-green)]">
                      {mainEvent.venue.tagline}
                    </p>

                    <p className="mt-3 text-sm text-white/80">
                      {mainEvent.venue.address}
                    </p>
                    <p className="text-xs text-white/50">
                      {mainEvent.venue.city}, {mainEvent.venue.postalCode} ({mainEvent.venue.area})
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-white/70">
                      <Train className="h-4 w-4 text-yellow-400 shrink-0" />
                      <span>{mainEvent.venue.metro}</span>
                    </div>
                  </div>

                  {/* Direction Links */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={mainEvent.venue.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-semibold text-white transition"
                    >
                      <Navigation className="h-3.5 w-3.5 text-blue-400" />
                      Google Maps Directions
                    </Link>
                    <Link
                      href={mainEvent.venue.wazeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-semibold text-white transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
                      Open in Waze
                    </Link>
                  </div>
                </div>

                {/* Admission & RSVP */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>Access & Admission</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      {mainEvent.admission.type}
                    </h3>
                    <p className="text-xs font-mono text-[var(--accent-green)]">
                      {mainEvent.admission.price}
                    </p>

                    <p className="mt-4 text-sm text-fg-muted leading-relaxed">
                      Due to strict venue acoustics and atmosphere rules, admission is granted exclusively via verified RSVP guestlist.
                    </p>

                    <div className="mt-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-xs text-yellow-200/90">
                      <strong>Age Policy:</strong> {mainEvent.admission.ageNotice}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`mailto:${mainEvent.rsvpEmail}?subject=RSVP%20Request%20-%20SSYSS%20Listening%20Experience%20(Oclu%20Events)&body=Name:%0ANumber%20of%20Guests:%0APhone:%0AInstagram/Social%20(optional):`}
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--accent-green)] hover:bg-[#c2ff57] px-6 py-3.5 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Mail className="h-4 w-4 text-black" />
                      Request Guestlist / RSVP
                    </Link>
                    <p className="mt-2 text-center text-[11px] font-mono text-white/40">
                      Direct management confirmation via {mainEvent.rsvpEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ or Venue Notes */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-[#0c0c14]/70 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white">About Oclu Events & Getting There</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-6 text-xs text-fg-muted leading-relaxed">
            <div>
              <p className="font-semibold text-white mb-1">Industrial-Modern Vibe</p>
              <p>
                Oclu Events is a 400 m² urban-industrial space situated in the Pipera business sector (Bulevardul Dimitrie Pompeiu 5-7), designed with high ceilings and precision acoustic staging ideal for intimate live playbacks.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Transit & Parking</p>
              <p>
                Quick access via Metro Line M2 (Pipera Station) just a 4-minute walk away. Dedicated perimeter parking available for attendees arriving by car or ride-share (Bolt/Uber drop-off right at the entrance).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
