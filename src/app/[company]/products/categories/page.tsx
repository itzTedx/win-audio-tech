import { redirect } from "next/navigation";

import { IconPlus } from "@tabler/icons-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { getCurrentUser } from "@/services/auth/lib/current-user";
import { CategoryForm } from "@/services/categories/components/form";

export default async function Categories({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");
  return (
    <div className="p-6">
      <Header
        title="Categories"
        description="Breif overview of product features and benefits"
        count={6}
      >
        <ResponsiveModal
          title="Add Category"
          description="Add a new category"
          trigger={
            <Button>
              <IconPlus /> Add Category
            </Button>
          }
        >
          <CategoryForm userId={user?.id} />
        </ResponsiveModal>
      </Header>
    </div>
  );
}
