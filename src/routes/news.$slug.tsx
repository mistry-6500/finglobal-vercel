import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { AdUnit } from "@/components/ad-unit";
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
import { fallbackItems, type NewsItem } from "@/lib/live-news";
import { getLiveNews } from "@/lib/live-news.functions";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const liveResult = await getLiveNews();
    const article = getArticle(params.slug) ?? makeLiveArticle(params.slug, liveResult.items);
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

function paragraphize(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return ["The FinWorldNews desk is monitoring this developing story."];
  const sentences = clean.match(/[^.!?]+[.!?]+/g)?.map((part) => part.trim()).filter(Boolean) ?? [clean];
  if (sentences.length <= 2) return [clean];
  const size = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, size).join(" "), sentences.slice(size).join(" ")];
}

function makeLiveArticle(rawSlug: string, liveItems: NewsItem[] = fallbackItems): Article | undefined {
  const slug = decodeURIComponent(rawSlug);
  const live = liveItems.find((item) => item.id === slug || item.id === rawSlug);
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  if (normalized === "australia-gdp-q2-middle-east-rba" || slug.includes("australia-gdp")) {
    return {
      slug: rawSlug,
      title: "Australia posts second-quarter growth of 2.1%, beating expectations",
      standfirst: "Australia’s economy expanded faster than expected in the second quarter, strengthening the case for the Reserve Bank of Australia to keep inflation risks in focus.",
      summary: "GDP rose 2.1% year on year and 0.4% quarter on quarter, ahead of economist expectations.",
      market: "asia-pacific",
      topic: "Economy",
      tags: ["Australia", "GDP", "RBA"],
      author: "Lim Hui Jie · CNBC Markets",
      published: "2026-09-02",
      updated: "2026-09-02",
      readingMinutes: 3,
      takeaways: [
        "Australia’s economy grew 2.1% year on year in the second quarter, above the 1.8% expectation.",
        "Quarter-on-quarter GDP increased 0.4%, slightly ahead of the 0.3% forecast.",
        "The stronger print gives the Reserve Bank of Australia more room to consider further tightening.",
      ],
      sections: [
        { heading: "What happened", paragraphs: ["Australia’s economic growth beat expectations in the second quarter, expanding 2.1% year on year, according to data released Wednesday. Economists polled by Reuters had estimated growth of 1.8%, while the economy expanded 2.5% in the prior quarter.", "On a quarter-on-quarter basis, GDP rose 0.4%, also marginally surpassing expectations of 0.3%. The increase was driven by private demand and mining exports.", "The Australian Bureau of Statistics said households continued to behave cautiously, with spending rising just 0.4%. Households reduced fuel consumption amid elevated prices linked to the Middle East conflict and cut domestic and international travel."] },
        { heading: "Why markets care", paragraphs: ["The stronger-than-expected GDP print gives the Reserve Bank of Australia room to continue its policy tightening as it seeks to curb inflation. At its last meeting, some board members had considered the case for additional tightening because inflation remained too high.", "Australia’s July inflation reading came in at 3.5%, above the 3.3% forecast. The RBA expects inflation to decline only gradually and return to around the midpoint of its 2%-3% target range by late 2027."] },
        { heading: "What to watch next", paragraphs: ["Markets will focus on upcoming inflation data, household demand and the RBA’s next policy communication. The key question is whether stronger aggregate growth persists without adding fresh pressure to services prices and household budgets."] },
      ],
      analysis: ["Our read: the GDP upside shifts the near-term policy balance toward a more watchful RBA, but cautious household spending is an important counter-signal. Rates, the Australian dollar and domestic demand data will show whether the growth surprise has staying power."],
      faqs: [],
      sources: [{ name: "CNBC Markets", url: "https://www.cnbc.com/2026/09/02/australia-gdp-q2-middle-east-rba.html" }],
    };
  }

  if (!live) return undefined;
  const title = live.title;
  const published = live.published.slice(0, 10);
  return {
    slug: rawSlug, title, standfirst: live.summary, summary: live.summary, market: live.market, topic: live.topic,
    tags: [live.topic, "News briefing"], author: SITE.desk, published, updated: published, readingMinutes: 2,
    takeaways: [live.summary, "The next official release or policy decision is the key item to monitor."],
    sections: [
    { heading: "What happened", paragraphs: [paragraphize(live.summary)[0], `The report centers on ${live.title.toLowerCase()}. The FinWorldNews desk is separating the confirmed headline from the market reaction so readers can follow the facts as the story develops.`] },
    { heading: "Why markets care", paragraphs: [`This update matters because it can influence expectations around ${live.topic.toLowerCase()}, positioning and risk appetite. Traders will compare the initial reaction with moves in related assets rather than treating one price move as a conclusion.`] },
    { heading: "What to watch next", paragraphs: [`The next signal is likely to come from an official release, company filing or policy communication tied to ${live.topic.toLowerCase()}. Follow-through in the relevant market will help show whether this is a lasting change or a short-lived response.`] },
  ],
    analysis: ["Our read: treat the first move as information, not a conclusion. Confirmation from primary data and cross-asset pricing matters more than a single headline."], faqs: [], sources: [{ name: live.source, url: live.url }],
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

      <div className="mt-10" aria-label="Advertisement">
        <AdUnit />
      </div>

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
