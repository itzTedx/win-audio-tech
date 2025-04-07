"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/services/auth/lib/current-user";
import { CategoryType } from "@/services/categories/types";

import { addNewProduct } from "../action";
import { ProductSchema } from "../types";
import { CategoryField } from "./category-field";

interface Props {
  isEditMode: boolean;
  user: User;
  category?: CategoryType[];
}

export const ProductForm = ({ isEditMode, user, category }: Props) => {
  const router = useRouter();
  const id = useId();
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

  const categoryId = form.getValues("categoryId");

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

          <CategoryField
            data={category}
            categoryId={categoryId}
            userId={user.id}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="field-sizing-content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input placeholder="Category Title" type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 id="pricing">Pricing</h2>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="text"
                    inputMode="numeric"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="text"
                    inputMode="numeric"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Wholesale Price</FormLabel>
                <FormControl>
                  <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                    <Checkbox
                      id={id}
                      className="order-1 after:absolute after:inset-0"
                      aria-describedby={`${id}-description`}
                    />
                    <div className="flex grow items-center gap-3">
                      <svg
                        className="shrink-0"
                        width={32}
                        height={24}
                        viewBox="0 0 32 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <rect width="32" height="24" rx="4" fill="#252525" />
                        <path
                          d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z"
                          fill="#FF5A00"
                        />
                        <path
                          d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z"
                          fill="#EB001B"
                        />
                        <path
                          d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z"
                          fill="#F79E1B"
                        />
                      </svg>
                      <div className="grid gap-2">
                        <Label htmlFor={id}>Wholesale Price </Label>
                      </div>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 id="other">Others</h2>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="text"
                    inputMode="numeric"
                    {...field}
                  />
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
