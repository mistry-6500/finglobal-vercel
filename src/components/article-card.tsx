import { Link } from "@tanstack/react-router";
import { Flame, Zap } from "lucide-react";

import { formatDate, marketName, type Article } from "@/data/news";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary ${
        featured ? "lg:p-7" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/markets/$market"
          params={{ market: article.market }}
          className="eyebrow relative z-10 rounded-sm bg-secondary px-2 py-1 text-primary"
        >
          {marketName(article.market)}
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
        <Link
          to="/news/$slug"
          params={{ slug: article.slug }}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {article.title}
        </Link>
      </h3>

      <p className={`mt-2 text-sm text-muted-foreground ${featured ? "lg:text-base" : ""}`}>
        {article.summary}
      </p>

      <time
        dateTime={article.published}
        className="mt-4 font-mono text-xs text-muted-foreground"
      >
        {formatDate(article.published)}
      </time>
    </article>
  );
}
