"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { UserType } from "@/types";

import { getUserById } from "@/lib/action.api";
import { formatDateStr, getSummaryName } from "@/lib/helper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const FriendProfileSlidebar = () => {
  const params = useParams();

  const [friend, setFriend] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetFriendProfile = async () => {
    const friendId = params?.id[0];

    if (friendId !== undefined) {
      setLoading(true);
      const res = await getUserById(friendId);
      if (res?.message === "Find user sucessfully") setFriend(res?.user);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFriendProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[100%] bg-primary-white dark:bg-zinc-800">
      <div className="w-[100%] h-[150px] bg-secondary-white dark:bg-zinc-700"></div>
      {loading ? (
        <div className="flex items-center space-x-4 p-4 mt-10">
          <Skeleton className="h-12 w-12 rounded-full bg-zinc-400 dark:bg-zinc-600" />
          <div className="space-y-2 w-[70%]">
            <Skeleton className="h-4 w-[80%] bg-zinc-400 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-[70%] bg-zinc-400 dark:bg-zinc-600" />
          </div>
        </div>
      ) : (
        <div className="relative">
          <div
            className="absolute top-[-100px] left-[15px] w-[85px] h-[85px] flex justify-center items-center rounded-full
                        bg-zinc-400 dark:bg-primary-black"
          >
            <Avatar className="w-[85%] h-[85%]">
              <AvatarImage
                src={`${friend?.avatar ? friend?.avatar : ""}`}
                alt="avatar"
              />
              <AvatarFallback className="text-[30px]">
                {friend?.name && getSummaryName(friend?.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mx-auto mt-[60px] p-4 w-[90%] flex flex-col gap-3 rounded-md text-white bg-zinc-500 dark:bg-black">
            <div className="flex flex-col">
              <p className="text-[15px] font-bold">{friend?.name}</p>
              <p className="text-[12px] text-zinc-200 dark:text-zinc-400 truncate">
                {friend?.email}
              </p>
            </div>
            <div className="mx-auto w-[100%] h-[1px] bg-white dark:bg-secondary-gray"></div>
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-bold">DISCORD MEMER SINCE</p>
              <p className="text-[12px] text-zinc-200 dark:text-zinc-400 truncate">
                {friend?.created?.toString() &&
                  formatDateStr(friend?.created?.toString())}
              </p>
            </div>
            <div className="mx-auto w-[100%] h-[1px] bg-white dark:bg-secondary-gray"></div>
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-bold">NOTE</p>
              <p className="text-[12px] text-zinc-200 dark:text-zinc-400 truncate">
                Click to add a note
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendProfileSlidebar;
