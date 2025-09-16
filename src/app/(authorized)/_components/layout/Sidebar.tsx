"use client";

import { InlineThemeModeToggle } from "@/components/Theme/theme-mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { USER_ROUTES } from "@/constants/routes";
import { UserRouteType } from "@/lib/types/routes";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import {
  BookOpen,
  EllipsisVertical,
  GlobeLock,
  Heart,
  LogOut,
  NotebookPen,
  ReceiptText,
  Scale,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ConfirmLogoutDialog from "../dialog/ConfirmLogoutDialog";

const AppSidebar = () => {
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);
  const { data: user } = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  const renderMenuOption = (option: UserRouteType) => {
    const MenuIcon = option.icon;
    const isActive = pathname === option.path;

    return (
      <SidebarMenuItem key={option.name}>
        <SidebarMenuButton asChild>
          <Link
            href={option.path}
            className={cn(
              "hover:bg-muted rounded-md transition",
              isActive && "bg-muted text-primary font-semibold",
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
    <>
      <Sidebar collapsible="offcanvas" variant="inset">
        {/* <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex h-16 w-full items-center border-b p-4"
              >
                <Link href="/">
                  <NotebookPen />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader> */}

        <SidebarContent>
          {/* AetherPad */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <NotebookPen /> &nbsp; AetherPad
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderAllRoutes}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Legal */}
          <SidebarGroup>
            <SidebarGroupLabel>
              <Scale /> &nbsp; Legal
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/about"
                      className="flex w-full items-center gap-2"
                    >
                      <BookOpen />
                      About Us
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/privacy"
                      className="flex w-full items-center gap-2"
                    >
                      <GlobeLock /> Privacy Policy
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/terms"
                      className="flex w-full items-center gap-2"
                    >
                      <ReceiptText />
                      Terms of Use
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.profilePicture}
                        alt={user?.username}
                      />
                      <AvatarFallback className="rounded-lg">
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.username}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                      </span>
                    </div>
                    <EllipsisVertical className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.profilePicture}
                          alt={user?.username}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user?.username}
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                    {/* Settings */}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link className="w-full" href="/profile">
                        <User2 />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <InlineThemeModeToggle />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setConfirmLogoutDialog(true)}
                  >
                    <LogOut /> Log out
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="https://www.shivender.pro" target="_blank">
                      <Heart className="" fill="red" color="red" />
                      Made by Shiv
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <ConfirmLogoutDialog
        open={confirmLogoutDialog}
        onOpenChange={setConfirmLogoutDialog}
      />
    </>
  );
};

export default AppSidebar;
