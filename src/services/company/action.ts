"use server";

import { db } from "@/server/db";
import { CompaniesTable } from "@/server/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { companySchema } from "./types";

enum CompanyError {
  INVALID_INPUT = "Invalid company information provided",
  COMPANY_EXISTS = "A company with this name already exists",
  CREATION_FAILED = "Failed to create company",
  SYSTEM_ERROR = "An unexpected error occurred while creating the company",
  INVALID_LOGO = "Invalid logo format or size",
}

export async function addNewCompany(unsafeData: z.infer<typeof companySchema>) {
  try {
    const { success, data, error } = companySchema.safeParse(unsafeData);

    if (!success) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return { error: `${CompanyError.INVALID_INPUT}: ${errorMessage}` };
    }


     let existingCompany;
        try {
          existingCompany = await db.query.UsersTable.findFirst({
            where: eq(CompaniesTable.name, data.name),
          });
        } catch (error) {
          console.error("Database error checking existing user:", error);
          return { error: CompanyError.SYSTEM_ERROR };
        }
    
        if (existingCompany != null) {
          return { error: CompanyError.COMPANY_EXISTS };
        }
    
   

    const [newCompany] = await db.insert(CompaniesTable).values({
      name: data.name,
      logo: data.logo,
    }).returning({ name: CompaniesTable.name });

    if (!newCompany) {
      console.error("Company creation failed: No new company data returned");
      return { error: CompanyError.CREATION_FAILED };
    }

    return { success: "Company created successfully!" };
  } catch (error) {
    console.error("Company creation error:", error);
    return { error: CompanyError.SYSTEM_ERROR };
  }
}
