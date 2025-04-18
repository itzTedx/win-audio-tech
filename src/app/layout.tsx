import type { Metadata } from "next";
import { Suspense } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { lufga } from "@/assets/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import CategoryModal from "@/services/categories/components/modal";
import CompanyModal from "@/services/company/components/modal";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lufga.className} antialiased`}>
        <noscript className="noscript:block hidden">
          Please enable JavaScript to use this app.
        </noscript>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Suspense fallback={<div>Loading...</div>}>
              <CompanyModal />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <CategoryModal />
            </Suspense>
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
