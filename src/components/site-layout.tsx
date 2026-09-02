import { Link } from "@tanstack/react-router";
import {
  Globe2,
  Flame,
  Radio,
  TrendingUp,
  Landmark,
  Coins,
  Bitcoin,
  BarChart3,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import type { ComponentType } from "react";

import { SITE, markets, type MarketSlug } from "@/data/news";
import { useLiveNews } from "@/hooks/use-live-news";
import { formatStamp } from "@/lib/live-news";

export const marketIcons: Record<MarketSlug, ComponentType<{ className?: string }>> = {
  "united-states": Landmark,
  europe: BarChart3,
  "asia-pacific": Globe2,
  commodities: Coins,
  currencies: TrendingUp,
  crypto: Bitcoin,
};

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
      <img
        src="/favicon.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 rounded-md"
      />
      <span className="font-display text-lg leading-none font-extrabold tracking-tight">
        Fin<span className="text-primary">World</span>News
      </span>
    </Link>
  );
}

const navLinkClass =
  "rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

export function LiveStatus() {
  const { isFetching, fetchedAt, live } = useLiveNews();
  return (
    <span className="eyebrow hidden items-center gap-1.5 text-muted-foreground sm:inline-flex">
      <span
        className={`h-2 w-2 rounded-full ${live ? "bg-bull" : "bg-muted-foreground"} ${isFetching ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
      {live ? "Live" : "Cached"} · auto-refresh 2 min
      {isFetching ? (
        <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
      ) : fetchedAt ? (
        <span className="hidden lg:inline">· {formatStamp(fetchedAt)}</span>
      ) : null}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Wordmark />
        <LiveStatus />

        <nav aria-label="Primary" className="ml-auto flex flex-wrap items-center gap-0.5">
          <Link to="/" className={navLinkClass} activeProps={{ className: "text-foreground bg-secondary" }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/markets" className={navLinkClass} activeProps={{ className: "text-foreground bg-secondary" }}>
            Markets
          </Link>
          <Link to="/trending" className={navLinkClass} activeProps={{ className: "text-foreground bg-secondary" }}>
            <span className="inline-flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Trending
            </span>
          </Link>
          <Link to="/archive" className={navLinkClass} activeProps={{ className: "text-foreground bg-secondary" }}>
            Archive
          </Link>
          <Link to="/about" className={navLinkClass} activeProps={{ className: "text-foreground bg-secondary" }}>
            About
          </Link>
        </nav>
      </div>
      <div className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {markets.map((m) => {
            const Icon = marketIcons[m.slug];
            return (
              <Link
                key={m.slug}
                to="/markets/$market"
                params={{ market: m.slug }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                activeProps={{ className: "border-primary text-foreground" }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {m.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export function BreakingTicker() {
  const { items } = useLiveNews();
  const headlines = items.slice(0, 10);
  if (headlines.length === 0) return null;
  const loop = [...headlines, ...headlines];
  return (
    <div className="flex items-center gap-3 overflow-hidden border-b border-border bg-secondary py-2">
      <span className="eyebrow ml-4 flex shrink-0 items-center gap-1.5 rounded-sm bg-bear px-2 py-1 text-background">
        <Radio className="h-3 w-3" aria-hidden="true" /> Breaking
      </span>
      <div className="relative flex-1 overflow-hidden">
        <ul className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm text-foreground">
          {loop.map((item, i) => (
            <li key={`${item.id}-${i}`} aria-hidden={i >= headlines.length}>
              <Link to="/news/$slug" params={{ slug: item.url.startsWith("/news/") ? item.url.slice(6) : item.id }} className="hover:text-primary">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{SITE.description}</p>
        </div>
        <div>
          <h2 className="eyebrow text-muted-foreground">Markets</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {markets.map((m) => (
              <li key={m.slug}>
                <Link
                  to="/markets/$market"
                  params={{ market: m.slug }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow text-muted-foreground">Sections</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link to="/trending" className="text-muted-foreground hover:text-primary">
                Trending now
              </Link>
            </li>
            <li>
              <Link to="/markets" className="text-muted-foreground hover:text-primary">
                All markets
              </Link>
            </li>
            <li>
              <Link to="/archive" className="text-muted-foreground hover:text-primary">
                News archive
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary">
                Editorial standards
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          {SITE.name} publishes market news for information only. Nothing here is investment
          advice. Figures are quoted as published by the cited source.
        </p>
      </div>
    </footer>
  );
}

export function SourceLink({ source, url }: { source: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
    >
      Source: {source}
      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
    </a>
  );
}
