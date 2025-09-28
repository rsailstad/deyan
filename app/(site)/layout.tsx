import { Analytics } from "@vercel/analytics/react";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_55%)]" />
      <Header />
      <main className="relative z-10 flex flex-1 flex-col">{children}</main>
      <Footer />
      <Analytics />
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </div>
  );
}
