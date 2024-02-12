"use client";

import { useServerStore } from "@/lib/store";
import { useSession } from "next-auth/react";

import { Skeleton } from "@/components/ui/skeleton";
import UserProfile from "../UserProfile";
import ServerDropdownMenu from "./ServerDropdownMenu";

const ServerSubSlidebar = () => {
  const { data: session }: any = useSession();

  const server = useServerStore((state) => {
    return state.server;
  });

  const loading = useServerStore((state) => {
    return state.loading;
  });

  return (
    <div className="relative w-[240px] overflow-x-auto bg-secondary-white dark:bg-primary-gray dark:text-gray-400">
      <div className="px-6 py-3 flex items-center justify-center gap-3 border border-b-primary-black">
        {!server?.name ? (
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-[150px] bg-zinc-400" />
            </div>
          </div>
        ) : (
          <p className="text-[15px] font-bold dark:text-white max-w-[240px] truncate">
            {server?.name}
          </p>
        )}
        <ServerDropdownMenu />
      </div>
      <UserProfile />
    </div>
  );
};

export default ServerSubSlidebar;
