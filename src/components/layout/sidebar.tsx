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
import {
  BookOpen,
  GlobeLock,
  Heart,
  LogOut,
  LucideProps,
  ReceiptText,
  User2,
} from "lucide-react";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { InlineThemeModeToggle } from "../Theme/theme-mode-toggle";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import ConfirmLogoutDialog from "../dialog/confirmLogout";
import { usePathname } from "next/navigation";
import { USER_ROUTES } from "@/constants";
import { useStore } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = () => {
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);
  const pathname = usePathname();
  const { user } = useStore();

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
          <SidebarGroupLabel>AetherPad</SidebarGroupLabel>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Legal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/about" className="w-full flex items-center gap-2">
                  <SidebarMenuButton>
                    <BookOpen />
                    About Us
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/privacy"
                  className="w-full flex items-center gap-2"
                >
                  <SidebarMenuButton>
                    <GlobeLock /> Privacy Policy
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/terms" className="w-full flex items-center gap-2">
                  <SidebarMenuButton>
                    <ReceiptText />
                    Terms of Use
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setConfirmLogoutDialog(true)}>
              <LogOut /> Logout
            </SidebarMenuButton>
            <ConfirmLogoutDialog
              open={confirmLogoutDialog}
              onOpenChange={setConfirmLogoutDialog}
            />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="mailto:shivenderkumar761@gmail.com" target="_blank">
              <SidebarMenuButton className="underline">
                <Heart className="mr-2" fill="red" color="red" />
                Made by Shiv
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
