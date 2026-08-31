import { SITE } from "@/data/news";

export const seo = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: SITE.name },
    { property: "og:url", content: path },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  links: [{ rel: "canonical", href: path }],
});

export const jsonLd = (data: unknown) => ({
  type: "application/ld+json" as const,
  children: JSON.stringify(data),
});
