import { Frame, Map, PieChart } from "lucide-react";

import { NavUser } from "@/components/layout/navbar/nav-user";
import { TeamSwitcher } from "@/components/layout/navbar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/auth/lib/current-user";
import { getCompanies } from "@/services/company/action";

import { NavMain } from "./nav-main";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { companies } = await getCompanies();
  const user = await getCurrentUser({ withFullUser: true });
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher data={companies!} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
