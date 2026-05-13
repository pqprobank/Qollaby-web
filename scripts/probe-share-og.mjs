/**
 * One-off: load .env.local, pick latest post id, print OG probe for production.
 * Run: node scripts/probe-share-og.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Client, Databases, Query } from "node-appwrite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvFile(relPath) {
  try {
    const raw = readFileSync(join(root, relPath), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {
    // optional file
  }
}

loadEnvFile(".env.local");
// Monorepo: main Expo app `.env` often has EXPO_PUBLIC_APPWRITE_API_KEY
loadEnvFile("../.env");

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey =
  process.env.APPWRITE_API_KEY ?? process.env.EXPO_PUBLIC_APPWRITE_API_KEY;
const databaseId =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? process.env.APPWRITE_DATABASE_ID;

if (!endpoint || !projectId || !apiKey || !databaseId) {
  console.error(
    "Missing env: need endpoint, project id, database id, and APPWRITE_API_KEY or EXPO_PUBLIC_APPWRITE_API_KEY."
  );
  process.exit(1);
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);

const posts = await databases.listDocuments(databaseId, "posts", [
  Query.orderDesc("$createdAt"),
  Query.limit(1),
]);

const id = posts.documents[0]?.$id;
if (!id) {
  console.error("No posts in database.");
  process.exit(1);
}

const doc = await databases.getDocument(databaseId, "posts", id);
const title = typeof doc.title === "string" ? doc.title : "";
const media = Array.isArray(doc.media) ? doc.media : [];

console.log(JSON.stringify({ samplePostId: id, appwriteTitle: title, mediaCount: media.length }, null, 2));

const url = `https://www.qollaby.com/post/${id}`;
const res = await fetch(url, {
  headers: { "user-agent": "facebookexternalhit/1.1" },
  redirect: "follow",
});
const html = await res.text();
const ogTitle = html.match(/property="og:title"[^>]*content="([^"]*)"/)?.[1];
const ogImage = html.match(/property="og:image"[^>]*content="([^"]*)"/)?.[1];

console.log(
  JSON.stringify(
    {
      crawledUrl: url,
      httpStatus: res.status,
      ogTitle,
      ogImage,
      dynamicTitleMatch: ogTitle && title && ogTitle === title,
      dynamicImage: Boolean(ogImage && !ogImage.includes("screenshot-discover")),
    },
    null,
    2
  )
);
