"use client";

import { useSocketStore } from "@/lib/store";
import { ServerType, UserType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { v4 as uuidv4 } from "uuid";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getSummaryName } from "@/lib/helper";

const ServerMemberSlidebar = () => {
  const params = useParams();

  const { data: session }: any = useSession();

  const [members, setMembers] = useState<
    { role: string; members: UserType[] }[]
  >([]);

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  useEffect(() => {
    if (socket) {
      socket.emit(
        "get_server_members",
        {
          serverId: params?.id,
        },
        (res: {
          message: string;
          server: ServerType;
          members: { role: string; members: UserType[] }[];
        }) => {
          if (res?.message === "Get server members successfully") {
            setMembers(res?.members);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "server_member_online",
        (rs: { message: string; member: UserType; server: ServerType }) => {
          if (
            rs?.message === "Your server member just online" &&
            rs?.server?.id === params?.id &&
            rs?.member?.id !== session?.user?.id
          ) {
            // console.log("Get server member online:", rs);
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, members]);

  return (
    <div className="w-[100%] bg-primary-white dark:bg-zinc-800 px-4 py-6 flex flex-col gap-10">
      {members?.map((member) => {
        return (
          <div key={uuidv4()} className="flex flex-col gap-3">
            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-bold">
              {member?.role.toLocaleUpperCase()} - {member?.members?.length}
            </p>
            {member?.members?.map((user) => {
              return (
                <div key={uuidv4()} className="flex items-center gap-3">
                  <Avatar className="w-[35px] h-[35px]">
                    <AvatarImage src={`${user?.avatar}`} alt="avatar" />
                    <AvatarFallback>
                      {user?.name && getSummaryName(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-400">
                    {user?.name}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ServerMemberSlidebar;
