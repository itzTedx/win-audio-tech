"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/services/auth/lib/current-user";

import { addNewProduct } from "../action";
import { ProductSchema } from "../types";

interface Props {
  isEditMode: boolean;
  user: User;
}

export const UnitForm = ({ isEditMode, user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ProductSchema>>({
    defaultValues: {
      title: "",
      sku: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    setIsLoading(true);

    try {
      const result = await addNewProduct(data, user.id);
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
        <h2 id="details">Product Details</h2>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Code</FormLabel>
                <FormControl>
                  <Input placeholder="AB-1234" {...field} />
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
