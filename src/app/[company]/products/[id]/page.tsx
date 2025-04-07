import { Header } from "@/components/ui/header";
import { ProductForm } from "@/services/products/components/form";

export default async function ProductCustomizePage({
  params,
}: {
  params: Promise<{ company: string; id: string }>;
}) {
  const { id } = await params;

  const isEditMode = id !== "create";

  return (
    <div className="container py-6">
      <Header title="Add Product" withBackButton />
      <section className="mt-6">
        <ProductForm isEditMode={isEditMode} />
      </section>
    </div>
  );
}
