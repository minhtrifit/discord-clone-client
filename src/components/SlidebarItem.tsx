"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ServerType } from "@/types";

interface PropType {
  server: ServerType;
}

const SlidebarItem = (props: PropType) => {
  const { server } = props;

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isOver, setIsOver] = useState<boolean>(false);
  const [serverAvatar, setServerAvatar] = useState<string>(
    "/images/discord-white-icon.svg"
  );

  useEffect(() => {
    if (
      server.id !== null &&
      server.avatar !== null &&
      server.avatar !== undefined
    ) {
      setServerAvatar(server.avatar);
    }
  }, [server]);

  const handleNavigateServer = () => {
    if (server.id === null) router.push("/dashboard/friends");
    else {
      router.push(`/dashboard/server/${server.id}`);
    }
  };

  return (
    <div
      className="group w-[100%] h-[60px] relative flex items-center gap-2"
      onMouseOver={() => {
        setIsOver(true);
      }}
      onMouseLeave={() => {
        setIsOver(false);
      }}
    >
      {/* Hover effect */}
      {isOver && (
        <div className="hidden group-hover:block bg-primary-gray dark:bg-white w-[5px] h-[20px] rounded-tr-lg rounded-br-lg"></div>
      )}

      {/* Active effect */}
      {!isOver && server.id === null && id === undefined && (
        <div className="bg-primary-gray dark:bg-white w-[5px] h-[40px] rounded-tr-lg rounded-br-lg"></div>
      )}

      {!isOver &&
        server.id !== null &&
        server.id !== undefined &&
        id?.includes(server.id?.toString()) && (
          <div className="bg-primary-gray dark:bg-white w-[5px] h-[40px] rounded-tr-lg rounded-br-lg"></div>
        )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`absolute w-[50px] h-[50px] left-0 right-0 mx-auto flex justify-center rounded-full
                    hover:cursor-pointer ${server.id === null && "p-2"} ${
                server.id === null && "bg-primary-purple"
              }`}
              onClick={() => {
                handleNavigateServer();
              }}
            >
              {server.id === null ? (
                <Image
                  className="rounded-full h-[100%] w-[100%] p-[8px]"
                  src={serverAvatar}
                  fill
                  priority
                  sizes="80%"
                  alt="avatar"
                />
              ) : (
                <Image
                  className="rounded-full h-[100%] w-[100%]"
                  src={serverAvatar}
                  fill
                  priority
                  sizes="100%"
                  alt="avatar"
                />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{server.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SlidebarItem;
