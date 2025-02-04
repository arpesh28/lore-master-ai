"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { characters } from "@/lib/characters";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop(); // Assuming the slug is the last part of the path

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>Lore Characters</SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {characters.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton className="h-14" asChild>
                    <a href={`/chat/${item.slug}`} className={`bg-[#2a2a2a]`}>
                      <div className="w-10 h-10 rounded-full overflow-hidden ">
                        <Image
                          src={item.background_image}
                          alt={item.name}
                          width={40}
                          height={40}
                          objectFit="cover"
                        />
                      </div>
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
