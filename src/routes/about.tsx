import { createFileRoute, Link } from "@tanstack/react-router";

import { SITE, markets, articles } from "@/data/news";
import { seo } from "@/lib/seo";

const faqs = [
  {
    q: "What does FinWorldNews cover?",
    a: "Global financial markets only: equities, central bank policy, sovereign bonds, commodities, foreign exchange and digital assets across the United States, Europe, Asia-Pacific and global venues.",
  },
  {
    q: "How often is FinWorldNews updated?",
    a: "The market desks are updated daily. Every story carries a publication date, and the header shows the date of the most recent update.",
  },
  {
    q: "How does FinWorldNews check accuracy?",
    a: "Each story links to a primary source such as a central bank release, an exchange filing, a statistical agency or a company disclosure. Figures are quoted as published and never estimated.",
  },
  {
    q: "Is FinWorldNews investment advice?",
    a: "No. The site publishes market news and context for information only. It does not make recommendations and does not account for any individual's circumstances.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    ...seo({
      title: "About FinWorldNews — editorial standards and sourcing",
      description:
        "How FinWorldNews reports global financial markets: primary sources, dated figures, six market desks and a strict no-advice policy.",
      path: "/about",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="eyebrow text-primary">Editorial standards</p>
      <h1 className="mt-2 text-3xl font-extrabold lg:text-5xl">About FinWorldNews</h1>
      <p className="mt-4 text-lg text-muted-foreground">{SITE.description}</p>

      <h2 className="mt-10 text-xl font-semibold">How we source stories</h2>
      <p className="mt-2 text-muted-foreground">{SITE.editorialPolicy}</p>

      <h2 className="mt-8 text-xl font-semibold">Our desks</h2>
      <ul className="mt-3 space-y-2">
        {markets.map((m) => (
          <li key={m.slug} className="text-muted-foreground">
            <Link
              to="/markets/$market"
              params={{ market: m.slug }}
              className="font-medium text-foreground hover:text-primary"
            >
              {m.name}
            </Link>{" "}
            — {m.tagline}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted-foreground">
        {articles.length} published stories across {markets.length} desks.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Frequently asked questions</h2>
      <dl className="mt-4 space-y-5">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-lg border border-border bg-card p-5">
            <dt className="font-semibold">{f.q}</dt>
            <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
