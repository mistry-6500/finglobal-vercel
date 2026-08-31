import { createFileRoute, Link } from "@tanstack/react-router";

import { marketIcons } from "@/components/site-layout";
import { ArticleCard } from "@/components/article-card";
import { markets, articlesByMarket } from "@/data/news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/markets/")({
  head: () => ({
    ...seo({
      title: "Global markets coverage — FinWorldNews",
      description:
        "Financial news desks for US, European, Asia-Pacific, commodity, currency and crypto markets, each with benchmarks and the latest sourced headlines.",
      path: "/markets",
    }),
  }),
  component: MarketsIndex,
});

function MarketsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow text-primary">Coverage</p>
      <h1 className="mt-2 text-3xl font-extrabold lg:text-5xl">Global markets</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Six desks covering the assets that set global prices. Each page carries its benchmarks and
        every story we have published for that market.
      </p>

      <div className="mt-8 space-y-6">
        {markets.map((m) => {
          const Icon = marketIcons[m.slug];
          const items = articlesByMarket(m.slug);
          return (
            <section key={m.slug} className="rounded-lg border border-border bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="inline-flex items-center gap-2 text-xl font-semibold">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {m.name}
                </h2>
                <Link
                  to="/markets/$market"
                  params={{ market: m.slug }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View desk ({items.length})
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {items.slice(0, 2).map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
