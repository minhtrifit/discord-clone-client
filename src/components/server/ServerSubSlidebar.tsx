"use client";

import { useServerStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { RiCalendarEventLine } from "react-icons/ri";

import { Skeleton } from "@/components/ui/skeleton";
import UserProfile from "../UserProfile";
import ServerDropdownMenu from "./ServerDropdownMenu";
import ServerCategoryItem from "./ServerCategoryItem";

import { CategoriesData } from "@/lib/utils";
import { CategoryType } from "@/types";

const ServerSubSlidebar = () => {
  const { data: session }: any = useSession();

  const params = useParams();
  const serverId = params?.id;

  const server = useServerStore((state) => {
    return state.server;
  });

  const loading = useServerStore((state) => {
    return state.loading;
  });

  return (
    <div className="relative w-[240px] overflow-x-auto bg-secondary-white dark:bg-primary-gray dark:text-gray-400">
      <div className="px-6 py-3 flex items-center justify-between gap-3 border border-b-primary-black">
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
      <div className="text-[15px] p-2">
        <button
          className="w-[100%] flex items-center gap-3 rounded-md p-2 text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
        >
          <RiCalendarEventLine size={20} />
          <p>Events</p>
        </button>
      </div>
      <div className="w-[95%] h-[1px] mx-auto bg-zinc-600 dark:bg-zinc-500"></div>
      <div className="w-[100%] max-h-[calc(100vh-180px)] px-2 py-4 overflow-y-auto">
        <div className="w-[100%] flex flex-col gap-3">
          {CategoriesData?.map((category: CategoryType) => {
            if (category?.serverId === serverId)
              return (
                <ServerCategoryItem key={category?.id} category={category} />
              );
          })}
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default ServerSubSlidebar;
