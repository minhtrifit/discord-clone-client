"use client";

import { useSession } from "next-auth/react";

import { FaMicrophone } from "react-icons/fa6";
import { IoHeadsetSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

import { getSummaryName } from "@/lib/helper";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserSettingDialog from "./UserSettingDialog";

const UserProfile = () => {
  const { data: session, update }: any = useSession();

  const updateMuteSession = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        mute: !session?.user?.mute,
      },
    });
  };

  const updateDeafenSession = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        deafen: !session?.user?.deafen,
      },
    });
  };

  return (
    <div className="absolute bottom-0 w-[100%] bg-primary-white dark:bg-primary-black">
      {session?.user === null ? (
        <p className="text-secondary-gray">user undefined</p>
      ) : (
        <div className="flex items-center gap-[5px] p-[5px] text-[12px]">
          <div
            className="p-2 rounded-md flex items-center gap-3
                        hover:bg-secondary-white
                        hover:cursor-pointer dark:hover:bg-secondary-gray"
          >
            <Avatar className="w-[30px] h-[30px]">
              <AvatarImage src={`${session?.user?.avatar}`} alt="@shadcn" />
              <AvatarFallback>
                {session?.user?.name && getSummaryName(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="w-[70px] truncate font-bold">
                {session?.user?.name}
              </p>
              <p className="font-semibold text-[11px] text-green-500">
                {session?.user?.name && "Online"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`relative dark:hover:text-white p-[6px] rounded-md
                        hover:bg-secondary-white hover:text-primary-gray
                        dark:hover:bg-secondary-gray ${
                          session?.user?.mute && "text-red-500"
                        }`}
                    onClick={updateMuteSession}
                  >
                    {session?.user?.mute && (
                      <div className="absolute left-0 right-0 mx-auto top-[18px] -rotate-[40deg] w-[30px] h-[2px] bg-red-500"></div>
                    )}
                    <FaMicrophone size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{session?.user?.mute ? "unmute" : "mute"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`relative dark:hover:text-white p-[6px] rounded-md
                        hover:bg-secondary-white hover:text-primary-gray
                        dark:hover:bg-secondary-gray ${
                          session?.user?.deafen && "text-red-500"
                        }`}
                    onClick={updateDeafenSession}
                  >
                    {session?.user?.deafen && (
                      <div className="absolute left-0 right-0 mx-auto top-[18px] -rotate-[40deg] w-[30px] h-[2px] bg-red-500"></div>
                    )}
                    <IoHeadsetSharp size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{session?.user?.deafen ? "undeafen" : "deafen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <UserSettingDialog>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="dark:hover:text-white p-[6px] rounded-md
                        hover:bg-secondary-white hover:text-primary-gray
                        dark:hover:bg-secondary-gray"
                    >
                      <IoMdSettings size={20} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>user settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </UserSettingDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
