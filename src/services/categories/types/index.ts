import { z } from "zod";

import { InferResultType } from "@/server/db";

export const CategorySchema = z.object({
  title: z.string(),
  color: z.string(),
});

export type CategoryType = InferResultType<"ProductCategoriesTable">;
