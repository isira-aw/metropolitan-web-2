import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

interface UseNewsOptions {
  limit?: number;
  page?: number;
}

export function useNews(options: UseNewsOptions = {}) {
  const queryKey = [api.news.list.path, options.limit, options.page];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const params: Record<string, string | number> = {};
      if (options.limit) params.limit = options.limit;
      if (options.page) params.page = options.page;

      const url = buildUrl(api.news.list.path);
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const finalUrl = queryString ? `${url}?${queryString}` : url;

      const res = await fetch(finalUrl);
      if (!res.ok) throw new Error("Failed to fetch news");
      return api.news.list.responses[200].parse(await res.json());
    },
  });
}

export function useNewsItem(id: number) {
  return useQuery({
    queryKey: [api.news.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.news.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch news item");
      return api.news.get.responses[200].parse(await res.json());
    },
  });
}
