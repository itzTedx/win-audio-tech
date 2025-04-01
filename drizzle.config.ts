import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: "./.env.local",
});

if (typeof process.env.DATABASE_URL !== "string") {
  throw new Error("Please set your DATABASE_URL");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/server/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
