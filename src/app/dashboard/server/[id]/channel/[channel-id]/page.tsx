"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useServerStore } from "@/lib/store";

import { getDetailServerById } from "@/lib/action.api";

import ChannelMainChat from "@/components/server/ChannelMainChat";

const DetailChannelPage = () => {
  const { data: session }: any = useSession();

  const params = useParams();
  // const channelId = params?.["channel-id"];

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
    <div className="w-[100%]">
      <ChannelMainChat />
    </div>
  );
};

export default DetailChannelPage;
