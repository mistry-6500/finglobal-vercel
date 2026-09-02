import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { ArticleCard } from "@/components/article-card";
import { SourceLink } from "@/components/site-layout";
import {
  SITE,
  articlesByMarket,
  formatDate,
  getArticle,
  getMarket,
} from "@/data/news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
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
