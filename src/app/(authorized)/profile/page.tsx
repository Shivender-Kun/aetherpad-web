"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, User2 } from "lucide-react";
import { useStore } from "@/store";
import Image from "next/image";

const Profile = () => {
  const { user } = useStore();

  return (
    <main className="flex flex-col justify-center gap-8">
      <h1 className="text-2xl font-bold">Profile</h1>
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
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-slate-300 dark:bg-gray-800 opacity-40 dark:opacity-60 ">
          <div className="absolute bottom-4 right-4 p-2 bg-slate-300 dark:bg-gray-800 opacity-60 dark:opacity-80">
            <Edit />
          </div>
        </div>
        <div className="p-2 absolute z-10 bottom-0">
          <Avatar className="w-32 h-32 border border-gray-100 border-x-2 border-y-2">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="px-2 flex flex-col gap-4">
        <p className="text-xl flex gap-4 items-center border-2 p-4 rounded-md max-w-fit">
          <span className=" text-gray-800 dark:text-gray-400 ">Username</span>:
          <span>{user?.username}</span>
        </p>

        <p className="text-xl flex gap-4 items-center border-2 p-4 rounded-md max-w-fit">
          <span className=" text-gray-800 dark:text-gray-400 ">Email</span>:
          <span>{user?.email}</span>
        </p>
      </div>
    </main>
  );
};

export default Profile;
