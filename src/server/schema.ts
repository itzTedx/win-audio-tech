import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const UserRoles = ["admin", "user"] as const;
export type UserRole = (typeof UserRoles)[number];
export const userRoleEnum = pgEnum("user_role", UserRoles);

export const UsersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
  role: userRoleEnum().notNull().default("user"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const CompaniesTable = pgTable("companies", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logo: text("logo"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
