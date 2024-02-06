"use client";

import { useFriendStore, useSocketStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types";
import { getSummaryName } from "@/lib/helper";

const FriendOnline = () => {
  const { data: session }: any = useSession();

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const onlines = useFriendStore((state) => {
    return state.onlines;
  });

  const updateOnlines = useFriendStore((state) => {
    return state.updateOnlines;
  });

  const filterOnlines = useFriendStore((state) => {
    return state.filterOnlines;
  });

  useEffect(() => {
    if (socket && session?.user?.email) {
      socket.emit(
        "get_online_friends",
        { email: session?.user?.email },
        (rs: any) => {
          // console.log("Get online friends", rs.onlines);
          if (rs?.onlines) updateOnlines(rs?.onlines);
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, session?.user?.email]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "friend_connected",
        (rs: { message: string; friend: UserType }) => {
          // console.log("Check offline friend:", rs);
          if (rs?.friend) {
            const newOnlines = onlines;
            newOnlines.push(rs?.friend);

            const uniqueObjects = newOnlines?.filter((item, index, self) => {
              return (
                self.findIndex((obj) => obj.email === item.email) === index
              );
            });

            updateOnlines(uniqueObjects);
          }
        }
      );

      socket.on(
        "friend_disconnected",
        (rs: { message: string; friend: UserType }) => {
          // console.log("Check offline friend:", rs);
          if (rs?.friend) filterOnlines(rs?.friend);
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="p-6">
      <p className="font-bold">Active Now</p>
      <div className="flex flex-col mt-8">
        <p className="text-[13px] font-bold dark:text-gray-400">
          ONLINE-{onlines?.length ? onlines?.length : "0"}
        </p>
        <div className="mt-5 flex flex-col gap-5">
          {onlines?.length === 0 && (
            <div className="flex flex-col gap-3 items-center">
              <p className="text-center text-[15px] font-semibold">
                It is quiet for now...
              </p>
              <p className="text-center text-[12px] dark:text-gray-400">
                When a friend starts an activity-like playing a game or hanging
                out on voice-we will show it here!
              </p>
            </div>
          )}
          {onlines?.map((friend) => {
            return (
              <div key={friend.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`${friend?.avatar ? friend?.avatar : ""}`}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    {friend?.name && getSummaryName(friend?.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-[13px] font-semibold">{friend?.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FriendOnline;
