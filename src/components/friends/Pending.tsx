import { useEffect, useState } from "react";
import { useFriendStore } from "@/lib/store";
import { useSession } from "next-auth/react";

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

const Pending = () => {
  const { data: session }: any = useSession();

  const [list, setList] = useState<UserType[]>([]);

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

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3">
        <p className="text-[15px] font-bold">PENDING FRIEND</p>
        <p className="text-[13px] text-black dark:text-gray-400">
          People that want to be your friend.
        </p>
      </div>
      <div className="mt-5">
        {list?.map((user) => {
          return (
            <div
              key={user.id}
              className="w-[100%] border border-gray-400 border-t-[1px] border-l-0 border-r-0 border-b-0
                      px-2 py-4 flex items-center justify-between
                      hover:bg-secondary-white hover:dark:bg-primary-gray hover:cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <Avatar>
                  <AvatarImage
                    src={user?.avatar ? user?.avatar : ""}
                    alt="avatar"
                  />
                  <AvatarFallback>user</AvatarFallback>
                </Avatar>
                <div className="text-[13px]">
                  <p className="font-black">{user?.name}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="text-green-500 flex justify-center items-center rounded-full
                                      bg-primary-white dark:bg-primary-gray p-3"
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
                                      bg-primary-white dark:bg-primary-gray p-3"
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
