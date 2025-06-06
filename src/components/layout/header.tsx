import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotebookPen, User2 } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { IUser } from "@/types";
import Link from "next/link";

const Header = ({ user }: { user: IUser }) => {
  return (
    <header className="border-y flex justify-between items-center p-4 gap-4">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex justify-center items-center gap-4">
        <NotebookPen />
        <h1 className="text-2xl font-bold text-center">Personal Notes</h1>
      </div>

      <div>
        <Link className="w-full" href="/profile">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
            <span className="max-sm:hidden">
              {user?.username?.toLocaleUpperCase()}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
