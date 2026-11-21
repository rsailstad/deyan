import type { Release } from "@/components/ReleaseCard";
import type { Video } from "@/components/VideoCard";

interface JsonLdProps {
  releases: Release[];
  videos: Video[];
}

export function JsonLd({ releases, videos }: JsonLdProps) {
  const musicGroupSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Deyan",
    "alternateName": "Deyan-Iosif Iary",
    "url": "https://realdeyan.com",
    "image": "https://realdeyan.com/images/ssyss-cover.jpg",
    "genre": ["Underground Hip-Hop", "Dark Wave", "Atmospheric Trap"],
    "sameAs": [
      "https://open.spotify.com/artist/0m4xsZn25PBXtXokxXBT56",
      "https://www.youtube.com/@realdeyan",
      "https://www.instagram.com/realdeyan/"
    ],
    "album": releases.map((release) => ({
      "@type": "MusicAlbum",
      "name": release.title,
      "datePublished": release.releaseDate,
      "url": release.spotifyUrl,
      "image": release.cover.startsWith("http") ? release.cover : `https://realdeyan.com${release.cover}`
    })),
    "subjectOf": videos.map((vid) => ({
      "@type": "VideoObject",
      "name": vid.title,
      "description": vid.description,
      "thumbnailUrl": vid.thumb,
      "uploadDate": vid.date,
      "contentUrl": `https://www.youtube.com/watch?v=${vid.youtubeId}`,
      "embedUrl": `https://www.youtube.com/embed/${vid.youtubeId}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
    />
  );
}
