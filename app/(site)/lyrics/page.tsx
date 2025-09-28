import Image from "next/image";

const instagramLyrics = [
  {
    id: "DO0SqP-DH_a",
    title: "Lyric Card 1",
    url: "https://www.instagram.com/p/DO0SqP-DH_a/",
  },
  {
    id: "DO0R9zkjIBH",
    title: "Lyric Card 2",
    url: "https://www.instagram.com/p/DO0R9zkjIBH/",
  },
  {
    id: "DO0PHQ_jPIG",
    title: "Lyric Card 3",
    url: "https://www.instagram.com/p/DO0PHQ_jPIG/",
  },
  {
    id: "DO0ModVjI9I",
    title: "Lyric Card 4",
    url: "https://www.instagram.com/p/DO0ModVjI9I/",
  },
] as const;

export const metadata = {
  title: "Lyrics",
  description: "Flip through the latest lyric snippets from Instagram and tap through for the full lines.",
};

export default function LyricsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="flex flex-col gap-3 text-center sm:gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-fg-muted">Lyric Notebook</p>
        <h1 className="text-3xl font-semibold text-fg sm:text-4xl">Stanzas from the feed</h1>
        <p className="mx-auto max-w-2xl text-sm text-fg-muted">
          Swipe through the carousel, screenshot the lines, or tap straight into Instagram to leave a comment.
        </p>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        {instagramLyrics.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#0c0c15]/80 transition hover:border-white/25"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={`https://images.weserv.nl/?url=ssl:instagram.com/p/${post.id}/media/?size=l`}
                alt={`${post.title} preview`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="flex items-center justify-between px-5 py-4 text-sm text-fg">
              <span className="font-semibold">{post.title}</span>
              <span className="text-xs uppercase tracking-[0.35em] text-[var(--accent-green)]">Open IG ↗</span>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
