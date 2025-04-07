"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { slugify } from "@/lib/utils";
import { db } from "@/server/db";
import { ProductsTable } from "@/server/schema";

import { ProductSchema } from "./types";

enum ProductError {
  INVALID_INPUT = "Invalid product information provided",
  PRODUCT_EXISTS = "A product with this title already exists",
  CREATION_FAILED = "Failed to create product",
  SYSTEM_ERROR = "An unexpected error occurred while creating the product",
  INVALID_USER = "Invalid user ID provided",
  DATABASE_ERROR = "Database operation failed",
}

export async function addNewProduct(
  unsafeData: z.infer<typeof ProductSchema>,
  userId: string
) {
  if (!userId?.trim()) {
    return { error: ProductError.INVALID_USER };
  }

  try {
    const { success, data, error } = ProductSchema.safeParse(unsafeData);

    if (!success) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      console.warn("Invalid product data:", errorMessage);
      return { error: `${ProductError.INVALID_INPUT}: ${errorMessage}` };
    }

    // Start a transaction
    return await db.transaction(async (tx) => {
      try {
        const existingProduct = await tx.query.ProductsTable.findFirst({
          where: eq(ProductsTable.title, data.title),
        });

        if (existingProduct != null) {
          console.warn(`Product already exists with title: ${data.title}`);
          return { error: ProductError.PRODUCT_EXISTS };
        }

        const [newProduct] = await tx
          .insert(ProductsTable)
          .values({
            title: data.title,
            sku: data.sku,
            slug: slugify(data.title),
            image: data.image,
            price: data.price?.toString(),
            user: data.user,
          })
          .returning({
            id: ProductsTable.id,
            title: ProductsTable.title,
            slug: ProductsTable.slug,
          });

        if (!newProduct?.id) {
          console.error(
            "Product creation failed: No new product data returned"
          );
          return { error: ProductError.CREATION_FAILED };
        }

        revalidatePath("/products");
        return {
          success: "Product created successfully!",
          slug: newProduct.slug,
        };
      } catch (error) {
        console.error("Database operation failed:", error);
        return { error: ProductError.DATABASE_ERROR };
      }
    });
  } catch (error) {
    console.error("Unhandled product creation error:", error);
    return { error: ProductError.SYSTEM_ERROR };
  }
}

export async function getProducts() {
  try {
    const products = await db.query.ProductsTable.findMany({
      orderBy: (products) => [products.title],
    });

    return { products };
  } catch (error) {
    console.error("Products fetching error:", error);
    return { error: ProductError.DATABASE_ERROR };
  }
}

export async function getProductBySlug(slug: string) {
  if (!slug?.trim()) {
    return { error: ProductError.INVALID_INPUT };
  }

  try {
    const product = await db.query.ProductsTable.findFirst({
      where: eq(ProductsTable.slug, slug),
    });

    if (!product) {
      return { error: "Product not found" };
    }

    return { product };
  } catch (error) {
    console.error("Product fetching error:", error);
    return { error: ProductError.DATABASE_ERROR };
  }
}
