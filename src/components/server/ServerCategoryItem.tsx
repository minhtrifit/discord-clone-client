"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useServerStore } from "@/lib/store";
import { useSession } from "next-auth/react";

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

import CreateNewChannelBtn from "./CreateNewChannelBtn";
import DeleteChannelContext from "./DeleteChannelContext";
import DeleteCategoryContext from "./DeleteCategoryContext";
import InviteDialog from "./InviteDialog";

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
    // console.log("Create invite", channelId);
  };

  const handleEditChannel = (channelId: string) => {
    // console.log("Edit channel", channelId);
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
          <DeleteCategoryContext category={category}>
            <div className="w-[200px] flex items-center justify-between">
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
          </DeleteCategoryContext>
        </AccordionTrigger>
        <AccordionContent>
          {category?.channels?.map((channel: ChannelType) => {
            return (
              <DeleteChannelContext key={channel?.id} channel={channel}>
                <div
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
                    <Link
                      href={`/dashboard/server/${serverId}/voice-channel/${channel?.id}`}
                    >
                      <div className="text-[13px] flex items-center gap-3">
                        <HiSpeakerWave
                          className="flex items-center justify-center text-[23px] w-[30px]"
                          size={20}
                        />
                        <p className="max-w-[120px] truncate hover:underline">
                          {channel?.name}
                        </p>
                      </div>
                    </Link>
                  )}
                  <div className="flex items-center gap-2">
                    <InviteDialog server={server} channel={channel}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => {
                                if (channel?.id)
                                  handleCreateInvite(channel?.id);
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
                    </InviteDialog>
                    {server && server?.owner?.id === session?.user?.id && (
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
                    )}
                  </div>
                </div>
              </DeleteChannelContext>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ServerCategoryItem;
