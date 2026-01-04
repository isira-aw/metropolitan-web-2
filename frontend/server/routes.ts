import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { DIVISIONS } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Case Studies
  app.get(api.caseStudies.list.path, async (req, res) => {
    const division = req.query.division as string | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data, total } = await storage.getCaseStudies(division, limit, offset);
    
    res.json({
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
  });

  app.get(api.caseStudies.get.path, async (req, res) => {
    const item = await storage.getCaseStudy(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Case Study not found' });
    }
    res.json(item);
  });

  // News
  app.get(api.news.list.path, async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { data, total } = await storage.getNews(limit, offset);
    
    res.json({
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
  });

  app.get(api.news.get.path, async (req, res) => {
    const item = await storage.getNewsItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    res.json(item);
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const item = await storage.createInquiry(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Careers
  app.post(api.careers.apply.path, async (req, res) => {
    try {
      const input = api.careers.apply.input.parse(req.body);
      const item = await storage.createJobApplication(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    const division = req.query.division as string | undefined;
    const items = await storage.getTestimonials(division);
    res.json(items);
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingCaseStudies = await storage.getCaseStudies(undefined, 1);
  if (existingCaseStudies.total === 0) {
    console.log("Seeding database...");
    
    // Seed Case Studies
    const sampleImages = [
      "https://images.unsplash.com/photo-1558444479-c8498174f680?auto=format&fit=crop&q=80&w=2070", // AC
      "https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?auto=format&fit=crop&q=80&w=2070", // Elevator
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ec4?auto=format&fit=crop&q=80&w=2070", // Fire
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=2070", // Generator
      "https://images.unsplash.com/photo-1509391366360-fe5bb6585828?auto=format&fit=crop&q=80&w=2070", // Solar
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070", // ELV
    ];

    for (let i = 0; i < 18; i++) {
      const division = DIVISIONS[i % DIVISIONS.length];
      await storage.createCaseStudy({
        title: `${division} Project ${i + 1}: Modern Solution`,
        description: "A groundbreaking project delivering state-of-the-art infrastructure and sustainable design. This project exemplifies our commitment to excellence and innovation in the metropolitan landscape.",
        image: sampleImages[i % sampleImages.length],
        division: division,
        client: `Client ${i + 1} Corp`,
        location: "Metropolitan Area",
        completionDate: "2024",
      });
    }

    // Seed News
    for (let i = 0; i < 10; i++) {
      await storage.createNews({
        title: `Metropolitan News: Expansion into ${DIVISIONS[i % DIVISIONS.length]} Sector`,
        content: "<p>We are expanding our operations to provide even better services in the metropolitan region.</p>",
        image: sampleImages[i % sampleImages.length],
        summary: "We are thrilled to announce a significant achievement in our ongoing efforts to redefine urban living.",
      });
    }
    // Seed Testimonials
    const sampleTestimonials = [
      { author: "John Smith", role: "Project Manager", content: "Exceptional quality and reliability." },
      { author: "Sarah Jane", role: "Facility Director", content: "Professional team and great support." },
    ];

    for (const div of DIVISIONS) {
      for (const t of sampleTestimonials) {
        await storage.createTestimonial({
          ...t,
          division: div,
        });
      }
    }

    console.log("Database seeded successfully.");
  }
}
