"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { truncateString } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { NotebookPen, User2 } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "../../../../components/ui/sidebar";

const Header = () => {
  const { data: user } = useAppSelector((state) => state.user);

  return (
    <header className="flex items-center justify-between gap-4 border-b-1 p-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Link href="/home">
          <div className="flex items-center justify-center gap-4">
            <NotebookPen />
            <h1 className="text-center text-2xl font-bold">AetherPad</h1>
          </div>
        </Link>
      </div>

      <div className="">
        <Link className="w-full" href="/profile">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
            <span className="max-sm:hidden">
              {user?.username && truncateString(user.username, 13)}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
