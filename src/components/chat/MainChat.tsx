"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { DirectMessageChatType, UserType } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

import { IoSend } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";

import { getUserById } from "@/lib/action.api";
import { getSummaryName } from "@/lib/helper";

import { DirectMessageChatData } from "@/lib/utils";

const MainChat = () => {
  const params = useParams();
  const { data: session }: any = useSession();

  const [friend, setFriend] = useState<UserType | null>(null);
  const [messages, setMesages] = useState<DirectMessageChatType[]>(
    DirectMessageChatData
  );
  const [formData, setFormData] = useState<any>({
    message: "",
  });
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [isOverFlow, setIsOverFlow] = useState<boolean>(false);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleGetFriendProfile = async () => {
    const friendId = params?.id[0];

    if (friendId !== undefined) {
      const res = await getUserById(friendId);
      if (res?.message === "Find user sucessfully") setFriend(res?.user);
    }
  };

  useEffect(() => {
    handleGetFriendProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (
      chatBoxRef?.current?.clientHeight &&
      chatBoxRef?.current?.clientHeight > screenHeight - 210
    )
      setIsOverFlow(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatBoxRef?.current?.clientHeight]);

  // components/MessageList.tsx
  useEffect(() => {
    if (messages !== undefined) {
      if (messages?.length) {
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
  }, [messages?.length]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newChat: DirectMessageChatType = {
      user: session?.user,
      text: formData.message,
    };

    setMesages([...messages, newChat]);

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
        <div></div>
      </div>
      <div
        className={`w-[100%] max-h-[calc(100vh-156px)] h-[calc(100vh-156px)] overflow-y-auto flex px-6 py-4 ${
          !isOverFlow && "items-end"
        }`}
      >
        <div ref={chatBoxRef} className="w-[100%] flex flex-col gap-8">
          {messages?.map((message, index) => {
            return (
              <div
                key={index}
                className="group relative w-[100%] flex items-center justify-between rounded-md py-2
                            hover:bg-secondary-white dark:hover:bg-primary-gray"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage
                      src={`${message?.user?.avatar}`}
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {friend?.name && getSummaryName(friend?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-[13px]">
                    <p className="font-bold">{message?.user?.name}</p>
                    <p>{message.text}</p>
                  </div>
                </div>
                <div></div>
                <div ref={mainRef} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute w-[100%] h-[100px] bottom-0 px-6 py-4">
        <form className="relative" onSubmit={handleSendMessage}>
          <Input
            className="h-[50px] pr-[100px]"
            type="text"
            placeholder={`Message @${friend?.name}`}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
            }}
          />
          <div className="absolute top-[15px] right-[20px] flex items-center gap-3">
            <button
              type="submit"
              className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer"
            >
              <IoSend size={20} />
            </button>
            <div className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer">
              <FaFile size={20} />
            </div>
            <div className="text-primary-purple hover:text-secondary-purple hover:cursor-pointer">
              <MdEmojiEmotions size={25} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainChat;
