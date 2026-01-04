import { z } from 'zod';
import { insertCaseStudySchema, insertInquirySchema, insertJobApplicationSchema, insertNewsSchema, caseStudies, news, inquiries, jobApplications } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  caseStudies: {
    list: {
      method: 'GET' as const,
      path: '/api/case-studies',
      input: z.object({
        division: z.string().optional(),
        limit: z.coerce.number().optional(),
        page: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.object({
            data: z.array(z.custom<typeof caseStudies.$inferSelect>()),
            total: z.number(),
            page: z.number(),
            totalPages: z.number()
        }),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/case-studies/:id',
      responses: {
        200: z.custom<typeof caseStudies.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  news: {
    list: {
      method: 'GET' as const,
      path: '/api/news',
      input: z.object({
        limit: z.coerce.number().optional(),
        page: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.object({
            data: z.array(z.custom<typeof news.$inferSelect>()),
            total: z.number(),
            page: z.number(),
            totalPages: z.number()
        }),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/news/:id',
      responses: {
        200: z.custom<typeof news.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries',
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  careers: {
    apply: {
      method: 'POST' as const,
      path: '/api/careers/apply',
      input: insertJobApplicationSchema,
      responses: {
        201: z.custom<typeof jobApplications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
