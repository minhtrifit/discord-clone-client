"use client";

import { useFriendStore } from "@/lib/store";

import MainChat from "@/components/chat/MainChat";
import FriendProfileSlidebar from "@/components/chat/FriendProfileSlidebar";

const DirectMessagesPage = () => {
  const userProfileToggle = useFriendStore((state) => {
    return state.userProfileToggle;
  });

  return (
    <div className="w-[calc(100vw-320px)] flex overflow-y-auto">
      <div className="w-[100%]">
        <MainChat />
      </div>
      <div
        className={`hidden h-screen border-2 border-l-primary-white dark:border-l-primary-gray ${
          userProfileToggle && "min-[900px]:flex w-[350px]"
        }`}
      >
        <FriendProfileSlidebar />
      </div>
    </div>
  );
};

export default DirectMessagesPage;
