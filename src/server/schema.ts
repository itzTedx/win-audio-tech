import {
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
  slug: varchar("slug").notNull().unique(),
  logo: text("logo"),
  user: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const ProductsTable = pgTable("products", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  sku: text("title"),
  slug: text("slug").notNull().unique(),
  image: text("logo"),

  price: numeric("price", { precision: 10, scale: 2 }),

  user: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const ProductCategoriesTable = pgTable("product_categories", {
  id: uuid().primaryKey().defaultRandom(),
  title: text("name").notNull(),
  color: text("color"),

  user: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
