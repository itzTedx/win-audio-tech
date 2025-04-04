import ProfileAction from "@/components/layout/navbar/profile-actions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/services/auth/lib/current-user";

import { ModeToggle } from "../sidebar/mode-toggle";
import { Search } from "./search-actions";

export const Navbar = async () => {
  const user = await getCurrentUser({ withFullUser: true });
  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <nav className="flex h-[calc(4rem+1px)] w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
        <div className="space-x-2">
          <Search data={[]} />
          <ModeToggle />
          <ProfileAction user={user} />
        </div>
      </nav>
    </header>
  );
};
