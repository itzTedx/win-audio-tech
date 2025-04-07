import { useCallback, useMemo, useState } from "react";

import { IconCaretUpDownFilled, IconPlus } from "@tabler/icons-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/services/categories/types";

import { ProductSchema } from "../types";

interface Props {
  data?: CategoryType[];
  categoryId: string;
  userId: string;
}

export const CategoryField = ({ data, categoryId, userId }: Props) => {
  const [openPopover, setOpenPopover] = useState(false);

  const form = useFormContext<z.infer<typeof ProductSchema>>();

  const [_, setCategoryModal] = useQueryState(
    "categoryModal",
    parseAsBoolean.withDefault(false)
  );
  const [__, setUserId] = useQueryState("user");

  // Memoize company lookup
  const selectedCategory = useMemo(() => {
    return data?.find((cat) => cat.id === categoryId);
  }, [data, categoryId]);

  // Memoize selection handler
  const handleSelect = useCallback(
    (categoryId?: string) => {
      if (categoryId) {
        form.setValue("categoryId", categoryId);
        setOpenPopover(false);
      }
    },
    [form]
  );

  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>

          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "border-input text-foreground w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {selectedCategory ? (
                    <span className="inline-flex items-center gap-2.5">
                      <span>{selectedCategory.title}</span>
                    </span>
                  ) : (
                    "Select Category"
                  )}
                  <IconCaretUpDownFilled className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 sm:w-[19.5rem]">
              <Command>
                <CommandInput placeholder="Search Category..." />
                <CommandEmpty>Company not found</CommandEmpty>
                <CommandList className="max-h-[300px] overflow-auto">
                  <CommandGroup heading="Category   ">
                    {data?.map((cat) => (
                      <CommandItem
                        value={cat.title}
                        className="cursor-pointer gap-2.5 px-2 py-2.5 font-medium"
                        key={cat.id}
                        onSelect={() => handleSelect(cat.id?.toString())}
                      >
                        <span>{cat.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading="New Category?">
                    <CommandItem className="cursor-pointer font-medium">
                      <Button
                        onClick={() => {
                          setCategoryModal(true);
                          setUserId(userId || null);
                        }}
                        type="button"
                        variant="ghost"
                        className="px-px"
                      >
                        <div className="flex size-6 items-center justify-center rounded-sm border">
                          <IconPlus className="size-4" />
                        </div>
                        Add new
                      </Button>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
