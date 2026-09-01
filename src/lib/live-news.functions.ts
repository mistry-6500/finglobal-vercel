import { createServerFn } from "@tanstack/react-start";

import { fetchLiveNews } from "@/lib/rss.server";

export const getLiveNews = createServerFn({ method: "GET" }).handler(async () => {
  return fetchLiveNews();
});
