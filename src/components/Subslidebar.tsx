"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFriendStore, useSocketStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  getAllDirectMessagesByEmail,
  getAllFriendsByEmail,
} from "@/lib/action.api";
import { getSummaryName } from "@/lib/helper";

import { DirectMessageChatType, UserType } from "@/types";

import { GrUser } from "react-icons/gr";
import { BsSpeedometer } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MdClear } from "react-icons/md";

import UserProfile from "./UserProfile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Subslidebar = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const category = usePathname().split("/dashboard/")[1];

  const Links = [
    {
      name: "Friends",
      url: "/dashboard/friends",
      icon: <GrUser size={25} />,
    },
    {
      name: "Nitro",
      url: "/dashboard/nitro",
      icon: <BsSpeedometer size={25} />,
    },
    {
      name: "Shop",
      url: "/dashboard/shop",
      icon: <AiOutlineShop size={25} />,
    },
  ];

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const setPendings = useFriendStore((state) => {
    return state.setPendings;
  });

  const updateFriends = useFriendStore((state) => {
    return state.updateFriends;
  });

  const setLoading = useFriendStore((state) => {
    return state.setLoading;
  });

  const directMessages = useFriendStore((state) => {
    return state.directMessages;
  });

  const updateDirectMessages = useFriendStore((state) => {
    return state.updateDirectMessages;
  });

  const filterDirectMessages = useFriendStore((state) => {
    return state.filterDirectMessages;
  });

  useEffect(() => {
    if (socket) {
      socket.on(
        "get_friend_request",
        (rs: { message: string; user: UserType }) => {
          // console.log("Get friend request:", rs);
          const { user }: any = rs;

          setPendings(user);
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleGetFriendsFromDB = async () => {
    setLoading(true);
    const res = await getAllFriendsByEmail(session?.user?.email);
    if (res?.message === "Get friends successfully") {
      // console.log("CHECK RES FRIENDS", res);
      updateFriends(res?.friends);
    }
    setLoading(false);
  };

  const handleGetDirectMessagesFromDB = async () => {
    const res = await getAllDirectMessagesByEmail(session?.user?.email);
    if (res?.message === "Get direct messages successfully") {
      // console.log("CHECK RES DIRECT MESS", res);
      if (res?.friends) updateDirectMessages(res?.friends);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      handleGetFriendsFromDB();
      handleGetDirectMessagesFromDB();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  useEffect(() => {
    if (socket) {
      socket.on("new_friend", (rs: { message: string; user: UserType }) => {
        // console.log("Get friend request:", rs);
        if (rs?.message === "You have a new friend") {
          toast.info(`You and ${rs?.user?.email} just become a friend`);

          if (session?.user?.email) handleGetFriendsFromDB();
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // Receive direct message
  useEffect(() => {
    if (socket) {
      socket.on(
        "receive_direct_message",
        (rs: {
          message: string;
          user: UserType;
          friend: UserType;
          chat: DirectMessageChatType;
        }) => {
          // console.log("Receive direct message request:", rs);
          if (rs?.message === "You have new direct message" && rs?.user) {
            // const newDirectMessage = directMessages;
            // newDirectMessage.push(rs?.user);

            // const uniqueObjects = newDirectMessage?.filter(
            //   (item, index, self) => {
            //     return (
            //       self.findIndex((obj) => obj.email === item.email) === index
            //     );
            //   }
            // );

            // updateDirectMessages(uniqueObjects);

            socket.emit(
              "get_direct_messages",
              {
                email: session?.user?.email,
                prevFriend: rs?.user,
              },
              (res: { message: string; friends: UserType[] }) => {
                // console.log("Check get all direct messages:", res);
                if (res?.friends) {
                  // console.log(res?.friends);
                  updateDirectMessages(res?.friends);
                }
              }
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleDeleteDirectMessage = (friendEmail: string | undefined) => {
    router.push("/dashboard/friends");

    if (socket && session?.user?.email && friendEmail !== undefined) {
      socket.emit(
        "delete_direct_message",
        { ownerEmail: session?.user?.email, friendEmail: friendEmail },
        (res: { message: string; friend: UserType }) => {
          // console.log("Check delete direct message:", res);
          if (
            res.message === "Delete direct message, successfully" &&
            res?.friend
          ) {
            filterDirectMessages(res?.friend);
          }
        }
      );
    }
  };

  const getDirectMessageId = (userId: string | undefined) => {
    const arr = category.split("/");
    if (userId !== undefined && arr?.length && arr?.length === 3) {
      const id = arr[arr?.length - 1];
      if (userId === id) return true;
      return false;
    }
    return false;
  };

  return (
    <div className="relative w-[240px] overflow-x-auto bg-secondary-white dark:bg-primary-gray dark:text-gray-400">
      <div className="px-2 py-3 flex items-center justify-center border border-b-primary-black">
        <input
          className="h-[30px] w-[100%] dark:bg-primary-black pl-4 pr-8 py-2 text-[12px] rounded-md outline-none"
          type="text"
          placeholder="Find or start a conversation"
        />
      </div>
      <div className="flex flex-col gap-1 p-3">
        {Links?.map((item) => {
          return (
            <Link key={item.name} href={item.url}>
              <div
                className={`px-2 py-3 rounded-md text-[14px] flex items-center gap-5
                            text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white ${
                              category !== undefined &&
                              !category.includes("/messages") &&
                              category?.includes(item.name.toLowerCase()) &&
                              "font-semibold text-zinc-900 dark:text-white bg-primary-white dark:bg-secondary-gray"
                            }`}
              >
                {item.icon}
                <p>{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="w-[100%] mt-5 overflow-y-auto flex items-center justify-between px-6 text-[12px] dark:text-gray-400 font-bold
                      hover:dark:text-gray-300"
      >
        <p>DIRECT MESSAGES</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hover:cursor-pointer">
                <IoMdAdd size={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create DM</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col gap-1 px-3 mt-5">
        <div className="w-[100%] max-h-[calc(100vh-380px)] overflow-y-auto">
          {directMessages?.map((user) => {
            return (
              <div
                key={user?.id}
                className={`group flex items-center justify-between pl-2 pr-4 py-2 rounded-md
                font-semibold hover:text-zinc-900 hover:bg-zinc-300 hover:dark:bg-zinc-700
                hover:text-zinc-900 dark:hover:text-white
                hover:cursor-pointer
                ${
                  getDirectMessageId(user?.id)
                    ? "text-zinc-900 dark:text-white bg-primary-white dark:bg-secondary-gray"
                    : "text-zinc-500 dark:text-zinc-500"
                }`}
              >
                <Link href={`/dashboard/friends/messages/${user?.id}`}>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-[30px] h-[30px]">
                      <AvatarImage
                        src={`${user?.avatar ? user?.avatar : ""}`}
                        alt="avatar"
                      />
                      <AvatarFallback>
                        {user?.name && getSummaryName(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <p
                      className={`text-[13px] font-semibold max-w-[200px]
                        group-hover:text-zinc-900 group-hover:dark:text-white ${
                          getDirectMessageId(user?.id)
                            ? "text-zinc-900 dark:text-white"
                            : "text-zinc-500 dark:text-gray-400"
                        }`}
                    >
                      {user?.name}
                    </p>
                  </div>
                </Link>
                <div
                  className="hover:text-white dark:hover:text-zinc-500"
                  onClick={() => {
                    handleDeleteDirectMessage(user?.email);
                  }}
                >
                  <MdClear />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default Subslidebar;
