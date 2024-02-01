import SlidebarItem from "@/components/SlidebarItem";
import { ServerType } from "@/types";

import { ServerData } from "@/lib/utils";

const Slidebar = () => {
  const DirectMessage: ServerType = {
    id: null,
    name: "Direct Messages",
  };

  return (
    <div className="w-[80px] py-2 flex flex-col items-center gap-2 bg-primary-white dark:bg-primary-black">
      <SlidebarItem server={DirectMessage} />
      <div className="w-[80%] h-[2px] bg-primary-gray dark:bg-secondary-gray"></div>
      {ServerData?.map((server: ServerType) => {
        return <SlidebarItem key={server.id} server={server} />;
      })}
    </div>
  );
};

export default Slidebar;
