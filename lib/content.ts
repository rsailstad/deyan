import releasesData from "@/content/releases.json";
import videosData from "@/content/videos.json";
import galleryData from "@/content/gallery.json";
import pressData from "@/content/press.json";

import type { Release } from "@/components/ReleaseCard";
import type { Video } from "@/components/VideoCard";
import type { Photo } from "@/components/PhotoCard";

export type PressItem = {
  title: string;
  url: string;
  outlet: string;
  date: string;
};

function compareDesc(dateA: string, dateB: string) {
  return new Date(dateB).getTime() - new Date(dateA).getTime();
}

export function getReleases(): Release[] {
  return [...releasesData].sort((a, b) => compareDesc(a.releaseDate, b.releaseDate));
}

export function getVideos(): Video[] {
  return [...videosData].sort((a, b) => compareDesc(a.date, b.date));
}

export function getGallery(): Photo[] {
  return [...galleryData];
}

export function getPress(): PressItem[] {
  return [...pressData].sort((a, b) => (a.date > b.date ? -1 : 1));
}
