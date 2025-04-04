import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@/services/auth/lib/current-user";
import { getCompanies } from "@/services/company/action";

import { NavMain } from "./nav-main";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
  collapsibleState?: Record<string, boolean>;
}

export async function AppSidebar({
  user,
  collapsibleState,
  ...props
}: AppSidebarProps) {
  const { companies } = await getCompanies();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher data={companies!} userId={user?.id} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain collapsibleState={collapsibleState} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
