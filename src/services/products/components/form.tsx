"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { IconCheck, IconDeviceFloppy } from "@tabler/icons-react";
import { Barcode, Loader2 } from "lucide-react";
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
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { User } from "@/services/auth/lib/current-user";
import { CategoryType } from "@/services/categories/types";

import { addNewProduct } from "../action";
import { ProductSchema } from "../types";
import { BarcodeField } from "./barcode-field";
import { CategoryField } from "./category-field";
import { UnitField } from "./unit-field";

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

  const categoryId = form.watch("categoryId");
  const barcodeValue = form.watch("sku");
  const isBarcoded = form.watch("barcode");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative pb-12">
        <div className="bg-background/80 sticky top-[calc(4rem+1px)] py-4 backdrop-blur-lg">
          <Header
            title={`${isEditMode ? "Edit" : "Add"} Product`}
            withBackButton
            className="container"
          >
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <IconDeviceFloppy /> Save Draft
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="col-start-1 col-end-2 row-start-1 row-end-2 grid min-w-36 place-items-center"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="animate-spin" /> Adding...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <IconCheck /> {isEditMode ? "Edit" : "Add"} Product
                  </span>
                )}
              </Button>
            </div>
          </Header>
        </div>

        <div className="container">
          <h2 id="details" className="mt-6 mb-4">
            Product Details
          </h2>
          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-3 gap-9">
              <div className="col-span-2 space-y-6">
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
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="field-sizing-content min-h-[14ch]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel htmlFor="password">Product Image</FormLabel>
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
                                "rounded-md !py-6 !mt-0 border-input dark:bg-input/30 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                              allowedContent:
                                "flex h-8 flex-col items-center justify-center px-2 text-muted-foreground",
                            }}
                            onUploadBegin={() => {
                              toast.loading("Uploading...");
                            }}
                            onClientUploadComplete={(res) => {
                              setIsLoading(false);

                              form.setValue("image", res[0].url);
                              toast.dismiss();
                              toast.success("Logo Uploaded");
                            }}
                            onUploadError={(error: Error) => {
                              toast.dismiss();
                              form.setError("image", error);
                              toast.error(`ERROR! ${error.message}`);
                            }}
                          />
                        </div>
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
              </div>
            </div>

            <div>
              <h2 id="pricing" className="col-span-3 mb-4">
                Pricing
              </h2>
              <div className="grid grid-cols-3 gap-9">
                <div className="col-span-2 space-y-8">
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
                      <FormItem className="col-span-2">
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
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Wholesale Price</FormLabel>
                      <FormControl>
                        <div className="border-input has-data-[state=checked]:border-primary/50 relative flex h-fit w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                          <Checkbox
                            id={id}
                            className="order-1 after:absolute after:inset-0"
                            aria-describedby={`${id}-description`}
                            {...field}
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
                              <rect
                                width="32"
                                height="24"
                                rx="4"
                                fill="#252525"
                              />
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
              </div>
            </div>
            <h2 id="other">Others</h2>
            <div className="grid grid-cols-2 gap-9">
              <UnitField
                data={category}
                categoryId={categoryId}
                userId={user.id}
              />
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                        <Checkbox
                          id={id}
                          className="order-1 after:absolute after:inset-0"
                          aria-describedby={`${id}-description`}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <div className="flex grow items-center gap-3">
                          <Barcode />
                          <div className="grid gap-2">
                            <FormLabel>Barcode</FormLabel>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {barcodeValue && (
                <BarcodeField
                  value={barcodeValue}
                  className={cn(
                    "h-24 w-fit rounded-md bg-white p-1",
                    isBarcoded
                      ? "opacity-100"
                      : "touch-none opacity-30 select-none"
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
