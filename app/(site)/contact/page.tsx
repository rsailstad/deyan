import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { SocialRow } from "@/components/SocialRow";

export const metadata: Metadata = {
  title: "Contact",
  description: "Booking, press, and management inbox for realDEYAN.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold text-fg md:text-5xl">Drop us a note</h1>
        <p className="mt-4 text-sm text-fg-muted">
          Booking, media, or sync? We triage requests within a day. Social DMs are open, but email keeps the flow.
        </p>
      </header>
      <div className="mt-12 glass-panel rounded-[36px] border-white/10 bg-[#0f0f19]/80 p-8 md:p-12">
        <ContactForm />
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.35em] text-fg-muted">Or tap a channel</p>
          <SocialRow context="contact" className="mt-4" variant="solid" />
        </div>
      </div>
    </div>
  );
}
