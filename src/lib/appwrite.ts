import { Account, Client, Databases, Functions, Query } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

export const FUNCTION_ID = "6912336f0003fa28035f";

export const Collections = {
  PROFILE: "profile",
  PLANS: "plans",
  SUBSCRIPTIONS: "subscriptions",
} as const;

export { Query };
export default client;
