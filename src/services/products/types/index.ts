import { z } from "zod";

import { InferResultType } from "@/server/db";

export const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  sku: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  user: z.string(),
});

export type ProductType = InferResultType<"ProductsTable">;
