import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with a single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading or trailing hyphens
    .replace(/-+/g, "-"); // Remove duplicate hyphens
}
