import { z } from "zod";

import { InferResultType } from "@/server/db";

export const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  sku: z.string().optional(),
  categoryId: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  user: z.string(),
});

export const UnitSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  value: z.string(),
});

export type ProductType = InferResultType<"ProductsTable">;
