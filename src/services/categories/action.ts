"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/server/db";
import { ProductCategoriesTable } from "@/server/schema";
import { CategorySchema } from "./types";

enum CategoryError {
  INVALID_INPUT = "Invalid category data provided",
  CATEGORY_EXISTS = "A category with this name already exists",
  CREATION_FAILED = "Failed to create category",
  SYSTEM_ERROR = "An unexpected system error occurred",
  INVALID_USER = "Invalid user ID provided",
  DATABASE_ERROR = "Database operation failed",
}

export async function addNewCategory(
  unsafeData: z.infer<typeof CategorySchema>,
  userId: string
) {
  if (!userId?.trim()) {
    console.error('Add category attempted with invalid userId');
    return { error: CategoryError.INVALID_USER };
  }

  try {
    const { success, data, error } = CategorySchema.safeParse(unsafeData);

    if (!success) {
      const errorMessage = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(", ");
      console.warn("Invalid category data:", errorMessage);
      return { 
        error: CategoryError.INVALID_INPUT,
        details: errorMessage 
      };
    }

    return await db.transaction(async (tx) => {
      try {
        const existingCategory = await tx.query.ProductCategoriesTable.findFirst({
          where: eq(ProductCategoriesTable.title, data.title),
        });

        if (existingCategory != null) {
          console.warn(`Category creation failed: Category "${data.title}" already exists`);
          return { 
            error: CategoryError.CATEGORY_EXISTS,
            details: `Category "${data.title}" already exists` 
          };
        }

        const [newCategory] = await tx
          .insert(ProductCategoriesTable)
          .values({
            title: data.title,
            color: data.color,
            user: userId,
          })
          .returning({
            id: ProductCategoriesTable.id,
          });

        if (!newCategory?.id) {
          console.error("Category creation failed: Database did not return new category ID");
          return { 
            error: CategoryError.CREATION_FAILED,
            details: "Failed to create category record" 
          };
        }

        revalidatePath("/");
        return {
          success: `Category "${data.title}" created successfully`,
          categoryId: newCategory.id
        };
      } catch (error) {
        console.error("Database operation failed during category creation:", error);
        return { 
          error: CategoryError.DATABASE_ERROR,
          details: error instanceof Error ? error.message : 'Unknown database error'
        };
      }
    });
  } catch (error) {
    console.error("Unhandled category creation error:", error);
    return { 
      error: CategoryError.SYSTEM_ERROR,
      details: error instanceof Error ? error.message : 'Unknown system error'
    };
  }
}

export async function getCategories(uerId: string) {
  try {
    const categories = await db.query.ProductCategoriesTable.findMany({
      orderBy: (categories) => [categories.createdAt],
    });

    return { categories };
  } catch (error) {
    console.error("Categories fetching error:", error);
    return { error: CategoryError.DATABASE_ERROR };
  }
}

