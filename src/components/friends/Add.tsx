"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { sendFriendRequest } from "@/lib/socket";
import { useSocketStore } from "@/lib/store";
import { toast } from "react-toastify";

const Add = () => {
  const { data: session }: any = useSession();

  const socket = useSocketStore((state) => {
    return state.socket;
  });

  const [formData, setFormData] = useState({
    friendEmail: "",
  });

  const handleSendFriendRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { friendEmail } = formData;

    const data = {
      senderEmail: session?.user?.email,
      receiverEmail: friendEmail,
    };

    if (friendEmail === session?.user?.email) {
      toast.error("You can not add friend with yourself");
      setFormData({
        friendEmail: "",
      });
      return;
    }

    if (socket) sendFriendRequest(socket, data, toast);
    else toast.error("Send friend request failed");

    setFormData({
      friendEmail: "",
    });
  };

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3">
        <p className="text-[15px] font-bold">ADD FRIEND</p>
        <p className="text-[13px] text-black dark:text-gray-400">
          You can add friends with their Discord email.
        </p>
      </div>
      <form
        className="relative mt-5"
        onSubmit={(e) => {
          handleSendFriendRequest(e);
        }}
      >
        <Input
          className="h-[60px]"
          type="email"
          placeholder="You can add friends with their Discord email."
          value={formData.friendEmail}
          onChange={(e) =>
            setFormData({ ...formData, friendEmail: e.target.value })
          }
        />
        <div className="absolute right-[15px] top-[10px]">
          <Button variant="purple" type="submit">
            Send Friend Request
          </Button>
        </div>
      </form>
      <div className="my-10 w-[100%] h-[1px] bg-gray-400"></div>
    </div>
  );
};

export default Add;
