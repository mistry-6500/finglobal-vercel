import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";

import { ArticleCard } from "@/components/article-card";
import { useLiveNews } from "@/hooks/use-live-news";
import { liveNewsQuery } from "@/lib/live-news-query";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/trending")({
  loader: ({ context }) => context.queryClient.ensureQueryData(liveNewsQuery),
  head: () => ({
    ...seo({
      title: "Trending financial news right now — FinWorldNews",
      description:
        "The financial stories moving global markets today: central bank decisions, earnings, commodities and digital assets, refreshed every two minutes.",
      path: "/trending",
    }),
  }),
  component: Trending,
});

function Trending() {
  const { items } = useLiveNews();
  const trending = items.filter((a) => a.trending).slice(0, 12);
  const rest = items.filter((a) => !a.trending).slice(0, 24);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow text-primary">Live wire · refreshes every 2 minutes</p>
      <h1 className="mt-2 inline-flex items-center gap-3 text-3xl font-extrabold lg:text-5xl">
        <Flame className="h-8 w-8 text-primary" aria-hidden="true" />
        Trending now
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        The newest financial stories across our market desks, ranked by recency and reach.
      </p>

      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trending.map((a) => (
          <li key={a.id}>
            <ArticleCard article={a} />
          </li>
        ))}
      </ol>

      <h2 className="eyebrow mt-12 text-muted-foreground">Also worth reading</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
