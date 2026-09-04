import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame } from "lucide-react";

import { AdUnit } from "@/components/ad-unit";
import { ArticleCard } from "@/components/article-card";
import { marketIcons } from "@/components/site-layout";
import { SITE, markets } from "@/data/news";
import { useLiveNews } from "@/hooks/use-live-news";
import { liveNewsQuery } from "@/lib/live-news-query";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(liveNewsQuery),
  head: () => ({
    ...seo({
      title: "FinWorldNews — Breaking global financial news, live markets",
      description:
        "Live breaking financial news from US, European, Asia-Pacific, commodity, currency and crypto markets. Auto-updating headlines every two minutes.",
      path: "/",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "FinWorldNews — Breaking global financial news",
          description: SITE.description,
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { items } = useLiveNews();
  const [lead, ...rest] = items;
  const secondary = rest.slice(0, 3);
  const latest = rest.slice(3, 12);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <p className="eyebrow text-primary">Global markets desk · Auto-updating every 2 minutes</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-balance lg:text-6xl">
            Breaking financial news from every major market
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
            {SITE.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/trending"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Flame className="h-4 w-4" aria-hidden="true" /> Trending now
            </Link>
            <Link
              to="/markets"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary"
            >
              Browse markets <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="top-stories">
        <h2 id="top-stories" className="eyebrow text-muted-foreground">
          Top stories
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">{lead ? <ArticleCard article={lead} featured /> : null}</div>
          <div className="grid gap-4">
            {secondary.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10" aria-labelledby="markets-hub">
        <h2 id="markets-hub" className="eyebrow text-muted-foreground">
          Markets
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => {
            const Icon = marketIcons[m.slug];
            return (
              <Link
                key={m.slug}
                to="/markets/$market"
                params={{ market: m.slug }}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary"
              >
                <span className="inline-flex items-center gap-2 font-semibold">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {m.name}
                </span>
                <span className="mt-1.5 block text-sm text-muted-foreground">{m.tagline}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4" aria-label="Advertisement">
        <AdUnit />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4" aria-labelledby="latest">
        <h2 id="latest" className="eyebrow text-muted-foreground">
          Latest headlines
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Why readers trust FinWorldNews</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{SITE.editorialPolicy}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Headlines refresh automatically every two minutes across {markets.length} market desks.{" "}
            <Link to="/about" className="text-primary hover:underline">
              Read our editorial standards
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
