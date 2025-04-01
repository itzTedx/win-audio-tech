"use server";

import { z } from "zod";

import { companySchema } from "./types";

enum AuthError {
  INVALID_CREDENTIALS = "The email or password you entered is incorrect",
  ACCOUNT_NOT_FOUND = "No account found with this email",
  INVALID_INPUT = "Please check your input and try again",
  SYSTEM_ERROR = "An unexpected error occurred. Please try again later",
  ACCOUNT_NOT_CONFIGURED = "Your account is not properly configured. Please contact support",
  EMAIL_EXISTS = "An account already exists with this email",
  SIGNUP_FAILED = "Failed to create account",
  VALIDATION_ERROR = "Invalid signup information provided",
}

export async function addNewCompany(unsafeData: z.infer<typeof companySchema>) {
  try {
    const { success, data, error } = companySchema.safeParse(unsafeData);

    if (!success) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return `${AuthError.INVALID_INPUT}: ${errorMessage}`;
    }

    return { success: "Login successful" };
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error: AuthError.SYSTEM_ERROR };
  }
}
