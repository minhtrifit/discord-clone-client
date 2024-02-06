"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { GrUser } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

import All from "@/components/friends/All";
import Pending from "@/components/friends/Pending";
import Add from "@/components/friends/Add";
import FriendOnline from "@/components/FriendOnline";

const FriendPage = () => {
  return (
    <div className="w-[calc(100vw-320px)] flex overflow-y-auto">
      <Tabs className="w-[100%] p-6">
        <TabList>
          <Tab>
            <div className="flex items-center gap-3">
              <GrUser size={20} />
              <p className="text-[15px]">Friends</p>
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-3">
              <FaListUl size={20} />
              <p className="text-[15px]">Pending</p>
            </div>
          </Tab>
          <Tab>
            <div className="flex items-center gap-3">
              <IoMdPersonAdd size={20} />
              <p className="text-[15px]">Add Friend</p>
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <All />
        </TabPanel>
        <TabPanel>
          <Pending />
        </TabPanel>
        <TabPanel>
          <Add />
        </TabPanel>
      </Tabs>
      <div className="hidden min-[900px]:flex w-[350px] h-screen border-2 border-l-primary-white dark:border-l-primary-gray">
        <FriendOnline />
      </div>
    </div>
  );
};

export default FriendPage;
