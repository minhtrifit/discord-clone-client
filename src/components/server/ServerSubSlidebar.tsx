"use client";

import { useServerStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import UserProfile from "../UserProfile";
import ServerDropdownMenu from "./ServerDropdownMenu";

const ServerSubSlidebar = () => {
  const { data: session }: any = useSession();

  const params = useParams();

  const server = useServerStore((state) => {
    return state.server;
  });

  const loading = useServerStore((state) => {
    return state.loading;
  });

  return (
    <div className="relative w-[240px] overflow-x-auto bg-secondary-white dark:bg-primary-gray dark:text-gray-400">
      <div className="px-6 py-3 flex items-center justify-center gap-3 border border-b-primary-black">
        <p className="text-[15px] font-bold dark:text-white max-w-[240px] truncate">
          {loading ? "Joining Server..." : server?.name}
        </p>
        <ServerDropdownMenu />
      </div>
      <UserProfile />
    </div>
  );
};

export default ServerSubSlidebar;
