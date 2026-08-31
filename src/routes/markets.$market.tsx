import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { ArticleCard } from "@/components/article-card";
import { marketIcons } from "@/components/site-layout";
import { articlesByMarket, getMarket, markets, type MarketSlug } from "@/data/news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/markets/$market")({
  loader: ({ params }) => {
    const market = getMarket(params.market);
    if (!market) throw notFound();
    return { market, articles: articlesByMarket(market.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Market not found — FinWorldNews" }, { name: "robots", content: "noindex" }] };
    }
    const { market, articles } = loaderData;
    return {
      ...seo({
        title: `${market.name} news — FinWorldNews`,
        description: market.description,
        path: `/markets/${market.slug}`,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${market.name} news`,
            description: market.description,
            hasPart: articles.map((a) => ({
              "@type": "NewsArticle",
              headline: a.title,
              datePublished: a.published,
              url: `/news/${a.slug}`,
            })),
          }),
        },
      ],
    };
  },
  component: MarketPage,
  notFoundComponent: MarketNotFound,
});

function MarketPage() {
  const { market, articles } = Route.useLoaderData();
  const Icon = marketIcons[market.slug as MarketSlug];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow text-primary">{market.region}</p>
      <h1 className="mt-2 inline-flex items-center gap-3 text-3xl font-extrabold lg:text-5xl">
        <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
        {market.name}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{market.description}</p>

      <section aria-labelledby="benchmarks" className="mt-6">
        <h2 id="benchmarks" className="eyebrow text-muted-foreground">
          Benchmarks we track
        </h2>
        <dl className="mt-3 grid gap-3 sm:grid-cols-3">
          {market.benchmarks.map((b) => (
            <div key={b.name} className="rounded-lg border border-border bg-card p-4">
              <dt className="font-semibold">{b.name}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{b.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="market-stories" className="mt-10">
        <h2 id="market-stories" className="eyebrow text-muted-foreground">
          Latest {market.shortName} stories
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <nav aria-label="Other markets" className="mt-12 flex flex-wrap gap-2">
        {markets
          .filter((m) => m.slug !== market.slug)
          .map((m) => (
            <Link
              key={m.slug}
              to="/markets/$market"
              params={{ market: m.slug }}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-foreground"
            >
              {m.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}

function MarketNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-3xl font-extrabold">Market desk not found</h1>
      <p className="mt-2 text-muted-foreground">That market page doesn't exist.</p>
      <Link to="/markets" className="mt-6 inline-block text-primary hover:underline">
        See all markets
      </Link>
    </div>
  );
}
