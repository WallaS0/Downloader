import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { videoInfoSchema, downloadOptionsSchema } from "@shared/schema";
import ytdl from "ytdl-core";
// NOTE: tiktok-scraper has dependency issues with Node.js 20, temporarily disabled

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // API routes for video functionality
  app.post("/api/video/info", async (req, res) => {
    try {
      const { url, platform } = videoInfoSchema.parse(req.body);
      
      let videoInfo;
      
      switch (platform) {
        case "youtube":
          if (!ytdl.validateURL(url)) {
            return res.status(400).json({ message: "Invalid YouTube URL" });
          }
          videoInfo = await ytdl.getInfo(url);
          return res.json({
            title: videoInfo.videoDetails.title,
            thumbnail: videoInfo.videoDetails.thumbnails.pop()?.url,
            duration: videoInfo.videoDetails.lengthSeconds,
            platform: "youtube",
            formats: videoInfo.formats.map(format => ({
              quality: format.qualityLabel,
              audioQuality: format.audioQuality,
              itag: format.itag,
              mimeType: format.mimeType,
              size: format.contentLength,
            })),
          });
          
        case "tiktok":
          // TikTok functionality temporarily disabled due to dependency issues
          return res.status(501).json({ 
            message: "TikTok downloads temporarily unavailable, we are working on it!" 
          });
          
        case "facebook":
        case "instagram":
          return res.status(501).json({ message: `${platform} downloads coming soon` });
          
        default:
          return res.status(400).json({ message: "Unsupported platform" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error fetching video info:", error);
      return res.status(500).json({ message: "Failed to fetch video information" });
    }
  });

  app.post("/api/video/download", async (req, res) => {
    try {
      const options = downloadOptionsSchema.parse(req.body);
      
      if (options.videoUrl.includes("youtube.com") || options.videoUrl.includes("youtu.be")) {
        // For YouTube, stream the video directly
        const ytOptions: any = { quality: options.quality };
        
        if (options.format === "audio") {
          ytOptions.filter = "audioonly";
        }
        
        const videoStream = ytdl(options.videoUrl, ytOptions);
        
        // Set response headers
        res.setHeader('Content-Disposition', `attachment; filename="${Date.now()}.${options.format === "audio" ? "mp3" : "mp4"}"`);
        res.setHeader('Content-Type', options.format === "audio" ? 'audio/mpeg' : 'video/mp4');
        
        // Save to history if user is authenticated and option is selected
        if (req.isAuthenticated() && options.saveToHistory) {
          const userId = (req.user as any).id;
          
          const videoInfo = await ytdl.getInfo(options.videoUrl);
          await storage.createDownload({
            userId,
            videoUrl: options.videoUrl,
            platform: "youtube",
            title: videoInfo.videoDetails.title,
            quality: options.quality || "default",
            format: options.format || "mp4",
          });
        }
        
        // Stream the video back to the client
        videoStream.pipe(res);
        return;
      }
      
      // For other platforms, return a 501 Not Implemented
      return res.status(501).json({ message: "Download for this platform not yet implemented" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      console.error("Error downloading video:", error);
      return res.status(500).json({ message: "Failed to download video" });
    }
  });
  
  // Get user download history
  app.get("/api/downloads", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = (req.user as any).id;
      const downloads = await storage.getDownloadsByUserId(userId);
      return res.json(downloads);
    } catch (error) {
      console.error("Error fetching download history:", error);
      return res.status(500).json({ message: "Failed to fetch download history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
