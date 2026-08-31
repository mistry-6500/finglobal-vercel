import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { trendingArticles, sortedArticles } from "@/data/news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/trending")({
  head: () => ({
    ...seo({
      title: "Trending financial news right now — FinWorldNews",
      description:
        "The financial stories moving global markets today: central bank decisions, earnings, commodities and digital assets, ranked by reader attention.",
      path: "/trending",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Trending financial news",
          itemListElement: trendingArticles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.title,
            url: `/news/${a.slug}`,
          })),
        }),
      },
    ],
  }),
  component: Trending,
});

function Trending() {
  const rest = sortedArticles.filter((a) => !a.trending);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow text-primary">Live attention</p>
      <h1 className="mt-2 inline-flex items-center gap-3 text-3xl font-extrabold lg:text-5xl">
        <Flame className="h-8 w-8 text-primary" aria-hidden="true" />
        Trending now
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        The financial stories drawing the most attention across our market desks right now.
      </p>

      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trendingArticles.map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ol>

      <h2 className="eyebrow mt-12 text-muted-foreground">Also worth reading</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
