"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof companySchema>>({
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  async function onSubmit(data: z.infer<typeof companySchema>) {
    setIsLoading(true);

    try {
      const result = await addNewCompany(data);
      if (typeof result !== "string" && result.success) {
        toast.success("Company Created!");
      }
      if (typeof result !== "string" && result.error) {
        toast.dismiss();
        toast.error(result.error);
      }
    } finally {
      setIsLoading(false);
      toast.dismiss();
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
                      config={{
                        mode: "auto",
                      }}
                      appearance={{
                        button:
                          "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed bg-red-500 bg-none after:bg-green-600",
                        container:
                          "rounded-md  border-input dark:bg-input/30 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        allowedContent:
                          "flex h-8 flex-col items-center justify-center px-2 text-muted-foreground",
                      }}
                      onUploadBegin={() => {
                        toast.loading("Uploading...");
                      }}
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        toast.dismiss();
                        toast.success("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        toast.dismiss();
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span>
                <Loader2 className="animate-spin" /> Signing in...
              </span>
            ) : (
              "Add New"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
