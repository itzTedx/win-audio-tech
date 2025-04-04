import { redirect } from "next/navigation";

import { getCompanies } from "@/services/company/action";

export default async function Home() {
  const { companies } = await getCompanies();
  console.log("companies", companies);

  if (!companies || companies.length < 0) redirect("/onboarding");

  if (companies) return redirect(`/${companies[0].slug}`);
}
