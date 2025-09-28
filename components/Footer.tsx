import Link from "next/link";

import { SocialRow } from "@/components/SocialRow";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#090910]/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-gradient text-2xl font-black uppercase tracking-[0.55em] drop-shadow-[0_0_18px_rgba(181,255,63,0.35)]">D<span className="text-white">EYAN</span></p>
            <p className="max-w-sm text-sm text-fg-muted">
              Neon-future rap by a 15-year-old with a vision. Stream the latest singles, queue the videos, and stay close on socials.
            </p>
          </div>
          <SocialRow variant="ghost" context="footer" className="justify-start md:justify-end" />
        </div>
        <Separator className="bg-white/5" />
        <div className="flex flex-col gap-4 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Deyan. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-fg">Press Kit</Link>
            <a href="mailto:press@deyan.world" className="hover:text-fg">
              press@deyan.world
            </a>
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:text-fg">
              Built for Vercel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
