import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { liveNewsQuery } from "@/lib/live-news-query";
import { REFRESH_MS, byNewest, fallbackItems, type NewsItem } from "@/lib/live-news";

export function useLiveNews() {
  const { data, isFetching, dataUpdatedAt } = useQuery(liveNewsQuery);
  const items: NewsItem[] = byNewest(data?.items ?? fallbackItems);
  return {
    items,
    live: data?.live ?? false,
    isFetching,
    fetchedAt: data?.fetchedAt ?? null,
    dataUpdatedAt,
  };
}

/** Ticks every 30s so "3m ago" labels stay honest between refreshes. */
export function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export const REFRESH_INTERVAL_MS = REFRESH_MS;
