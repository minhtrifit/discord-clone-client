"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { IoPersonAddSharp, IoSettingsOutline } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { MdAdd } from "react-icons/md";

import { CategoryType, ChannelType } from "@/types";
import { useServerStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import CreateNewChannelBtn from "./CreateNewChannelBtn";

interface PropType {
  category: CategoryType;
}

const ServerCategoryItem = (props: PropType) => {
  const { category } = props;

  const { data: session }: any = useSession();

  const params = useParams();
  const serverId = params?.id;

  const categoryBtnRef = useRef<any>(null);
  const addNewChannelBtnRef = useRef<HTMLDivElement>(null);

  const [openCreateChannel, setOpenCreateChannel] = useState<boolean>(false);

  const server = useServerStore((state) => {
    return state.server;
  });

  const handleCreateInvite = (channelId: string) => {
    console.log("Create invite", channelId);
  };

  const handleEditChannel = (channelId: string) => {
    console.log("Edit channel", channelId);
  };

  useEffect(() => {
    if (categoryBtnRef?.current) {
      categoryBtnRef?.current.click();
    }
  }, []);

  useEffect(() => {
    if (!openCreateChannel && categoryBtnRef?.current) {
      categoryBtnRef?.current.click();
    }
  }, [openCreateChannel]);

  return (
    <Accordion
      key={category?.id}
      type="single"
      collapsible
      className="w-full border-0"
      disabled={openCreateChannel ? true : false}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          ref={categoryBtnRef}
          className="text-[12px] font-bold hover:no-underline dark:hover:text-white"
        >
          <div className="w-[90%] flex items-center justify-between">
            <p className="pl-2 max-w-[180px] truncate">{category?.name}</p>
            {server && server?.owner?.id === session?.user?.id && (
              <CreateNewChannelBtn
                category={category}
                openCreateChannel={openCreateChannel}
                setOpenCreateChannel={setOpenCreateChannel}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div ref={addNewChannelBtnRef}>
                        <MdAdd size={20} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create Channel</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CreateNewChannelBtn>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {category?.channels?.map((channel: ChannelType) => {
            return (
              <div
                key={channel?.id}
                className="flex items-center justify-between p-2 rounded-md hover:cursor-pointer text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                {channel?.type === "text" && (
                  <Link
                    href={`/dashboard/server/${serverId}/channel/${channel?.id}`}
                  >
                    <div className="text-[13px] flex items-center gap-3">
                      <p className="flex items-center justify-center text-[23px] w-[30px]">
                        #
                      </p>
                      <p className="max-w-[120px] truncate hover:underline">
                        {channel?.name}
                      </p>
                    </div>
                  </Link>
                )}
                {channel?.type === "voice" && (
                  <div className="text-[13px] flex items-center gap-3">
                    <HiSpeakerWave
                      className="flex items-center justify-center text-[23px] w-[30px]"
                      size={20}
                    />
                    <p className="max-w-[120px] truncate hover:underline">
                      {channel?.name}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            if (channel?.id) handleCreateInvite(channel?.id);
                          }}
                        >
                          <IoPersonAddSharp size={15} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create Invite</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            if (channel?.id) handleEditChannel(channel?.id);
                          }}
                        >
                          <IoSettingsOutline size={15} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit channel</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ServerCategoryItem;
