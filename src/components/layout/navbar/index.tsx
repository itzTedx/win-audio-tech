import ProfileAction from "@/components/layout/navbar/profile-actions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/auth/lib/current-user";

import { ModeToggle } from "../sidebar/mode-toggle";

export const Navbar = async () => {
  const user = await getCurrentUser({ withFullUser: true });
  return (
    <nav className="bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between border-b p-5 backdrop-blur-lg">
      <SidebarTrigger />
      <div className="space-x-2">
        <ModeToggle />
        <ProfileAction user={user} />
      </div>
    </nav>
  );
};
