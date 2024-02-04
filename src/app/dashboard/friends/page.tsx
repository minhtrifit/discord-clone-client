"use client";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const FriendPage = () => {
  return (
    <div className="relative p-6 w-[calc(100vw-320px)]">
      <Tabs className="w-[100%]">
        <TabList>
          <Tab>Friends</Tab>
          <Tab>Add Friend</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default FriendPage;
