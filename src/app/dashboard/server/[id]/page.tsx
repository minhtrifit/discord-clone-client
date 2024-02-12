"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useServerStore } from "@/lib/store";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getDetailServerById } from "@/lib/action.api";
import { getSummaryName } from "@/lib/helper";

const DetailServerPage = () => {
  const { data: session }: any = useSession();

  const params = useParams();

  const server = useServerStore((state) => {
    return state.server;
  });

  const setServer = useServerStore((state) => {
    return state.setServer;
  });

  const setLoading = useServerStore((state) => {
    return state.setLoading;
  });

  const handleGetDetailServer = async () => {
    if (params?.id && typeof params?.id === "string" && session?.user?.id) {
      setLoading(true);
      const res = await getDetailServerById(params?.id, session?.user?.id);

      if (
        res?.message === "Get detail server successfully" &&
        res?.server !== null
      ) {
        setServer(res?.server);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetailServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="w-[100%] p-4 flex flex-col items-center">
      <div className="mt-[100px] flex flex-col items-center gap-5">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage src={`${server?.avatar}`} alt="avatar" />
          <AvatarFallback className="text-[30px]">
            {server?.name && getSummaryName(server?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[30px] font-bold">Welcome to</p>
          <p className="text-[30px] font-bold">{server?.name}</p>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
            This is the beginning of this server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailServerPage;
