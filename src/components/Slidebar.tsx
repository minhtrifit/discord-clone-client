import { ServerType } from "@/types";

import { auth } from "@/lib/auth";

import { getJoinServerByUserId } from "@/lib/action.api";

import SlidebarItem from "@/components/SlidebarItem";
import CreateServerDialog from "./CreateServerDialog";

const Slidebar = async () => {
  const session = await auth();
  const { user }: any = session;

  const serverJoins = await getJoinServerByUserId(user.id);

  const DirectMessage: ServerType = {
    id: null,
    name: "Direct Messages",
  };

  return (
    <div className="w-[80px] py-2 flex flex-col items-center gap-2 bg-primary-white dark:bg-primary-black">
      <SlidebarItem server={DirectMessage} />
      <div className="w-[80%] h-[2px] bg-primary-gray dark:bg-secondary-gray"></div>
      <div className="w-[100%] overflow-y-auto">
        {serverJoins?.joins?.map((server: ServerType) => {
          return <SlidebarItem key={server.id} server={server} />;
        })}
      </div>
      <CreateServerDialog session={session} />
    </div>
  );
};

export default Slidebar;
