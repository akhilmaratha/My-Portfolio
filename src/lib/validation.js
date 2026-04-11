import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  tags: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["live", "wip", "draft"]),
  featured: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(2),
  percentage: z.number().min(0).max(100),
  category: z.enum(["frontend", "backend", "devops"]),
  icon: z.string().min(1).default("◌"),
  order: z.number().int().default(0),
});
