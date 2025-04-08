import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/auth/lib/current-user";
import { getCategories } from "@/services/categories/action";
import { ProductForm } from "@/services/products/components/form";

export default async function ProductCustomizePage({
  params,
}: {
  params: Promise<{ company: string; id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");
  const { categories } = await getCategories(user.id);

  const isEditMode = id !== "create";

  return (
    <ProductForm isEditMode={isEditMode} user={user} category={categories} />
  );
}
