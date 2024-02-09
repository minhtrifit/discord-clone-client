"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFriendStore, useSocketStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

import { DirectMessageChatType, UserType } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TextChat from "./TextChat";
import ChatInput from "./ChatInput";

import { PiPhoneCallFill } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";

import { getAllChatsByUserId, getUserById } from "@/lib/action.api";
import { formatDateStr, getSummaryName } from "@/lib/helper";

// import { DirectMessageChatData } from "@/lib/utils";

export interface FormDataState {
  message: string;
}

const MainChat = () => {
  const params = useParams();
  const { data: session }: any = useSession();

  const [friend, setFriend] = useState<UserType | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    message: "",
  });
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isOverFlow, setIsOverFlow] = useState<boolean>(false);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const chats = useFriendStore((state) => {
    return state.chats;
  });

  const setChats = useFriendStore((state) => {
    return state.setChats;
  });

  const updateChats = useFriendStore((state) => {
    return state.updateChats;
  });

  const userProfileToggle = useFriendStore((state) => {
    return state.userProfileToggle;
  });

  const setUserProfileToggle = useFriendStore((state) => {
    return state.setUserProfileToggle;
  });

  const handleGetFriendProfile = async () => {
    const friendId = params?.id[0];

    if (friendId !== undefined) {
      const res = await getUserById(friendId);
      if (res?.message === "Find user sucessfully") setFriend(res?.user);
    }
  };

  const handleGetAllChats = async () => {
    const friendId = params?.id[0];

    if (session?.user?.id && friendId !== undefined) {
      const res = await getAllChatsByUserId(session?.user?.id, friendId);

      if (res?.message === "Get all direct messages successfully") {
        updateChats(res?.chats);
      }
    }
  };

  useEffect(() => {
    handleGetFriendProfile();
    handleGetAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (chats !== undefined) {
      if (chats?.length) {
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
  }, [chats?.length]);

  // Receive direct message
  useEffect(() => {
    if (socket) {
      socket.on(
        "receive_direct_message",
        (rs: {
          message: string;
          user: UserType;
          friend: UserType;
          chat: DirectMessageChatType;
        }) => {
          // console.log("Receive direct message request:", rs);
          if (
            rs?.message === "You have new direct message" &&
            rs?.chat &&
            rs?.user
          ) {
            socket.emit(
              "get_all_chats",
              {
                userId: session?.user?.id,
                friendId: friend?.id,
              },
              (res: {
                message: string;
                user: UserType;
                friend: UserType;
                chats: DirectMessageChatType[];
              }) => {
                // console.log("Check get all chats:", res);
                if (res?.chats) {
                  // console.log(res?.chats);
                  updateChats(res?.chats);
                }
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

    if (formData?.message === "") {
      toast.error("Message can not be empty");
      return;
    }

    if (!friend) {
      toast.error("Friend not found");
      return;
    }

    if (socket && session?.user?.id && formData?.message !== "") {
      socket.emit(
        "send_direct_message",
        {
          userId: session?.user?.id,
          friendId: friend?.id,
          provider: "text",
          text: formData.message,
        },
        (res: {
          message: string;
          user: UserType;
          friend: UserType;
          chat: DirectMessageChatType;
        }) => {
          // console.log("Check send direct message:", res);
          if (res?.chat) {
            // console.log("SEND CHAT", res?.chat);
            setChats(res?.chat);
          }
        }
      );
    }

    setFormData({
      message: "",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[100%] h-screen flex flex-col"
    >
      <div
        className="w-[100%] h-[56px] px-6 border border-l-0 border-r-0 border-t-0 border-b-primary-black
                        flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Avatar className="w-[35px] h-[35px]">
            <AvatarImage src={`${friend?.avatar}`} alt="avatar" />
            <AvatarFallback>
              {friend?.name && getSummaryName(friend?.name)}
            </AvatarFallback>
          </Avatar>
          <p className="text-[13px] font-bold dark:text-gray-400">
            {friend?.name}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <PiPhoneCallFill size={25} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={setUserProfileToggle}>
                  <FaCircleUser size={25} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{userProfileToggle ? "Hide" : "Show"} user profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div
        className={`w-[100%] max-h-[calc(100vh-156px)] h-[calc(100vh-156px)] overflow-y-auto flex px-6 py-4 ${
          !isOverFlow && "items-end"
        }`}
      >
        <div ref={chatBoxRef} className="w-[100%] flex flex-col gap-8">
          {friend !== null && (
            <div className="flex flex-col gap-3">
              <Avatar className="w-[70px] h-[70px]">
                <AvatarImage src={`${friend?.avatar}`} alt="avatar" />
                <AvatarFallback>
                  {friend?.name && getSummaryName(friend?.name)}
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
          )}
          {chats?.map((chat: DirectMessageChatType) => {
            if (friend === null) {
              return (
                <div key={uuidv4()}>
                  <p>Chat is not available</p>
                </div>
              );
            }

            if (friend !== null && chat?.provider === "text") {
              return (
                <TextChat
                  key={uuidv4()}
                  userIdSession={session?.user?.id}
                  chat={chat}
                  user={
                    chat?.userId === session?.user?.id ? session?.user : friend
                  }
                  mainRef={mainRef}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="absolute w-[100%] h-[100px] bottom-0 px-6 py-4">
        <ChatInput
          friendName={friend?.name ? friend?.name : "undefined"}
          handleSendMessage={handleSendMessage}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default MainChat;
