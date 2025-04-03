"use client";

import * as React from "react";

import { ChevronsUpDown, Plus } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CompanyType } from "@/services/company/types";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

export function TeamSwitcher({ data }: { data: CompanyType[] }) {
  const [activeTeam, setActiveTeam] = React.useState(data[0]);
  const [_, setCompanyModal] = useQueryState(
    "companyModal",
    parseAsBoolean.withDefault(false)
  );

  if (!activeTeam) {
    return (
      <Button
        variant="outline"
        onClick={() => setCompanyModal(true)}
        type="button"
      >
        <Plus className="size-4" />
        Add Company
      </Button>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <AvatarImage src={activeTeam.logo!} />
                <AvatarFallback className="bg-sidebar-primary">
                  {activeTeam.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={"bottom"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Companies
            </DropdownMenuLabel>
            {data.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <Avatar className="text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg">
                  <AvatarImage src={team.logo!} />
                  <AvatarFallback className="bg-sidebar-primary">
                    {team.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Button
              variant="ghost"
              type="button"
              onClick={() => setCompanyModal(true)}
              className="w-full justify-start px-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              Add Company
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
