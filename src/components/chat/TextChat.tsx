import { useFriendStore, useSocketStore } from "@/lib/store";
import { useSession } from "next-auth/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { toast } from "react-toastify";

import { DirectMessageChatType, UserType } from "@/types";

import { MdEmojiEmotions } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import { getSummaryName, formatDateStr } from "@/lib/helper";

interface PropType {
  userIdSession: string;
  user: UserType;
  chat: DirectMessageChatType;
  friend?: UserType;
  mainRef: React.RefObject<HTMLDivElement>;
  handleDeleteChatById: (chatId: string) => void;
}

const TextChat = (props: PropType) => {
  const { userIdSession, user, chat, friend, mainRef, handleDeleteChatById } =
    props;

  const { data: session }: any = useSession();

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const updateChats = useFriendStore((state) => {
    return state.updateChats;
  });

  return (
    <div
      className="group relative w-[100%] flex items-center justify-between rounded-md py-2
              hover:bg-secondary-white dark:hover:bg-primary-gray"
    >
      <div className="flex items-center gap-3">
        {/* <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={`${user?.avatar}`} alt="avatar" />
          <AvatarFallback>
            {user?.name && getSummaryName(user?.name)}
          </AvatarFallback>
        </Avatar> */}
        {user?.avatar && user?.avatar !== null && (
          <div>
            <Image
              className="rounded-full"
              src={user?.avatar}
              width={40}
              height={40}
              alt="avatar"
            />
          </div>
        )}
        {user?.avatar === null && (
          <Avatar className="w-[40px] h-[40px]">
            <AvatarFallback>
              {user?.name && getSummaryName(user?.name)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col gap-2 text-[13px]">
          <div className="flex items-center gap-3">
            <p className="font-bold">{`${user?.name} ${
              userIdSession === chat?.userId ? "(You)" : ""
            }`}</p>
            <p className="text-[12px] text-zinc-400">
              {chat?.sended ? formatDateStr(chat?.sended) : "undefined"}
            </p>
          </div>
          <p>{chat?.text}</p>
          {/* <div className="text-[13px] flex items-center gap-3">Emoji</div> */}
        </div>
      </div>
      <div
        className="hidden absolute top-[-15px] right-[15px] group-hover:flex items-center gap-3 px-2 py-1 rounded-md
                text-gray-700 dark:text-white border border-zin-600 dark:border-primary-gray
                bg-zinc-200 dark:bg-zinc-700"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="hover:text-primary-purple">
                <MdEmojiEmotions size={25} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add reaction</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="hover:text-red-500"
                onClick={() => {
                  if (chat?.id) handleDeleteChatById(chat?.id);
                  else toast.error("Something wrong");
                }}
              >
                <FaRegTrashAlt size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div ref={mainRef} />
    </div>
  );
};

export default TextChat;
