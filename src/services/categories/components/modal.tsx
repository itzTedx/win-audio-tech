"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CategoryForm } from "./form";

export default function CategoryModal() {
  const [categoryNodal, setCategoryModal] = useQueryState(
    "categoryModal",
    parseAsBoolean.withDefault(false)
  );

  const [userId, setUserId] = useQueryState("user");

  if (!userId) return null;

  return (
    <ResponsiveModal
      open={Boolean(categoryNodal)}
      onOpenChange={(isOpen) => {
        setCategoryModal(isOpen);
        if (!isOpen) setUserId(null);
      }}
      title="Add New Category"
      className="max-w-xl"
      asChild
    >
      <CategoryForm userId={userId} />
    </ResponsiveModal>
  );
}
