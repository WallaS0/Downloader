import { pgTable, text, serial, timestamp, json, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  videoUrl: text("video_url").notNull(),
  platform: text("platform").notNull(),
  title: text("title"),
  quality: text("quality"),
  format: text("format"),
  downloadedAt: timestamp("downloaded_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDownloadSchema = createInsertSchema(downloads).omit({
  id: true,
  downloadedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Download = typeof downloads.$inferSelect;

// Video schemas
export const videoInfoSchema = z.object({
  url: z.string().url(),
  platform: z.enum(["youtube", "tiktok", "facebook", "instagram"]),
});

export const downloadOptionsSchema = z.object({
  videoUrl: z.string().url(),
  quality: z.string().optional(),
  format: z.string().optional(),
  removeWatermark: z.boolean().optional(),
  convertToMp3: z.boolean().optional(),
  saveToHistory: z.boolean().optional(),
});

export type VideoInfo = z.infer<typeof videoInfoSchema>;
export type DownloadOptions = z.infer<typeof downloadOptionsSchema>;
