"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { GrUser } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

import All from "@/components/friends/All";
import Pending from "@/components/friends/Pending";
import Add from "@/components/friends/Add";

const FriendPage = () => {
  return (
    <div className="relative p-6 w-[calc(100vw-320px)]">
      <Tabs className="w-[100%]">
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
    </div>
  );
};

export default FriendPage;
