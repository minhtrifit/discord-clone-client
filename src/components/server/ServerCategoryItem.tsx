"use client";

import { useEffect, useState } from "react";
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

import { CategoryType, ChannelType } from "@/types";

interface PropType {
  category: CategoryType;
}

const ServerCategoryItem = (props: PropType) => {
  const { category } = props;

  const params = useParams();
  const serverId = params?.id;

  const handleCreateInvite = (channelId: string) => {
    console.log("Create invite", channelId);
  };

  const handleEditChannel = (channelId: string) => {
    console.log("Edit channel", channelId);
  };

  return (
    <Accordion
      key={category?.id}
      type="single"
      collapsible
      className="w-full border-0"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-[12px] font-bold hover:no-underline dark:hover:text-white">
          <p className="pl-2 max-w-[180px] truncate">{category?.name}</p>
        </AccordionTrigger>
        <AccordionContent>
          {category?.channels?.map((channel: ChannelType) => {
            return (
              <div
                key={channel?.id}
                className="flex items-center justify-between p-2 rounded-md hover:cursor-pointer text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                <Link
                  href={`/dashboard/server/${serverId}/channel/${channel?.id}`}
                >
                  <div className="text-[13px] flex items-center gap-3">
                    <p className="text-[23px]">#</p>
                    <p className="max-w-[130px] truncate">{channel?.name}</p>
                  </div>
                </Link>
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
