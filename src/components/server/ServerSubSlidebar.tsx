"use client";

import { useServerStore, useSocketStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import { RiCalendarEventLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

import { Skeleton } from "@/components/ui/skeleton";
import UserProfile from "../UserProfile";
import ServerDropdownMenu from "./ServerDropdownMenu";
import ServerCategoryItem from "./ServerCategoryItem";
import CreateNewCategoryBtn from "./CreateNewCategoryBtn";

import { CategoryType, ChannelType } from "@/types";

// import { CategoriesData } from "@/lib/utils";
import { getDetailServerById } from "@/lib/action.api";
import { handleLeaveServerAction } from "@/lib/action";

const ServerSubSlidebar = () => {
  const { data: session }: any = useSession();

  const params = useParams();
  const serverId = params?.id;

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const server = useServerStore((state) => {
    return state.server;
  });

  const setServer = useServerStore((state) => {
    return state.setServer;
  });

  const setLoading = useServerStore((state) => {
    return state.setLoading;
  });

  const categories = useServerStore((state) => {
    return state.categories;
  });

  const updateCategories = useServerStore((state) => {
    return state.updateCategories;
  });

  const handleGetDetailServer = async () => {
    if (params?.id && typeof params?.id === "string" && session?.user?.id) {
      setLoading(true);
      const res = await getDetailServerById(params?.id, session?.user?.id);

      if (
        res?.message === "Get detail server successfully" &&
        res?.server !== null
      ) {
        setServer(res?.server);
      }

      setLoading(false);
    }
  };

  const handleGetAllCategories = async () => {
    if (socket && serverId) {
      socket.emit(
        "get_all_categories_by_server_id",
        {
          serverId: serverId,
        },
        (res: { message: string; categories: CategoryType[] }) => {
          // console.log("CHECK GET ALL CATEGORIES", res);
          if (res?.message === "Get all categories by server id successfully") {
            updateCategories(res?.categories);
          }
        }
      );
    }
  };

  useEffect(() => {
    handleGetDetailServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, serverId]);

  useEffect(() => {
    handleGetAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, serverId]);

  // Receive new category created
  useEffect(() => {
    if (socket) {
      socket.on(
        "get_new_category",
        (rs: { message: string; category: CategoryType }) => {
          // console.log("Get new category created:", rs);
          if (
            rs?.message === "Your server have a new channel" &&
            rs?.category
          ) {
            socket.emit(
              "get_all_categories_by_server_id",
              {
                serverId: server?.id,
              },
              (res: { message: string; categories: CategoryType[] }) => {
                if (
                  res?.message ===
                  "Get all categories by server id successfully"
                ) {
                  updateCategories(res?.categories);
                }
              }
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // Receive new channel created
  useEffect(() => {
    if (socket) {
      socket.on(
        "get_new_channel",
        (rs: { message: string; channel: ChannelType }) => {
          // console.log("Get new channel created:", rs);
          if (rs?.message === "Your server have a new channel" && rs?.channel) {
            socket.emit(
              "get_all_categories_by_server_id",
              {
                serverId: server?.id,
              },
              (res: { message: string; categories: CategoryType[] }) => {
                if (
                  res?.message ===
                  "Get all categories by server id successfully"
                ) {
                  updateCategories(res?.categories);
                }
              }
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // Receive category deleted
  useEffect(() => {
    if (socket) {
      socket.on(
        "get_delete_category",
        (rs: { message: string; categoryId: string }) => {
          // console.log("Get category deleted:", rs);
          if (
            rs?.message === "Your server delete a category" &&
            rs?.categoryId
          ) {
            socket.emit(
              "get_all_categories_by_server_id",
              {
                serverId: server?.id,
              },
              (res: { message: string; categories: CategoryType[] }) => {
                if (
                  res?.message ===
                  "Get all categories by server id successfully"
                ) {
                  updateCategories(res?.categories);
                }
              }
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // Receive channel deleted
  useEffect(() => {
    if (socket) {
      socket.on(
        "get_delete_channel",
        (rs: { message: string; channelId: string }) => {
          // console.log("Get channel deleted:", rs);
          if (rs?.message === "Your server delete a channel" && rs?.channelId) {
            socket.emit(
              "get_all_categories_by_server_id",
              {
                serverId: server?.id,
              },
              (res: { message: string; categories: CategoryType[] }) => {
                if (
                  res?.message ===
                  "Get all categories by server id successfully"
                ) {
                  updateCategories(res?.categories);
                }
              }
            );
          }
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleLeaveServer = async () => {
    if (socket && server?.id && session?.user?.id) {
      if (confirm(`Do you want to leave server ${server?.name}`) == true) {
        socket.emit(
          "leave_server",
          {
            userId: session?.user?.id,
            serverId: server?.id,
          },
          (res: { message: string }) => {
            if (res?.message === "Leave server successfully") {
              handleLeaveServerAction();
            }
          }
        );
      }
    }
  };

  return (
    <div className="relative w-[240px] overflow-x-auto bg-secondary-white dark:bg-primary-gray dark:text-gray-400">
      <div className="px-6 py-3 flex items-center justify-between gap-3 border border-b-primary-black">
        {!server?.name ? (
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-[150px] bg-zinc-400" />
            </div>
          </div>
        ) : (
          <Link href={`/dashboard/server/${server?.id}`}>
            <p className="text-[15px] font-bold dark:text-white max-w-[240px] truncate hover:cursor-pointer hover:underline">
              {server?.name}
            </p>
          </Link>
        )}
        <ServerDropdownMenu />
      </div>
      {server && server?.owner?.id === session?.user?.id && (
        <div className="p-2">
          <button
            className="w-[100%] flex items-center gap-3 rounded-md p-2 text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                           dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
          >
            <RiCalendarEventLine size={20} />
            <p className="text-[13px] font-semibold">Events</p>
          </button>
        </div>
      )}
      <div className="w-[95%] h-[1px] mx-auto bg-zinc-600 dark:bg-zinc-500"></div>
      {server && server?.owner?.id === session?.user?.id && (
        <>
          <CreateNewCategoryBtn />
          <div className="w-[95%] h-[1px] mx-auto bg-zinc-600 dark:bg-zinc-500"></div>
        </>
      )}
      {server && server?.owner?.id !== session?.user?.id && (
        <>
          <div className="p-2">
            <button
              className="w-[100%] flex items-center gap-3 rounded-md p-2 text-zinc-500 hover:bg-zinc-300 hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              onClick={handleLeaveServer}
            >
              <IoIosLogOut size={20} />

              <p className="text-[13px] font-semibold">Leave Server</p>
            </button>
          </div>
          <div className="w-[95%] h-[1px] mx-auto bg-zinc-600 dark:bg-zinc-500"></div>
        </>
      )}
      <div className="w-[100%] max-h-[calc(100vh-180px)] px-2 py-4 overflow-y-auto">
        <div className="w-[100%] flex flex-col gap-3">
          {categories?.map((category: CategoryType) => {
            if (category?.serverId === serverId)
              return (
                <ServerCategoryItem key={category?.id} category={category} />
              );
          })}
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default ServerSubSlidebar;
