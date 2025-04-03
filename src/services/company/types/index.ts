import { z } from "zod";

import { InferResultType } from "@/server/db";

export const companySchema = z.object({
  name: z.string(),
  logo: z.string().optional(),
});

export type CompanyType = InferResultType<"CompaniesTable">;
