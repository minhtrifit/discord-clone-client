import { ChangeEvent, useEffect, useState } from "react";
import { useFriendStore, useSocketStore } from "@/lib/store";
import { getSummaryName } from "@/lib/helper";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { UserType } from "@/types";

import { IoSearch } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { MdClear } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { useSession } from "next-auth/react";

const All = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchFriends, setSearchFriends] = useState<UserType[]>([]);

  const { data: session }: any = useSession();

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const friends = useFriendStore((state) => {
    return state.friends;
  });

  const loading = useFriendStore((state) => {
    return state.loading;
  });

  const setDirectMessages = useFriendStore((state) => {
    return state.setDirectMessages;
  });

  useEffect(() => {
    if (friends && searchInput === "") {
      setSearchFriends(friends);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends, searchInput]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (friends?.length !== 0) {
      const filterFriends = friends?.filter((friend) => {
        return (
          friend?.name
            ?.toLocaleLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          friend?.email
            ?.toLocaleLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });

      setSearchFriends(filterFriends);
    }
  };

  const handleCreateDirectMessage = async (friendEmail: string | undefined) => {
    if (socket && session?.user?.email && friendEmail !== undefined) {
      socket.emit(
        "create_direct_message",
        { ownerEmail: session?.user?.email, friendEmail: friendEmail },
        (res: { message: string; friend: UserType }) => {
          // console.log("Check create direct message:", res);
          if (res?.friend) setDirectMessages(res?.friend);
        }
      );
    }
  };

  return (
    <div className="mt-5">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => {
            handleSearchInput(e);
          }}
        />
        {searchInput === "" ? (
          <div className="absolute right-[20px] top-[8px] hover:cursor-pointer">
            <IoSearch size={25} />
          </div>
        ) : (
          <div
            className="absolute right-[20px] top-[8px] hover:cursor-pointer"
            onClick={() => {
              setSearchInput("");
            }}
          >
            <MdClear size={25} />
          </div>
        )}
      </div>
      <div className="mt-6">
        <p className="text-[13px] font-bold dark:text-gray-400">
          ALL FRIENDS-{friends?.length ? friends?.length : "0"}
        </p>
        <div className="mt-6 flex flex-col">
          {loading && (
            <div className="flex flex-col mt-[80px] items-center gap-5">
              <p className="text-[15px] dark:text-gray-400">Loading...</p>
            </div>
          )}
          {friends?.length === 0 && !loading && (
            <div className="flex flex-col mt-[80px] items-center gap-5">
              <p className="text-[15px] dark:text-gray-400">
                No one is around to play with Wumpus.
              </p>
            </div>
          )}
          {!loading && searchInput !== "" && searchFriends?.length === 0 && (
            <div className="flex flex-col mt-[80px] items-center gap-5">
              <p className="text-[15px] dark:text-gray-400">
                No one with your search to play with Wumpus.
              </p>
            </div>
          )}
          {!loading &&
            searchFriends?.map((friend) => {
              return (
                <div
                  key={friend.id}
                  className="group w-[100%] border border-primary-white dark:border-zinc-700 border-t-[1px] border-l-0 border-r-0 border-b-0
                        px-2 py-4 flex items-center justify-between
                        hover:bg-secondary-white hover:dark:bg-primary-gray hover:cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <Avatar>
                      <AvatarImage
                        src={`${friend?.avatar ? friend?.avatar : ""}`}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        {friend?.name && getSummaryName(friend?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-[13px] flex flex-col gap-[3px]">
                      <p className="font-bold">{friend?.name}</p>
                      <p className="text-[12px] dark:text-gray-300">
                        {friend?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex justify-center items-center rounded-full bg-primary-white dark:bg-primary-gray
                          group-hover:dark:bg-primary-black p-3"
                            onClick={() => {
                              handleCreateDirectMessage(friend?.email);
                            }}
                          >
                            <AiOutlineMessage size={25} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex justify-center items-center rounded-full bg-primary-white dark:bg-primary-gray
                          group-hover:dark:bg-primary-black p-3"
                          >
                            <Popover>
                              <PopoverTrigger asChild>
                                <div>
                                  <IoMdMore size={25} />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-[5px]">
                                <div className="text-[13px] flex flex-col">
                                  <div className="p-2 rounded-sm hover:text-white hover:cursor-pointer hover:bg-primary-purple">
                                    Start call
                                  </div>
                                  <div className="p-2 rounded-sm hover:text-white hover:cursor-pointer hover:bg-red-500">
                                    Remove friend
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>More</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default All;
