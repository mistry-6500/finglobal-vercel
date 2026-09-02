import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { ArticleCard } from "@/components/article-card";
import { SourceLink } from "@/components/site-layout";
import {
  SITE,
  articlesByMarket,
  formatDate,
  getArticle,
  getMarket,
  type Article,
} from "@/data/news";
import { fallbackItems } from "@/lib/live-news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug) ?? makeLiveArticle(params.slug);
    if (!article) throw notFound();
    const market = getMarket(article.market)!;
    const related = articlesByMarket(article.market)
      .filter((a) => a.slug !== article.slug)
      .slice(0, 3);
    return { article, market, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Story unavailable — FinWorldNews" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    return {
      ...seo({
        title: `${article.title} — FinWorldNews`,
        description: article.summary,
        path: `/news/${article.slug}`,
      }),
      meta: [
        ...seo({ title: `${article.title} — FinWorldNews`, description: article.summary, path: `/news/${article.slug}` }).meta,
        { property: "article:published_time", content: article.published },
        { property: "article:section", content: article.topic },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.summary,
            datePublished: article.published,
            dateModified: article.published,
            articleSection: article.topic,
            inLanguage: "en",
            isAccessibleForFree: true,
            publisher: { "@type": "NewsMediaOrganization", name: SITE.name },
            citation: article.sourceUrl,
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: StoryNotFound,
});

function makeLiveArticle(rawSlug: string): Article | undefined {
  const slug = decodeURIComponent(rawSlug);
  const live = fallbackItems.find((item) => item.id === slug);
  const title = live?.title ?? slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const market = live?.market ?? "united-states";
  const published = live?.published?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
  return {
    slug: rawSlug,
    title: live?.title ?? `Market briefing: ${title}`,
    standfirst: live?.summary ?? "A FinWorldNews desk briefing on the market context, evidence and questions investors should watch next.",
    summary: live?.summary ?? "This locally published briefing explains the market context behind the headline and points readers to the primary source.",
    market,
    topic: live?.topic ?? "Markets",
    tags: [live?.topic ?? "Markets", "News briefing"],
    author: SITE.desk,
    published,
    updated: published,
    readingMinutes: 2,
    takeaways: [
      live?.summary ?? "The headline is presented with context rather than a bare price reaction.",
      "Readers should check the cited source for the underlying announcement and figures.",
      "The next scheduled data release or policy decision is the key item to monitor.",
    ],
    sections: [
      { heading: "What happened", paragraphs: [live?.summary ?? `The FinWorldNews desk is tracking ${title.toLowerCase()} as part of its daily market coverage. This page keeps the story available inside the newsroom rather than sending readers to an external site.`, "The story is part of a developing news cycle. Prices can move before the full implications are clear, so the desk separates the reported headline from its interpretation."] },
      { heading: "Why markets care", paragraphs: ["Investors typically assess whether a development changes growth, inflation, liquidity or risk appetite. The immediate reaction is only one piece of that assessment; follow-through in rates, currencies and breadth helps establish whether the move is durable."] },
      { heading: "What to watch next", paragraphs: ["Watch the next official release, company filing or policy communication connected to this story. FinWorldNews will update its market desks as more verifiable information becomes available."] },
    ],
    analysis: ["Our read: treat the first move as information, not a conclusion. Confirmation from primary data and cross-asset pricing matters more than a single headline."],
    faqs: [],
    sources: live ? [{ name: live.source, url: live.url }] : [{ name: "FinWorldNews Markets Desk", url: "/about" }],
  };
}

function ArticlePage() {
  const { article, market, related } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link to="/markets/$market" params={{ market: market.slug }} className="hover:text-primary">
          {market.shortName}
        </Link>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold text-balance lg:text-4xl">{article.title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{article.standfirst}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-border py-3">
        <span className="text-sm font-medium">{article.author}</span>
        <time dateTime={article.published} className="font-mono text-xs text-muted-foreground">Published {formatDate(article.published)}</time>
        <time dateTime={article.updated} className="font-mono text-xs text-muted-foreground">Updated {formatDate(article.updated)}</time>
        <span className="font-mono text-xs text-muted-foreground">{article.readingMinutes} min read</span>
      </div>
      <div className="mt-6 rounded-lg border border-border bg-card p-5">
        <h2 className="eyebrow text-primary">Key takeaways</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">{article.takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="mt-8 space-y-8 text-base leading-relaxed">
        {article.sections.map((section) => <section key={section.heading}><h2 className="text-2xl font-bold">{section.heading}</h2>{section.paragraphs.map((p) => <p key={p} className="mt-3">{p}</p>)}</section>)}
      </div>
      <section className="mt-8 border-l-2 border-primary pl-4"><h2 className="eyebrow text-primary">Analysis</h2>{article.analysis.map((p) => <p key={p} className="mt-3 text-muted-foreground">{p}</p>)}</section>

      <p className="mt-8 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        Market news for information only — not investment advice. Figures are quoted as published
        by the cited source.
      </p>

      {related.length > 0 ? (
        <section aria-labelledby="related" className="mt-12">
          <h2 id="related" className="eyebrow text-muted-foreground">
            More from {market.shortName}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function StoryNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-3xl font-extrabold">Story not found</h1>
      <p className="mt-2 text-muted-foreground">This story may have moved.</p>
      <Link to="/trending" className="mt-6 inline-block text-primary hover:underline">
        See trending news
      </Link>
    </div>
  );
}
