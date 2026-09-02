import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";

import { SITE, allTags, markets, sortedArticles, marketName } from "@/data/news";
import { getLiveNews } from "@/lib/live-news.functions";
import type { NewsItem } from "@/lib/live-news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/archive")({
  loader: async () => ({ liveItems: (await getLiveNews()).items }),
  head: () => seo({ title: `News archive — ${SITE.name}`, description: "Search original FinWorldNews reporting by market, topic and tag.", path: "/archive" }),
  component: Archive,
});

function Archive() {
  const { liveItems } = Route.useLoaderData();
  const { q = "", market = "all", tag = "all" } = Route.useSearch() as { q?: string; market?: string; tag?: string };
  const query = q.trim().toLowerCase();
  const results = sortedArticles.filter((article) => {
    const matchesQuery = !query || [article.title, article.standfirst, article.summary, article.topic, ...article.tags].join(" ").toLowerCase().includes(query);
    return matchesQuery && (market === "all" || article.market === market) && (tag === "all" || article.tags.includes(tag));
  });
  const liveResults: NewsItem[] = liveItems.filter((item) => {
    const matchesQuery = !query || [item.title, item.summary, item.topic, item.source].join(" ").toLowerCase().includes(query);
    return matchesQuery && (market === "all" || item.market === market) && (tag === "all" || item.topic === tag);
  });
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(window.location.search);
    value === "all" || !value ? next.delete(key) : next.set(key, value);
    window.history.replaceState({}, "", `${window.location.pathname}${next.toString() ? `?${next}` : ""}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return <div className="mx-auto max-w-6xl px-4 py-10">
    <div className="max-w-3xl"><p className="eyebrow text-primary">FinWorldNews library</p><h1 className="mt-3 text-4xl font-extrabold text-balance">News archive</h1><p className="mt-3 text-muted-foreground">Search the markets desk&apos;s original reporting, with sources and analysis clearly separated.</p></div>
    <div className="mt-8 grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[1fr_auto_auto]">
      <label className="relative"><span className="sr-only">Search stories</span><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" /><input defaultValue={q} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing && event.keyCode !== 229) update("q", event.currentTarget.value); }} placeholder="Search headlines, topics and tags" className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
      <label><span className="sr-only">Filter by market</span><select value={market} onChange={(e) => update("market", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="all">All markets</option>{markets.map((m) => <option key={m.slug} value={m.slug}>{m.name}</option>)}</select></label>
      <label><span className="sr-only">Filter by tag</span><select value={tag} onChange={(e) => update("tag", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="all">All tags</option>{allTags.map((t) => <option key={t} value={t}>{t}</option>)}</select></label>
    </div>
    <p className="mt-6 font-mono text-xs text-muted-foreground">{results.length + liveResults.length} {results.length + liveResults.length === 1 ? "story" : "stories"} found</p>
    {results.length || liveResults.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{results.map((article) => <article key={article.slug} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">{marketName(article.market)} · {article.topic}</p><h2 className="mt-3 text-xl font-semibold text-balance"><Link to="/news/$slug" params={{ slug: article.slug }} className="hover:text-primary">{article.title}</Link></h2><p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{article.standfirst}</p><Link to="/news/$slug" params={{ slug: article.slug }} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read story <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}{liveResults.map((item) => <article key={`live-${item.id}`} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">{marketName(item.market)} · {item.topic}</p><h2 className="mt-3 text-xl font-semibold text-balance"><Link to="/news/$slug" params={{ slug: item.id }} className="hover:text-primary">{item.title}</Link></h2><p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.summary || "Live coverage with context from the FinWorldNews desk."}</p><Link to="/news/$slug" params={{ slug: item.id }} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read story <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-border p-10 text-center"><h2 className="text-xl font-semibold">No stories match those filters</h2><p className="mt-2 text-sm text-muted-foreground">Try a broader search or return to the full archive.</p><Link to="/archive" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Clear filters</Link></div>}
  </div>;
}

export function RouteSearch() { return {}; }
Route.options = { ...Route.options, validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q : "", market: typeof search.market === "string" ? search.market : "all", tag: typeof search.tag === "string" ? search.tag : "all" }) };

export default Route;
