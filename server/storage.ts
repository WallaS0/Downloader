import { users, type User, type InsertUser, downloads, type Download, type InsertDownload } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Download methods
  createDownload(download: InsertDownload): Promise<Download>;
  getDownloadsByUserId(userId: number): Promise<Download[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    // Use pg npm package directly for session store
    this.sessionStore = new PostgresSessionStore({
      tableName: 'session',
      // Connect to the database with the same URL Drizzle uses
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    // Ensure all required fields have values (non-undefined)
    const cleanedData = {
      ...insertDownload,
      title: insertDownload.title ?? null,
      format: insertDownload.format ?? null,
      userId: insertDownload.userId ?? null,
      quality: insertDownload.quality ?? null
    };
    
    const [download] = await db
      .insert(downloads)
      .values(cleanedData)
      .returning();
    return download;
  }

  async getDownloadsByUserId(userId: number): Promise<Download[]> {
    return db
      .select()
      .from(downloads)
      .where(eq(downloads.userId, userId));
  }
}

// Switch from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();
