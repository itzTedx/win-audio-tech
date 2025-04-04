"use server";

import { cookies } from "next/headers";

export async function updateSidebarState(isOpen: boolean) {
  const cookieStore = await cookies();
  cookieStore.set("sidebar_state", isOpen.toString(), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function updateCollapsibleState(
  itemTitle: string,
  isOpen: boolean
) {
  const cookieStore = await cookies();
  const currentState = cookieStore.get("sidebar_collapsible")?.value;
  const state = currentState ? JSON.parse(currentState) : {};

  state[itemTitle] = isOpen;

  cookieStore.set("sidebar_collapsible", JSON.stringify(state), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}
