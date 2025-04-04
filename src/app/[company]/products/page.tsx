import Link from "next/link";

import { IconPlus, IconUpload } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";

export default async function Products({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  return (
    <div className="container py-6">
      <Header
        title="Products"
        description="Breif overview of product features and benefits"
        count={6}
      >
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <IconUpload /> Export
          </Button>
          <Button asChild>
            <Link href={`/${company}/products/create`}>
              <IconPlus /> Add Product
            </Link>
          </Button>
        </div>
      </Header>
    </div>
  );
}
