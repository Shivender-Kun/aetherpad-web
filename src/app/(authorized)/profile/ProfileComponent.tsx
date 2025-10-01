"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hooks";
import { Mail, User2 } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const ProfileComponent = () => {
  const user = useAppSelector((state) => state.user.data);

  const EditProfile = dynamic(() => import("./_components/EditProfile"), {
    loading: () => <LoadingSpinner />,
  });

  const DeleteAccount = dynamic(() => import("./_components/DeleteAccount"), {
    loading: () => <LoadingSpinner />,
  });

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="relative h-64 overflow-hidden rounded-md">
        <Image
          priority
          src={
            user?.coverPicture ||
            "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="min-h-full min-w-full"
          alt="cover-image"
          width={720}
          height={120}
        />
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-slate-300/40 dark:bg-gray-800/60">
          {user && <EditProfile user={user} />}
        </div>

        <div className="absolute bottom-0 z-10 flex flex-col items-center gap-2 p-2">
          <Avatar className="h-32 w-32 border border-x-2 border-y-2 border-gray-100 max-sm:h-24 max-sm:w-24">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          </Avatar>
          <p className="w-fit rounded-sm bg-slate-300 px-2 py-0.5 underline dark:bg-gray-900/70">
            {user?.username}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-wrap justify-between gap-4 max-sm:text-sm">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 max-sm:flex-wrap">
            <Mail />
            <span>{user?.email}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 max-sm:h-fit max-sm:w-full max-sm:flex-row max-sm:flex-wrap max-sm:items-center max-sm:self-end">
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

          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
