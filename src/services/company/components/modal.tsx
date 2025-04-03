import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CompanyForm } from "./form";

export default function CompanyModal() {
  return (
    <Dialog>
      <DialogTrigger className="bg hover:bg-sidebar-accent flex w-full cursor-pointer gap-1.5 rounded-md p-2">
        <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
          <Plus className="size-4" />
        </div>
        Add Company
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription className="sr-only">
            Add New Company
          </DialogDescription>
        </DialogHeader>
        <CompanyForm />
      </DialogContent>
    </Dialog>
  );
}
