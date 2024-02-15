"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useServerStore, useSocketStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

import {
  ChannelMessageChatType,
  DirectMessageChatType,
  UserType,
} from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import ServerChatInput from "./ServerChatInput";
import TextChat from "../chat/TextChat";
import ImageChat from "../chat/ImageChat";
import FileChat from "../chat/FileChat";

import { IoMdNotifications } from "react-icons/io";

import {
  getAllChatsByChannelId,
  getChannelById,
  getDetailServerById,
  getUserById,
} from "@/lib/action.api";
import { formatDateStr, getSummaryName } from "@/lib/helper";
import { handleFileExtUpload, handleFileUpload } from "@/lib/supabase";
import { ApplicationFileType } from "@/lib/utils";

export interface FormDataState {
  message: string;
}

const ChannelMainChat = () => {
  const params = useParams();
  const pathName = usePathname();
  const { data: session }: any = useSession();

  const [formData, setFormData] = useState<FormDataState>({
    message: "",
  });
  const [screenHeight, setScreenHeight] = useState<any>(null);
  const [isOverFlow, setIsOverFlow] = useState<boolean>(false);
  const [noti, setNoti] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatsLoading, setChatsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const server = useServerStore((state) => {
    return state.server;
  });

  const setServer = useServerStore((state) => {
    return state.setServer;
  });

  const channel = useServerStore((state) => {
    return state.channel;
  });

  const setChannel = useServerStore((state) => {
    return state.setChannel;
  });

  const channelChats = useServerStore((state) => {
    return state.channelChats;
  });

  const setChannelChats = useServerStore((state) => {
    return state.setChannelChats;
  });

  const updateChannelChats = useServerStore((state) => {
    return state.updateChannelChats;
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
    const channelId = params?.["channel-id"];

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

  const handleGetAllChats = async () => {
    const channelId = params?.["channel-id"];

    if (
      session?.user?.id &&
      channelId !== undefined &&
      typeof channelId === "string"
    ) {
      setChatsLoading(true);
      const res = await getAllChatsByChannelId(session?.user?.id, channelId);
      if (res?.message === "Get all chats by channel id successfully") {
        updateChannelChats(res?.chats);
      }
      setChatsLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetailServer();
    handleGetChannelProfile();
    handleGetAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // Check screen height
  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    if (typeof window !== "undefined") {
      setScreenHeight(window.innerHeight);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Check chat box overflow
  useEffect(() => {
    if (
      chatBoxRef?.current?.clientHeight &&
      chatBoxRef?.current?.clientHeight > screenHeight - 210
    )
      setIsOverFlow(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatBoxRef?.current?.clientHeight]);

  // Chat auto scroll effect
  useEffect(() => {
    if (channelChats !== undefined) {
      if (channelChats?.length) {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        mainRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelChats?.length]);

  useEffect(() => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelChats]);

  useEffect(() => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [loading]);

  useEffect(() => {
    if (
      chatBoxRef?.current?.clientHeight &&
      chatBoxRef?.current?.clientHeight < screenHeight - 210
    )
      setIsOverFlow(false);
  }, [channelChats, screenHeight, params]);

  useEffect(() => {
    setIsOverFlow(false);
  }, []);

  // Receive direct message
  useEffect(() => {
    if (socket) {
      socket.on(
        "receive_channel_message",
        (rs: {
          message: string;
          user: UserType;
          chats: ChannelMessageChatType;
        }) => {
          // console.log("Receive channel message request:", rs);

          const serverId = params?.["id"];
          const channelId = params?.["channel-id"];
          // const serverId = server?.id;
          // const channelId = channel?.id;

          if (
            rs?.message === "You have new channel message" &&
            rs?.chats &&
            rs?.user &&
            serverId &&
            channelId
          ) {
            socket.emit(
              "get_all_channel_chats",
              {
                userId: session?.user?.id,
                serverId: serverId,
                channelId: channelId,
              },
              (res: { message: string; chats: ChannelMessageChatType[] }) => {
                // console.log("Check get all channel chats:", res);
                if (res?.chats) updateChannelChats(res?.chats);
              }
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverId = params?.id;
    const channelId = params?.["channel-id"];

    if (formData?.message === "") {
      toast.error("Message can not be empty");
      return;
    }

    if (
      socket &&
      session?.user?.id &&
      serverId !== "" &&
      channelId !== "" &&
      formData?.message !== ""
    ) {
      socket.emit(
        "send_channel_message",
        {
          userId: session?.user?.id,
          serverId: serverId,
          channelId: channelId,
          provider: "text",
          text: formData.message,
        },
        (res: {
          message: string;
          user: UserType;
          chat: ChannelMessageChatType;
        }) => {
          if (res?.message === "Send channel message successfully") {
            const newChat = { ...res?.chat, user: res?.user };
            setChannelChats(newChat);
          }
        }
      );

      setFormData({
        message: "",
      });
    }
  };

  const handleDeleteChatById = (chatId: string) => {
    const serverId = params?.id;
    const channelId = params?.["channel-id"];

    if (
      confirm("Do you want to delete this chat?") == true &&
      socket &&
      session?.user
    ) {
      socket.emit(
        "delete_channel_chat_by_id",
        {
          chatId: chatId,
          userId: session?.user?.id,
          serverId: serverId,
          channelId: channelId,
        },
        (res: { message: string; status: boolean }) => {
          // console.log("Check delete chat by id:", res);
          if (res?.status === true) {
            toast.success(res?.message);
            socket.emit(
              "get_all_channel_chats",
              {
                userId: session?.user?.id,
                serverId: serverId,
                channelId: channelId,
              },
              (res: {
                message: string;
                user: UserType;
                chats: DirectMessageChatType[];
              }) => {
                if (res?.chats) {
                  console.log("GET ALL CHAT AFTER DELETE", res?.chats);
                }
              }
            );
          } else toast.error(res?.message);
        }
      );
    }
  };

  // Direct file message selection
  const handleResetImage = () => {
    setFile(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0]?.name);
    }
  };

  const handleSendFileMessage = async () => {
    // Update file (image, document)
    const type = file?.type?.split("/")[0];
    const ext = file?.name?.split(".")[1];
    const fileDbName = file?.name;
    // const format = file?.type?.split("/")[1];
    const serverId = params?.id;
    const channelId = params?.["channel-id"];

    if (file === null) toast.error("Please upload file to send message");
    else if (fileName !== "" && type === "image") {
      setLoading(true);
      let image = null;
      const res = await handleFileUpload("uploads", "images", file);
      const { fullPath }: any = res;
      if (res === null) {
        toast.error("Upload image failed");
        return;
      }
      // Create image url
      image = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
      // Create new image chat
      if (socket && session?.user?.id && serverId !== "" && channelId !== "") {
        socket.emit(
          "send_channel_message",
          {
            userId: session?.user?.id,
            serverId: serverId,
            channelId: channelId,
            provider: "image",
            url: image,
          },
          (res: {
            message: string;
            user: UserType;
            chat: ChannelMessageChatType;
          }) => {
            // console.log("Check send channel message:", res);
            if (res?.message === "Send channel message successfully") {
              const newChat = { ...res?.chat, user: res?.user };
              setChannelChats(newChat);
            }
          }
        );
      }
    } else if (
      fileName !== "" &&
      fileDbName !== "" &&
      ext &&
      ApplicationFileType.includes(ext)
    ) {
      setLoading(true);
      let fileUrl = null;
      const res = await handleFileExtUpload("uploads", "files", file, ext);
      const { fullPath }: any = res;
      if (res === null) {
        toast.error("Upload file failed");
        return;
      }
      // Create file url
      fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
      // Create new image chat
      if (socket && session?.user?.id && serverId !== "" && channelId !== "") {
        socket.emit(
          "send_channel_message",
          {
            userId: session?.user?.id,
            serverId: serverId,
            channelId: channelId,
            provider: "file",
            url: fileUrl,
            fileName: fileDbName,
          },
          (res: {
            message: string;
            user: UserType;
            friend: UserType;
            chat: DirectMessageChatType;
          }) => {
            // console.log("Check send direct message:", res);
            if (res?.message === "Send channel message successfully") {
              const newChat = { ...res?.chat, user: res?.user };
              setChannelChats(newChat);
            }
          }
        );
      }
    } else toast.error("File format not correct");

    setLoading(false);
    handleResetImage();
  };

  const handleUserKeyPress = useCallback(
    (event: any) => {
      const { key, keyCode } = event;
      if (file && fileInputRef?.current) {
        fileInputRef?.current.blur();
        if (key === "Enter") {
          handleSendFileMessage();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const handleDownloadFile = async (
    bucket: string,
    folderName: string,
    chat: DirectMessageChatType
  ) => {
    const fileName = chat?.url?.split(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${folderName}`
    )[1];

    if (chat?.url && fileName) {
      saveAs(chat?.url, fileName);
    }
  };

  return (
    <div className="relative w-[100%] h-screen flex flex-col">
      <div
        className="w-[100%] h-[51px] px-6 border border-l-0 border-r-0 border-t-0 border-b-primary-black
                        flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <p className="text-[25px] font-bold dark:text-gray-400">#</p>
          <p className="text-[13px] font-bold dark:text-gray-400">
            {channel?.name}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <IoMdNotifications size={25} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notification Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        ref={containerRef}
        className={`w-[100%] max-h-[calc(100vh-156px)] h-[calc(100vh-156px)] overflow-y-auto flex px-6 py-4 ${
          !isOverFlow && "items-end"
        }`}
      >
        <div ref={chatBoxRef} className="w-[100%] flex flex-col gap-8">
          {/* {channel !== null && (
            <div className="flex flex-col gap-3">
              <Avatar className="w-[70px] h-[70px]">
                <AvatarImage src={`${channel?.avatar}`} alt="avatar" />
                <AvatarFallback className="text-[30px]">
                  {channel?.name && getSummaryName(channel?.name)}
                </AvatarFallback>
              </Avatar>
              <p className="font-bold text-xl">{friend?.name}</p>
              <p className="font-semibold text-sm">{friend?.email}</p>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
                This is the beginning of your direct message history with{" "}
                {friend?.name}
              </p>
              <div className="relative w-[100%] h-[1px] bg-primary-white dark:bg-zinc-400 my-5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[13px] text-zinc-500 dark:text-zinc-400 bg-white dark:bg-secondary-gray p-1">
                    {chats?.length !== 0 &&
                      chats[0]?.sended !== undefined &&
                      formatDateStr(chats[0]?.sended)}
                    {chats?.length === 0 &&
                      formatDateStr(new Date().toString())}
                  </div>
                </div>
              </div>
            </div>
          )} */}
          {channelChats?.map((chat: ChannelMessageChatType) => {
            if (chatsLoading) {
              return (
                <div key={uuidv4()} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-zinc-300" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-zinc-300" />
                    <Skeleton className="h-4 w-[200px] bg-zinc-300" />
                  </div>
                </div>
              );
            }

            if (!chatsLoading && chat?.user === null) {
              return (
                <div key={uuidv4()}>
                  <p>Chat is not available</p>
                </div>
              );
            }

            if (chat?.user !== null && chat?.provider === "text") {
              return (
                <TextChat
                  key={uuidv4()}
                  userIdSession={session?.user?.id}
                  user={chat?.user}
                  chat={chat}
                  friend={chat?.user}
                  mainRef={mainRef}
                  handleDeleteChatById={handleDeleteChatById}
                />
              );
            }

            if (chat?.user !== null && chat?.provider === "image") {
              return (
                <ImageChat
                  key={uuidv4()}
                  userIdSession={session?.user?.id}
                  user={chat?.user}
                  chat={chat}
                  friend={chat?.user}
                  mainRef={mainRef}
                  handleDeleteChatById={handleDeleteChatById}
                  handleDownloadFile={handleDownloadFile}
                />
              );
            }

            if (chat?.user !== null && chat?.provider === "file") {
              return (
                <FileChat
                  key={uuidv4()}
                  userIdSession={session?.user?.id}
                  user={chat?.user}
                  chat={chat}
                  friend={chat?.user}
                  mainRef={mainRef}
                  handleDeleteChatById={handleDeleteChatById}
                  handleDownloadFile={handleDownloadFile}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="absolute w-[100%] h-[100px] bottom-0 px-6 py-4">
        <ServerChatInput
          channelName={channel?.name ? channel?.name : "undefined"}
          handleSendMessage={handleSendMessage}
          formData={formData}
          setFormData={setFormData}
          file={file}
          fileName={fileName}
          fileInputRef={fileInputRef}
          handleResetImage={handleResetImage}
          handleFileSelection={handleFileSelection}
          handleSendFileMessage={handleSendFileMessage}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChannelMainChat;
