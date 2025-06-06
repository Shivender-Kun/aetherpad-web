"use client";

import {
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
  SidebarFooter,
  SidebarGroupLabel,
} from "../ui/sidebar";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LogOut, LucideProps, User2 } from "lucide-react";
import logoutUser from "@/lib/api/users/logout";
import { usePathname } from "next/navigation";
import { USER_ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import { IUser } from "@/types";
import Link from "next/link";
import { InlineThemeModeToggle } from "../Theme/theme-mode-toggle";

const AppSidebar = ({ user }: { user?: IUser }) => {
  const pathname = usePathname();

  const renderMenuOption = (option: {
    name: string;
    path: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }) => {
    const MenuIcon = option.icon;
    const isActive = pathname === option.path;

    return (
      <SidebarMenuItem key={option.name}>
        <SidebarMenuButton asChild>
          <Link
            href={option.path}
            className={cn(
              "px-4 py-2 rounded-md hover:bg-muted transition",
              isActive && "bg-muted text-primary font-semibold"
            )}
          >
            <MenuIcon /> {option.name}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const renderAllRoutes = USER_ROUTES.map(renderMenuOption);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-end">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Personal Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderAllRoutes}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link className="w-full" href="/profile">
                  <SidebarMenuButton>
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    Profile
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InlineThemeModeToggle />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logoutUser}>
                  <LogOut /> Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
