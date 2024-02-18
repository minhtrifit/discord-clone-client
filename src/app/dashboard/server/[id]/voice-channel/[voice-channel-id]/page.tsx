"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useServerStore } from "@/lib/store";

import { JitsiMeeting } from "@jitsi/react-sdk";

import { getChannelById, getDetailServerById } from "@/lib/action.api";

const ChannelVoicePage = () => {
  const { data: session }: any = useSession();

  const JITSI_MEET_DOMAIN = "meet.jit.si";

  const params = useParams();
  const channelId = params?.["voice-channel-id"];

  const [jitiRoomName, setJitsiRoomName] = useState<string>("room-name");

  const setServer = useServerStore((state) => {
    return state.setServer;
  });

  const setLoading = useServerStore((state) => {
    return state.setLoading;
  });

  const channel = useServerStore((state) => {
    return state.channel;
  });

  const setChannel = useServerStore((state) => {
    return state.setChannel;
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

  const handleGetChannelProfile = async () => {
    if (
      session?.user?.id &&
      channelId !== undefined &&
      typeof channelId === "string"
    ) {
      const res = await getChannelById(session?.user?.id, channelId);
      if (res?.message === "Get channel by id successfully") {
        setChannel(res?.channel);
      }
    }
  };

  useEffect(() => {
    handleGetDetailServer();
    handleGetChannelProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, channelId]);

  useEffect(() => {
    if (channel && channel?.name) setJitsiRoomName(channel?.name);
  }, [channel]);

  return (
    <div className="w-[100%]">
      {session?.user && jitiRoomName && (
        <JitsiMeeting
          domain={JITSI_MEET_DOMAIN}
          roomName={jitiRoomName}
          userInfo={{
            displayName: session?.user?.name
              ? session?.user?.name
              : "display-name",
            email: session?.user?.email ? session?.user?.email : "email",
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "100vh";
          }}
        />
      )}
    </div>
  );
};

export default ChannelVoicePage;
