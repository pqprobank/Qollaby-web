import { Client, Databases } from "node-appwrite";

import type { AppContentType } from "@/lib/app-links";

/** Match mobile `lib/appwriteCollections.ts` */
const COLLECTIONS = {
  posts: "posts",
  sponsor_ads: "sponsor_ads",
  exchange_listings: "exchange_listings",
} as const;

function isVideoMediaUrl(url: string): boolean {
  const u = url.trim();
  if (!u) return true;
  if (u.includes("type=video")) return true;
  const base = u.split("?")[0]?.toLowerCase() ?? "";
  return /\.(mp4|mov|avi|mkv|webm|m4v)$/.test(base);
}

function firstStillImageUrl(media: unknown, legacyImage?: unknown): string | undefined {
  if (Array.isArray(media)) {
    for (const item of media) {
      if (typeof item !== "string") continue;
      const s = item.trim();
      if (s && !isVideoMediaUrl(s)) return s;
    }
  }
  if (typeof legacyImage === "string" && legacyImage.trim() && !isVideoMediaUrl(legacyImage)) {
    return legacyImage.trim();
  }
  return undefined;
}

function truncate(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

function getServerDatabases(): { databases: Databases; databaseId: string } | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey =
    process.env.APPWRITE_API_KEY ?? process.env.EXPO_PUBLIC_APPWRITE_API_KEY;
  const databaseId =
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? process.env.APPWRITE_DATABASE_ID;
  if (!endpoint || !projectId || !apiKey || !databaseId) return null;
  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  return { databases: new Databases(client), databaseId };
}

export type ShareOgPayload = {
  title: string;
  description: string;
  imageUrl?: string;
};

/**
 * Loads post / ad / exchange from Appwrite for Open Graph (server-only).
 * Requires `APPWRITE_API_KEY` and database id env (see mobile app: `EXPO_PUBLIC_APPWRITE_DATABASE_ID`).
 * On any failure or missing env, returns `null` so callers can fall back to static screenshots.
 */
export async function fetchShareOgPayload(
  type: AppContentType,
  id: string,
): Promise<ShareOgPayload | null> {
  const ctx = getServerDatabases();
  if (!ctx || !id?.trim()) return null;

  const { databases, databaseId } = ctx;

  try {
    if (type === "post") {
      const doc = await databases.getDocument(databaseId, COLLECTIONS.posts, id);
      const rec = doc as Record<string, unknown>;
      if (rec.isBlacklisted === true) return null;
      const title = typeof rec.title === "string" && rec.title.trim() ? rec.title.trim() : "Post on Qollaby";
      const small =
        typeof rec.smallDescription === "string" ? rec.smallDescription.trim() : "";
      const long = typeof rec.description === "string" ? rec.description.trim() : "";
      const description = truncate(
        small || long || "View this Qollaby community post in the app.",
        220,
      );
      const imageUrl = firstStillImageUrl(rec.media, undefined);
      return { title, description, imageUrl };
    }

    if (type === "ad") {
      const doc = await databases.getDocument(databaseId, COLLECTIONS.sponsor_ads, id);
      const rec = doc as Record<string, unknown>;
      if (rec.isBlacklisted === true) return null;
      const title =
        typeof rec.title === "string" && rec.title.trim() ? rec.title.trim() : "Sponsor ad on Qollaby";
      const desc =
        typeof rec.description === "string" && rec.description.trim()
          ? rec.description.trim()
          : "View this Qollaby sponsor ad in the app.";
      const description = truncate(desc, 220);
      const imageUrl = firstStillImageUrl(rec.media, rec.image);
      return { title, description, imageUrl };
    }

    const doc = await databases.getDocument(databaseId, COLLECTIONS.exchange_listings, id);
    const rec = doc as Record<string, unknown>;
    const title =
      typeof rec.title === "string" && rec.title.trim()
        ? rec.title.trim()
        : "Exchange listing on Qollaby";
    const desc =
      typeof rec.description === "string" && rec.description.trim()
        ? rec.description.trim()
        : "View this Qollaby exchange listing in the app.";
    const description = truncate(desc, 220);
    const imageUrl = firstStillImageUrl(rec.media, undefined);
    return { title, description, imageUrl };
  } catch {
    return null;
  }
}
