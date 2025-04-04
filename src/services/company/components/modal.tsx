"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

import { ResponsiveModal } from "@/components/responsive-modal";

import { CompanyForm } from "./form";

export default function CompanyModal() {
  const [companyModal, setCompanyModal] = useQueryState(
    "companyModal",
    parseAsBoolean.withDefault(false)
  );

  const [userId, setUserId] = useQueryState("user");

  if (!userId) return null;

  return (
    <ResponsiveModal
      open={Boolean(companyModal)}
      onOpenChange={(isOpen) => {
        setCompanyModal(isOpen);
        if (!isOpen) setUserId(null);
      }}
      title="Add New Company"
      className="max-w-xl"
      asChild
    >
      <CompanyForm userId={userId} />
    </ResponsiveModal>
  );
}
