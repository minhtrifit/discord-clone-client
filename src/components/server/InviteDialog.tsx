import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";

import { ChannelType, ServerType, UserType } from "@/types";

import { getAllFriendsByEmail, getServerInviteLink } from "@/lib/action.api";
import { getSummaryName } from "@/lib/helper";

interface PropType {
  server: ServerType | null;
  channel: ChannelType;
  children: React.ReactNode;
}

const InviteDialog = (props: PropType) => {
  const { server, channel, children } = props;

  const { data: session }: any = useSession();
  const params = useParams();

  const [serverInviteLink, setServerInviteLink] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [friends, setFriends] = useState<UserType[]>([]);

  const handleGetServerInviteLink = async () => {
    if (session?.user?.id && server?.id && typeof server?.id === "string") {
      setServerInviteLink("");
      const res = await getServerInviteLink(session?.user?.id, server?.id);
      if (res?.message === "Get server invite link successfully")
        setServerInviteLink(res?.inviteLink);
    }
  };

  const handleGetAllFriends = async () => {
    if (session?.user?.email) {
      const res = await getAllFriendsByEmail(session?.user?.email);
      if (res?.message === "Get friends successfully") setFriends(res?.friends);
    }
  };

  useEffect(() => {
    handleGetServerInviteLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, params, server]);

  useEffect(() => {
    handleGetAllFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite friends to {server?.name}</DialogTitle>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <p className="font-bold text-[20px]">#</p>
            <p>{channel?.name}</p>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for friends"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {search === "" ? (
              <button className="absolute top-[10px] right-[10px]">
                <IoSearch size={20} />
              </button>
            ) : (
              <button
                className="absolute top-[10px] right-[10px]"
                onClick={() => {
                  setSearch("");
                }}
              >
                <MdClear size={20} />
              </button>
            )}
          </div>
          <div className="w-[100%] h-[1px] bg-zinc-400 dark:bg-zinc-500"></div>
          <div className="flex flex-col gap-3 my-5">
            {friends?.map((friend) => {
              return (
                <div
                  key={friend?.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-[40px] h-[40px]">
                      <AvatarImage src={`${friend?.avatar}`} alt="avatar" />
                      <AvatarFallback>
                        {friend?.name && getSummaryName(friend?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-[13px] font-semibold">{friend?.name}</p>
                  </div>
                  <button className="text-[13px] border border-green-700 hover:text-white hover:bg-green-700 px-4 py-2 rounded-md">
                    Invite
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <div className="w-[100%] flex flex-col gap-3">
            <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
              OR, SEND A SERVER INVITE LINK TO A FRIEND
            </p>
            <div className="w-[100%] relative">
              <Input
                type="text"
                className="h-[50px] pr-[100px]"
                defaultValue={serverInviteLink}
              />
              <Button
                className="absolute right-[5px] top-[5px]"
                type="button"
                variant="purple"
                onClick={() => {
                  if (serverInviteLink) {
                    copy(serverInviteLink);
                    toast.success("Copy invite link successfully");
                  }
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
