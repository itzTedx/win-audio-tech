import { getCompanyBySlug } from "@/services/company/action";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const { company: data } = await getCompanyBySlug(company);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <p>Company: {data?.name}</p>
    </div>
  );
}
