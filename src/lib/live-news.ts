import { markets, sortedArticles, type MarketSlug } from "@/data/news";

/**
 * Shared, browser-safe types and helpers for the live news feed.
 * Feed fetching itself lives in `live-news.functions.ts` (server only).
 */

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  market: MarketSlug;
  topic: string;
  source: string;
  url: string;
  published: string; // ISO timestamp
  external: boolean;
  trending?: boolean;
  breaking?: boolean;
}

export interface LiveFeedResult {
  items: NewsItem[];
  fetchedAt: string;
  live: boolean;
}

/** Public RSS sources, grouped by market desk. No API keys required. */
export const FEEDS: Record<MarketSlug, { url: string; source: string; topic: string }[]> = {
  "united-states": [
    { url: "https://www.cnbc.com/id/10000664/device/rss/rss.html", source: "CNBC Markets", topic: "US markets" },
    { url: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml", source: "WSJ Markets", topic: "Markets" },
    { url: "https://www.cnbc.com/id/20910258/device/rss/rss.html", source: "CNBC Economy", topic: "Economy" },
  ],
  europe: [
    { url: "https://www.cnbc.com/id/19794221/device/rss/rss.html", source: "CNBC Europe", topic: "Europe" },
  ],
  "asia-pacific": [
    { url: "https://www.cnbc.com/id/19832390/device/rss/rss.html", source: "CNBC Asia", topic: "Asia-Pacific" },
  ],
  commodities: [
    { url: "https://www.cnbc.com/id/19836768/device/rss/rss.html", source: "CNBC Commodities", topic: "Commodities" },
    { url: "https://www.investing.com/rss/news_11.rss", source: "Investing.com", topic: "Commodities" },
  ],
  currencies: [
    { url: "https://www.investing.com/rss/news_1.rss", source: "Investing.com", topic: "Forex" },
    { url: "https://www.cnbc.com/id/10000115/device/rss/rss.html", source: "CNBC Finance", topic: "Rates" },
  ],
  crypto: [
    { url: "https://cointelegraph.com/rss", source: "Cointelegraph", topic: "Digital assets" },
  ],
};

/** How often the client re-polls the server for fresh headlines. */
export const REFRESH_MS = 120_000;

/** Curated, always-available fallback used when a feed is slow or unreachable. */
export const fallbackItems: NewsItem[] = sortedArticles.map((a) => ({
  id: a.slug,
  title: a.title,
  summary: a.summary,
  market: a.market,
  topic: a.topic,
  source: a.source,
  url: `/news/${a.slug}`,
  published: `${a.published}T08:00:00.000Z`,
  external: false,
  trending: a.trending,
  breaking: a.breaking,
}));

export const marketLabel = (slug: MarketSlug) =>
  markets.find((m) => m.slug === slug)?.shortName ?? slug;

export function formatStamp(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  }) + " UTC";
}

export function relativeTime(iso: string, now = Date.now()) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const mins = Math.max(0, Math.round((now - t) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

/** Newest first, capped. */
export const byNewest = (items: NewsItem[], limit?: number) => {
  const sorted = [...items].sort((a, b) => b.published.localeCompare(a.published));
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
};

export const filterByMarket = (items: NewsItem[], market: MarketSlug) =>
  items.filter((i) => i.market === market);
