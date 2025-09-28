export type OutboundMeta = {
  platform: "spotify" | "youtube" | "instagram" | "apple" | "press" | "other";
  context?: string;
  label?: string;
};

export function withUtm(url: string, meta: OutboundMeta): string {
  try {
    const target = new URL(url);
    const params = target.searchParams;
    params.set("utm_source", meta.platform);
    params.set("utm_medium", "artist-site");
    params.set("utm_campaign", meta.context ?? "landing");
    if (meta.label) {
      params.set("utm_content", meta.label.toLowerCase().replace(/\s+/g, "-"));
    }
    target.search = params.toString();
    return target.toString();
  } catch (error) {
    console.warn("Failed to append UTM params", error);
    return url;
  }
}

export function trackOutbound(eventName: string, url: string, meta: OutboundMeta) {
  if (typeof window === "undefined") return;

  const payload = {
    event: eventName,
    value: url,
    ...meta,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, {
        event_category: "outbound",
        event_label: meta.platform,
        value: url,
        ...meta,
      });
    }

    const va = (window as typeof window & { va?: (payload: Record<string, unknown>) => void }).va;
    if (typeof va === "function") {
      va({ type: "event", payload });
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", payload);
  }
}
