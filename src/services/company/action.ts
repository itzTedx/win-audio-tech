"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { slugify } from "@/lib/utils";
import { db } from "@/server/db";
import { CompaniesTable } from "@/server/schema";

import { companySchema } from "./types";

enum CompanyError {
  INVALID_INPUT = "Invalid company information provided",
  COMPANY_EXISTS = "A company with this name already exists",
  CREATION_FAILED = "Failed to create company",
  SYSTEM_ERROR = "An unexpected error occurred while creating the company",
  INVALID_LOGO = "Invalid logo format or size",
  INVALID_USER = "Invalid user ID provided",
  DATABASE_ERROR = "Database operation failed",
}

export async function addNewCompany(
  unsafeData: z.infer<typeof companySchema>,
  userId: string
) {
  if (!userId?.trim()) {
    return { error: CompanyError.INVALID_USER };
  }

  try {
    const { success, data, error } = companySchema.safeParse(unsafeData);

    if (!success) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      console.warn("Invalid company data:", errorMessage);
      return { error: `${CompanyError.INVALID_INPUT}: ${errorMessage}` };
    }

    // Start a transaction
    return await db.transaction(async (tx) => {
      try {
        const existingCompany = await tx.query.CompaniesTable.findFirst({
          where: eq(CompaniesTable.name, data.name),
        });

        if (existingCompany != null) {
          console.warn(`Company already exists with name: ${data.name}`);
          return { error: CompanyError.COMPANY_EXISTS };
        }

        const [newCompany] = await tx
          .insert(CompaniesTable)
          .values({
            name: data.name,
            logo: data.logo,
            slug: slugify(data.name),
            user: userId,
          })
          .returning({
            id: CompaniesTable.id,
            name: CompaniesTable.name,
            slug: CompaniesTable.slug,
          });

        if (!newCompany?.id) {
          console.error(
            "Company creation failed: No new company data returned"
          );
          return { error: CompanyError.CREATION_FAILED };
        }

        revalidatePath("/");
        return {
          success: "Company created successfully!",
          slug: newCompany.slug,
        };
      } catch (error) {
        console.error("Database operation failed:", error);
        return { error: CompanyError.DATABASE_ERROR };
      }
    });
  } catch (error) {
    console.error("Unhandled company creation error:", error);
    return { error: CompanyError.SYSTEM_ERROR };
  }
}

export async function getCompanies() {
  try {
    const companies = await db.query.CompaniesTable.findMany({
      orderBy: (companies) => [companies.name],
    });

    return { companies };
  } catch (error) {
    console.error("Companies fetching error:", error);
    return { error: CompanyError.DATABASE_ERROR };
  }
}

export async function getCompanyBySlug(slug: string) {
  if (!slug?.trim()) {
    return { error: CompanyError.INVALID_INPUT };
  }

  try {
    const company = await db.query.CompaniesTable.findFirst({
      where: eq(CompaniesTable.slug, slug),
    });

    if (!company) {
      return { error: "Company not found" };
    }

    return { company };
  } catch (error) {
    console.error("Company fetching error:", error);
    return { error: CompanyError.DATABASE_ERROR };
  }
}
