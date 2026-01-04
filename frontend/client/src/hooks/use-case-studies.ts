import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

interface UseCaseStudiesOptions {
  division?: string;
  limit?: number;
  page?: number;
}

export function useCaseStudies(options: UseCaseStudiesOptions = {}) {
  const queryKey = [api.caseStudies.list.path, options.division, options.limit, options.page];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      const params: Record<string, string | number> = {};
      if (options.division) params.division = options.division;
      if (options.limit) params.limit = options.limit;
      if (options.page) params.page = options.page;

      const url = buildUrl(api.caseStudies.list.path);
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const finalUrl = queryString ? `${url}?${queryString}` : url;

      const res = await fetch(finalUrl);
      if (!res.ok) throw new Error("Failed to fetch case studies");
      return api.caseStudies.list.responses[200].parse(await res.json());
    },
  });
}

export function useCaseStudy(id: number) {
  return useQuery({
    queryKey: [api.caseStudies.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.caseStudies.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch case study");
      return api.caseStudies.get.responses[200].parse(await res.json());
    },
  });
}
