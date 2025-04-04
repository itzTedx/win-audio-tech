"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { IconPackage } from "@tabler/icons-react";
import { ChevronRight, LayoutDashboard, SquareTerminal } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({}) {
  const params = useParams<{ company: string }>();

  const items = [
    {
      title: "Bill",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Invoice",
          url: "/invoice",
        },
        {
          title: "Quotation",
          url: "/quotation",
        },
        {
          title: "Report",
          url: "/report",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: IconPackage,
      items: [
        {
          title: "Products",
          url: `/${params.company}/products`,
        },
        {
          title: "Categories",
          url: `/${params.company}/products/categories`,
        },
      ],
    },
  ];
  return (
    <SidebarGroup>
      <Link href={`/${params.company}/`}>
        <SidebarMenuButton tooltip="Dashboard">
          <LayoutDashboard />
          <span>Dashboard</span>
        </SidebarMenuButton>
      </Link>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
