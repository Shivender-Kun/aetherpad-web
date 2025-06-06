"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Mail, User2 } from "lucide-react";
import { useStore } from "@/store";
import Image from "next/image";

const Profile = () => {
  const { user } = useStore();

  return (
    <main className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 justify-between px-4 h-9">
        <h2 className="text-xl">Profile</h2>
      </div>

      <div className="px-4 h-full flex flex-col gap-4">
        <div className="h-64 overflow-hidden relative rounded-md">
          <Image
            priority
            src={
              user?.coverPicture ||
              "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="min-w-full min-h-full"
            alt="cover-image"
            width={720}
            height={120}
          />
          {/* <div className="absolute z-10 top-0 left-0 w-full h-full bg-slate-300/40 dark:bg-gray-800/60">
            <div className="absolute bottom-4 right-4 p-2 bg-slate-300 dark:bg-gray-900/70 rounded-md ">
              <Edit />
            </div>
          </div> */}

          <div className="p-2 absolute z-10 bottom-0 flex flex-col gap-2 items-center">
            <Avatar className="w-32 h-32 border border-gray-100 border-x-2 border-y-2">
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>
                <User2 />
              </AvatarFallback>
            </Avatar>
            <p className="underline rounded-sm px-2 py-0.5 w-fit bg-slate-300 dark:bg-gray-900/70">
              {user?.username}
            </p>
          </div>
        </div>

        <div className="p-4 text-sm flex flex-wrap gap-4 justify-between items-center ">
          <div className="flex gap-4 items-center ">
            <Mail />
            <span>{user?.email}</span>
          </div>

          <div>
            Date Joined:{" "}
            <span className="text-gray-500">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
