import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DirectMessageChatType, UserType } from "@/types";

import { MdEmojiEmotions } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import { getSummaryName, formatDateStr } from "@/lib/helper";

interface PropType {
  userIdSession: string;
  user: UserType;
  chat: DirectMessageChatType;
  mainRef: React.RefObject<HTMLDivElement>;
}

const TextChat = (props: PropType) => {
  const { userIdSession, user, chat, mainRef } = props;

  return (
    <div
      className="group relative w-[100%] flex items-center justify-between rounded-md py-2
              hover:bg-secondary-white dark:hover:bg-primary-gray"
    >
      <div className="flex items-center gap-3">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={`${user?.avatar}`} alt="avatar" />
          <AvatarFallback>
            {user?.name && getSummaryName(user?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-[13px]">
          <div className="flex items-center gap-3">
            <p className="font-bold">{`${user?.name} ${
              userIdSession === chat?.user?.id ? "(You)" : ""
            }`}</p>
            <p className="text-[12px] text-zinc-400">
              {chat?.sended ? formatDateStr(chat?.sended) : "undefined"}
            </p>
          </div>
          <p>{chat.text}</p>
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
              <button className="hover:text-red-500">
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
