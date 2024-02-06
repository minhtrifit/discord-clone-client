import { useEffect, useState } from "react";
import { useFriendStore, useSocketStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { UserType } from "@/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaCheck } from "react-icons/fa";
import { MdClear } from "react-icons/md";

import { getPendingByEmail } from "@/lib/action.api";
import { acceptFriendRequest, ignoreFriendRequest } from "@/lib/socket";
import { getSummaryName } from "@/lib/helper";

const Pending = () => {
  const { data: session }: any = useSession();

  const [list, setList] = useState<UserType[]>([]);

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const pendings = useFriendStore((state) => {
    return state.pendings;
  });

  const updatePendings = useFriendStore((state) => {
    return state.updatePendings;
  });

  const handleGetPendingFromDb = async () => {
    if (session?.user?.email) {
      const res = await getPendingByEmail(session?.user?.email);
      if (res?.message === "Get pending successfully") {
        updatePendings(res?.pendings);
      }
    }
  };

  useEffect(() => {
    if (pendings?.length !== 0) {
      const uniqueObjects = pendings?.filter((item, index, self) => {
        return self.findIndex((obj) => obj.email === item.email) === index;
      });

      setList(uniqueObjects);
    }
  }, [pendings]);

  useEffect(() => {
    if (pendings?.length === 0) {
      handleGetPendingFromDb();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIgnoreRequest = async (receiverEmail: string) => {
    if (socket !== null && receiverEmail !== "") {
      const data = {
        senderEmail: receiverEmail,
        receiverEmail: session?.user?.email,
      };

      // Send socket event
      ignoreFriendRequest(socket, data);

      // Update new pending list
      const res = await getPendingByEmail(session?.user?.email);
      if (res?.message === "Get pending successfully") {
        updatePendings(res?.pendings);
        setList(res?.pendings);
      }
    } else toast.error("Something wrong");
  };

  const handleAcceptRequest = async (receiverEmail: string) => {
    if (socket !== null && receiverEmail !== "") {
      const data = {
        senderEmail: receiverEmail,
        receiverEmail: session?.user?.email,
      };

      // Send socket event
      acceptFriendRequest(socket, data);

      // Update new pending list
      const res = await getPendingByEmail(session?.user?.email);
      if (res?.message === "Get pending successfully") {
        updatePendings(res?.pendings);
        setList(res?.pendings);
      }
    } else toast.error("Something wrong");
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3">
        <p className="text-[15px] font-bold">PENDING FRIEND</p>
        <p className="text-[13px] text-black dark:text-gray-400">
          People that want to be your friend.
        </p>
      </div>
      <div className="mt-5">
        {list?.length === 0 && (
          <div className="flex flex-col mt-[80px] items-center gap-5">
            <p className="text-[15px] dark:text-gray-400">
              There is no pending friend requests. Here is Wumpus for now.
            </p>
          </div>
        )}
        {list?.map((user) => {
          return (
            <div
              key={user.id}
              className="group w-[100%] border border-gray-400 border-t-[1px] border-l-0 border-r-0 border-b-0
                      px-2 py-4 flex items-center justify-between
                      hover:bg-secondary-white hover:dark:bg-primary-gray hover:cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarImage
                    src={user?.avatar ? user?.avatar : ""}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {user?.name && getSummaryName(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-[13px] flex flex-col gap-[3px]">
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-[12px] dark:text-gray-300">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="text-green-500 flex justify-center items-center rounded-full
                                  bg-primary-white dark:bg-primary-gray
                                  group-hover:dark:bg-primary-black p-3"
                        onClick={() => {
                          handleAcceptRequest(user?.email ? user?.email : "");
                        }}
                      >
                        <FaCheck size={20} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Accept</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="text-red-500 flex justify-center items-center rounded-full
                                  bg-primary-white dark:bg-primary-gray
                                  group-hover:dark:bg-primary-black p-3"
                        onClick={() => {
                          handleIgnoreRequest(user?.email ? user?.email : "");
                        }}
                      >
                        <MdClear size={20} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ignore</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pending;
