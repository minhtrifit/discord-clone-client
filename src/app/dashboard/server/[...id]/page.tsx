"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useServerStore } from "@/lib/store";

import { getDetailServerById } from "@/lib/action.api";

import ServerMemberSlidebar from "@/components/server/ServerMemberSlidebar";

const DetailServerPage = () => {
  const { data: session }: any = useSession();

  const params = useParams();
  const { id } = params;

  const setServer = useServerStore((state) => {
    return state.setServer;
  });

  const setLoading = useServerStore((state) => {
    return state.setLoading;
  });

  const handleGetDetailServer = async () => {
    if (params?.id[0] && session?.user?.id) {
      setLoading(true);
      const res = await getDetailServerById(params?.id[0], session?.user?.id);

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
    <div className="w-[calc(100vw-320px)] flex overflow-y-auto">
      <div className="w-[100%]">
        <p>ServerMainChat</p>
      </div>
      <div
        className={`hidden h-screen border-2 border-l-primary-white dark:border-l-primary-gray min-[900px]:flex w-[300px]`}
      >
        <ServerMemberSlidebar />
      </div>
    </div>
  );
};

export default DetailServerPage;
