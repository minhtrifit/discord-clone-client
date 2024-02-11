import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";

import { MdEmojiEmotions } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

import { DirectMessageChatType, UserType } from "@/types";

import { formatDateStr, getSummaryName } from "@/lib/helper";

interface PropType {
  userIdSession: string;
  user: UserType;
  chat: DirectMessageChatType;
  friend?: UserType;
  mainRef: React.RefObject<HTMLDivElement>;
  handleDeleteChatById: (chatId: string) => void;
}

const ImageChat = (props: PropType) => {
  const { userIdSession, user, chat, friend, mainRef, handleDeleteChatById } =
    props;

  const handleDownloadImageFile = async () => {
    const folderName = "images";

    if (chat?.url) {
      const fileName = chat?.url?.split(
        `https://piwwbijgpwvzynpsplfn.supabase.co/storage/v1/object/public/uploads/images`
      )[1];

      console.log(fileName);

      // window.open(chat?.url, "_blank");
      const aTag = document.createElement("a");
      aTag.href = chat?.url;
      aTag.setAttribute("download", "abc");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    }
  };

  return (
    <div
      className="group relative w-[100%] flex items-center justify-between rounded-md py-2
    hover:bg-secondary-white dark:hover:bg-primary-gray"
    >
      <div className="flex items-start gap-3">
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
        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-[13px]">
            <div className="flex items-center gap-3">
              <p className="font-bold">{`${user?.name} ${
                userIdSession === chat?.userId ? "(You)" : ""
              }`}</p>
              <p className="text-[12px] text-zinc-400">
                {chat?.sended ? formatDateStr(chat?.sended) : "undefined"}
              </p>
            </div>
            {user?.avatar === null && (
              <Avatar className="w-[40px] h-[40px]">
                <AvatarFallback>
                  {user?.name && getSummaryName(user?.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          {chat?.url && (
            <Image
              className="rounded-md"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={chat?.url}
              width="0"
              height="0"
              alt="image"
            />
          )}
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center justify-center p-2 rounded-md bg-primary-purple hover:bg-secondary-purple"
                    onClick={() => {
                      handleDownloadImageFile();
                    }}
                  >
                    <IoMdDownload size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download Image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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

export default ImageChat;
