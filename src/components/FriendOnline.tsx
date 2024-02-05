"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FriendOnline = () => {
  return (
    <div className="p-6">
      <p className="font-bold">Active Now</p>
      <div className="flex flex-col mt-8">
        <p className="text-[13px] font-bold dark:text-gray-400">ONLINE-3</p>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[13px] font-semibold">Lê Minh Trí</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[13px] font-semibold">Lê Minh Trí</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendOnline;
