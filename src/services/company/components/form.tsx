"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/lib/uploadthing";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { addNewCompany } from "../action";
import { companySchema } from "../types";

export function CompanyForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof companySchema>>({
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  async function onSubmit(data: z.infer<typeof companySchema>) {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await addNewCompany(data);
      if (typeof result !== "string" && result.success) {
        toast.success("Login successful!");
        router.push("/");
      }
      if (typeof result !== "string" && result.error) {
        setError(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Company Logo</FormLabel>
                </div>
                <FormControl>
                  <div className="relative">
                    <UploadDropzone
                      endpoint="imageUploader"
                      appearance={{
                        button:
                          "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
                        container:
                          "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                        allowedContent:
                          "flex h-8 flex-col items-center justify-center px-2 text-white",
                      }}
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        alert("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
