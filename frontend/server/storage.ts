import { db } from "./db";
import {
  caseStudies,
  news,
  inquiries,
  jobApplications,
  testimonials,
  type InsertCaseStudy,
  type InsertNews,
  type InsertInquiry,
  type InsertJobApplication,
  type InsertTestimonial,
  type CaseStudy,
  type NewsItem,
  type Inquiry,
  type JobApplication,
  type Testimonial
} from "@shared/schema";
import { eq, desc, count, sql } from "drizzle-orm";

export interface IStorage {
  // Case Studies
  getCaseStudies(division?: string, limit?: number, offset?: number): Promise<{ data: CaseStudy[]; total: number }>;
  getCaseStudy(id: number): Promise<CaseStudy | undefined>;
  createCaseStudy(item: InsertCaseStudy): Promise<CaseStudy>;

  // News
  getNews(limit?: number, offset?: number): Promise<{ data: NewsItem[]; total: number }>;
  getNewsItem(id: number): Promise<NewsItem | undefined>;
  createNews(item: InsertNews): Promise<NewsItem>;

  // Inquiries
  createInquiry(item: InsertInquiry): Promise<Inquiry>;

  // Job Applications
  createJobApplication(item: InsertJobApplication): Promise<JobApplication>;

  // Testimonials
  getTestimonials(division?: string): Promise<Testimonial[]>;
  createTestimonial(item: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  async getCaseStudies(division?: string, limit: number = 10, offset: number = 0): Promise<{ data: CaseStudy[]; total: number }> {
    let conditions = undefined;
    if (division) {
      conditions = eq(caseStudies.division, division);
    }

    const data = await db.select()
      .from(caseStudies)
      .where(conditions)
      .orderBy(desc(caseStudies.createdAt))
      .limit(limit)
      .offset(offset);
    
    const totalResult = await db.select({ count: count() })
      .from(caseStudies)
      .where(conditions);
    
    const total = totalResult[0]?.count || 0;

    return { data, total };
  }

  async getCaseStudy(id: number): Promise<CaseStudy | undefined> {
    const [item] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return item;
  }

  async createCaseStudy(item: InsertCaseStudy): Promise<CaseStudy> {
    const [newItem] = await db.insert(caseStudies).values(item).returning();
    return newItem;
  }

  async getNews(limit: number = 10, offset: number = 0): Promise<{ data: NewsItem[]; total: number }> {
    const data = await db.select()
      .from(news)
      .orderBy(desc(news.date))
      .limit(limit)
      .offset(offset);

    const totalResult = await db.select({ count: count() }).from(news);
    const total = totalResult[0]?.count || 0;

    return { data, total };
  }

  async getNewsItem(id: number): Promise<NewsItem | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }

  async createNews(item: InsertNews): Promise<NewsItem> {
    const [newItem] = await db.insert(news).values(item).returning();
    return newItem;
  }

  async createInquiry(item: InsertInquiry): Promise<Inquiry> {
    const [newItem] = await db.insert(inquiries).values(item).returning();
    return newItem;
  }

  async createJobApplication(item: InsertJobApplication): Promise<JobApplication> {
    const [newItem] = await db.insert(jobApplications).values(item).returning();
    return newItem;
  }

  async getTestimonials(division?: string): Promise<Testimonial[]> {
    let query = db.select().from(testimonials);
    if (division) {
      query = query.where(eq(testimonials.division, division)) as any;
    }
    return await query.orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(item: InsertTestimonial): Promise<Testimonial> {
    const [newItem] = await db.insert(testimonials).values(item).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
