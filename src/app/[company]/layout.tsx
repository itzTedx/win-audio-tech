import { cookies } from "next/headers";

import { Navbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/auth/lib/current-user";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const collapsibleState = cookieStore.get("sidebar_collapsible")?.value
    ? JSON.parse(cookieStore.get("sidebar_collapsible")!.value)
    : {};

  const user = await getCurrentUser();
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} collapsibleState={collapsibleState} />
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
