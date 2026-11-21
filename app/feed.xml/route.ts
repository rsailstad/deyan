import { getReleases, getVideos } from "@/lib/content";

export async function GET() {
  const releases = getReleases();
  const videos = getVideos();
  const baseUrl = "https://realdeyan.com";

  const items = [
    ...releases.map((r) => `
    <item>
      <title><![CDATA[Deyan - ${r.title}]]></title>
      <link>${r.spotifyUrl}</link>
      <guid isPermaLink="false">release-${r.title.replace(/[^a-zA-Z0-9]/g, "-")}</guid>
      <pubDate>${new Date(r.releaseDate).toUTCString()}</pubDate>
      <description><![CDATA[Official release: ${r.title}. Stream on Spotify: ${r.spotifyUrl} | YouTube: ${r.youtubeUrl}]]></description>
    </item>`),
    ...videos.map((v) => `
    <item>
      <title><![CDATA[Video: ${v.title}]]></title>
      <link>https://www.youtube.com/watch?v=${v.youtubeId}</link>
      <guid isPermaLink="false">video-${v.youtubeId}</guid>
      <pubDate>${new Date(v.date).toUTCString()}</pubDate>
      <description><![CDATA[${v.description} - Watch on YouTube: https://www.youtube.com/watch?v=${v.youtubeId}]]></description>
    </item>`)
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deyan Official Transmission Feed</title>
    <link>${baseUrl}</link>
    <description>Underground hip-hop and audio visual releases by Deyan (Bucharest, Romania).</description>
    <language>en</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
