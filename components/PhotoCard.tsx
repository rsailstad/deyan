import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type Photo = {
  src: string;
  alt: string;
  credit: string;
  tags: string[];
  url?: string;
};

export function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <Card className="relative overflow-hidden rounded-[32px] border-white/5 bg-[#0c0c15]/80">
      <div className="relative h-[320px] w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black via-black/65 to-transparent p-4 text-xs text-fg">
        <p className="text-sm font-semibold text-fg">{photo.alt}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.35em] text-fg-muted">{photo.credit}</span>
          {photo.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
