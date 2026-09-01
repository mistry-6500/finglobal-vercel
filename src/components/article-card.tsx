import { Link } from "@tanstack/react-router";
import { Flame, Zap, ArrowUpRight } from "lucide-react";

import { formatStamp, marketLabel, relativeTime, type NewsItem } from "@/lib/live-news";

function Headline({ item, className }: { item: NewsItem; className: string }) {
  const linkClass = `${className} after:absolute after:inset-0 after:content-['']`;
  if (item.external) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {item.title}
        <ArrowUpRight className="ml-1 inline h-4 w-4 align-text-top text-muted-foreground" aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link to="/news/$slug" params={{ slug: item.url.replace("/news/", "") }} className={linkClass}>
      {item.title}
    </Link>
  );
}

export function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsItem;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary ${
        featured ? "lg:p-7" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/markets/$market"
          params={{ market: article.market }}
          className="eyebrow relative z-10 rounded-sm bg-secondary px-2 py-1 text-primary"
        >
          {marketLabel(article.market)}
        </Link>
        <span className="eyebrow text-muted-foreground">{article.topic}</span>
        {article.breaking ? (
          <span className="eyebrow inline-flex items-center gap-1 rounded-sm bg-bear px-2 py-1 text-background">
            <Zap className="h-3 w-3" aria-hidden="true" /> Breaking
          </span>
        ) : null}
        {article.trending ? (
          <span className="eyebrow inline-flex items-center gap-1 text-bull">
            <Flame className="h-3 w-3" aria-hidden="true" /> Trending
          </span>
        ) : null}
      </div>

      <h3
        className={`mt-3 font-semibold text-balance ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}
      >
        <Headline item={article} className="" />
      </h3>

      {article.summary ? (
        <p
          className={`mt-2 line-clamp-4 text-sm text-muted-foreground ${featured ? "lg:text-base" : ""}`}
        >
          {article.summary}
        </p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-xs text-muted-foreground">
        <time dateTime={article.published}>{formatStamp(article.published)}</time>
        <span aria-hidden="true">·</span>
        <span>{relativeTime(article.published)}</span>
        <span aria-hidden="true">·</span>
        <span className="text-primary">{article.source}</span>
      </div>
    </article>
  );
}
