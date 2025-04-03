"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CompanyForm } from "./form";

export default function CompanyModal() {
  const [companyModal, setCompanyModal] = useQueryState(
    "companyModal",
    parseAsBoolean.withDefault(false)
  );

  return (
    <ResponsiveModal
      open={Boolean(companyModal)}
      onOpenChange={setCompanyModal}
      title="Add New Company"
      className="max-w-xl"
      asChild
    >
      <CompanyForm />
    </ResponsiveModal>
  );
}
