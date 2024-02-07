import MainChat from "@/components/chat/MainChat";
import FriendProfileSlidebar from "@/components/chat/FriendProfileSlidebar";

const DirectMessagesPage = () => {
  return (
    <div className="w-[calc(100vw-320px)] flex overflow-y-auto">
      <div className="w-[100%]">
        <MainChat />
      </div>
      <div className="hidden min-[900px]:flex w-[350px] h-screen border-2 border-l-primary-white dark:border-l-primary-gray">
        <FriendProfileSlidebar />
      </div>
    </div>
  );
};

export default DirectMessagesPage;
