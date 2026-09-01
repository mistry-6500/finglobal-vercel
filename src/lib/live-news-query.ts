import { queryOptions } from "@tanstack/react-query";

import { getLiveNews } from "@/lib/live-news.functions";
import { REFRESH_MS, fallbackItems, type LiveFeedResult } from "@/lib/live-news";

export const liveNewsQuery = queryOptions<LiveFeedResult>({
  queryKey: ["live-news"],
  queryFn: () => getLiveNews(),
  // Auto-refresh every 2 minutes, in the background and on window focus.
  refetchInterval: REFRESH_MS,
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true,
  staleTime: 60_000,
  placeholderData: (prev) =>
    prev ?? { items: fallbackItems, fetchedAt: new Date(0).toISOString(), live: false },
});
