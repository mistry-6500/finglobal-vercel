import { FEEDS, fallbackItems, type NewsItem, type LiveFeedResult } from "@/lib/live-news";
import type { MarketSlug } from "@/data/news";

const decode = (raw: string) =>
  raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();

const tag = (block: string, name: string) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m?.[1] ? decode(m[1]) : "";
};

function parseFeed(
  xml: string,
  market: MarketSlug,
  source: string,
  topic: string,
): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const items: NewsItem[] = [];

  for (const block of blocks) {
    const title = tag(block, "title");
    const link = tag(block, "link") || tag(block, "guid");
    if (!title || !link.startsWith("http")) continue;

    const dateRaw = tag(block, "pubDate") || tag(block, "dc:date") || tag(block, "updated");
    const parsed = dateRaw ? new Date(dateRaw) : new Date();
    const published = Number.isNaN(parsed.getTime())
      ? new Date().toISOString()
      : parsed.toISOString();

    const summary = tag(block, "description") || tag(block, "content:encoded");

    const storySlug = (() => {
      try {
        const pathname = new URL(link).pathname.replace(/\/+$/, "");
        const lastSegment = pathname.split("/").pop() ?? "";
        return lastSegment.replace(/\.html?$/i, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || encodeURIComponent(link);
      } catch {
        return encodeURIComponent(link);
      }
    })();

    items.push({
      id: storySlug,
      title,
      summary: summary.length > 260 ? `${summary.slice(0, 257)}...` : summary,
      market,
      topic,
      source,
      url: link,
      published,
      external: true,
    });
  }
  return items;
}

async function fetchFeed(url: string, market: MarketSlug, source: string, topic: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; FinWorldNewsBot/1.0)",
        accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    return parseFeed(await res.text(), market, source, topic);
  } catch {
    return [];
  }
}

let cache: { result: LiveFeedResult; at: number } | null = null;
const CACHE_MS = 60_000;

/** Aggregate every configured feed into one deduplicated, newest-first list. */
export async function fetchLiveNews(): Promise<LiveFeedResult> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.result;

  const jobs = (Object.entries(FEEDS) as [MarketSlug, (typeof FEEDS)[MarketSlug]][]).flatMap(
    ([market, feeds]) => feeds.map((f) => fetchFeed(f.url, market, f.source, f.topic)),
  );

  const settled = await Promise.all(jobs);
  const seen = new Set<string>();
  const items: NewsItem[] = [];

  for (const group of settled) {
    for (const item of group) {
      const key = item.title.toLowerCase();
      if (seen.has(key) || seen.has(item.id)) continue;
      seen.add(key);
      seen.add(item.id);
      items.push(item);
    }
  }

  items.sort((a, b) => b.published.localeCompare(a.published));

  const cutoff = Date.now() - 6 * 60 * 60 * 1000;
  const recent = items.filter((i) => new Date(i.published).getTime() >= cutoff);
  for (const item of recent.slice(0, 4)) item.breaking = true;
  for (const item of items.slice(0, 12)) item.trending = true;

  if (items.length === 0) {
    return { items: fallbackItems, fetchedAt: new Date().toISOString(), live: false };
  }

  // Keep curated explainers available underneath the live wire.
  const result: LiveFeedResult = {
    items: [...items.slice(0, 120), ...fallbackItems],
    fetchedAt: new Date().toISOString(),
    live: true,
  };
  cache = { result, at: Date.now() };
  return result;
}

