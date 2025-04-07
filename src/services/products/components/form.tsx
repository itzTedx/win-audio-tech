"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ColorsInput } from "@/components/ui/colors-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addNewCategory } from "@/services/categories/action";
import { CategorySchema } from "@/services/categories/types";

interface Props {
  isEditMode: boolean;
}

export const ProductForm = ({ isEditMode }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CategorySchema>>({
    defaultValues: {
      title: "",
      color: "",
    },
  });

  const userId = "fsdf";
  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    setIsLoading(true);

    try {
      const result = await addNewCategory(data, userId);
      if (typeof result !== "string" && "success" in result) {
        toast.success("Category Created!");
        router.refresh();
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
        <div>Edit Mode: {isEditMode ? "true" : "false"}</div>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Category Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"color"}
            render={({ field }) => (
              <FormItem className="flex w-full flex-row items-start justify-between gap-3 sm:flex-row sm:items-center">
                <FormLabel>Tag Color:</FormLabel>
                <FormControl>
                  <ColorsInput value={field.value} onChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 className="animate-spin" /> Creating...
              </span>
            ) : (
              "Add New"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
