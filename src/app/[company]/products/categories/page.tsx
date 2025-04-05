import { redirect } from "next/navigation";

import {
  IconDots,
  IconEdit,
  IconGripVertical,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUser } from "@/services/auth/lib/current-user";
import { getCategories } from "@/services/categories/action";
import { CategoryForm } from "@/services/categories/components/form";

export default async function Categories({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const { categories } = await getCategories(user.id);
  return (
    <div className="container py-6">
      <Header
        title="Categories"
        description="Breif overview of product features and benefits"
        count={categories?.length}
        className="mb-12"
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
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="sr-only">Reorder</TableHead>

              <TableHead className="w-full">Title</TableHead>
              <TableHead>
                <IconDots className="text-muted-foreground size-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id} className="bg-sidebar">
                <TableCell>
                  <IconGripVertical className="text-muted-foreground/50 hover:text-muted-foreground size-4 cursor-pointer transition-colors" />
                </TableCell>

                <TableCell>
                  <div
                    className="mr-3 inline-flex size-3 rounded-full"
                    style={{ backgroundColor: category.color || "#000" }}
                  />
                  <span>{category.title}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <span className="sr-only">Edit</span>
                      <IconEdit />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <span className="sr-only">Delete</span>
                      <IconTrash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
