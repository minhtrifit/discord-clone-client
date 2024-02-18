import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { FaUser, FaServer } from "react-icons/fa";
import { PiChatsCircleFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

import {
  adminGetAllChats,
  adminGetAllServers,
  adminGetAllUsers,
  adminGetServersAnalysis,
} from "@/lib/action.api";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import AdminServersTable from "@/components/admin/AdminServersTable";
import AdminServerAnalysis from "@/components/admin/AdminServersAnalysis";

const AdminPage = async () => {
  const adminUsersRes = await adminGetAllUsers();
  const adminServerRes = await adminGetAllServers();
  const adminServerAnalysisRes = await adminGetServersAnalysis();
  const adminChatsRes = await adminGetAllChats();

  const users = adminUsersRes?.users;
  const totalUsers = adminUsersRes?.total;
  const servers = adminServerRes?.servers;
  const totalServers = adminServerRes?.total;
  const serversAnalysis = adminServerAnalysisRes?.servers;
  const totalChats = adminChatsRes?.total;

  return (
    <div className="w-[calc(100vw-260px)] overflow-y-auto">
      <header className="w-[100%] px-10 py-4 bg-primary-purple">
        <div className="flex items-center justify-end"></div>
        <div className="mt-10 flex flex-wrap items-center gap-3 overflow-x-auto">
          <Card className="w-[280px] bg-primary-white dark:bg-primary-black">
            <CardHeader>
              <CardTitle className="text-orange-500">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-[20px]">{totalUsers}</p>
                <FaUser size={30} />
              </div>
            </CardContent>
          </Card>
          <Card className="w-[280px] bg-primary-white dark:bg-primary-black">
            <CardHeader className="text-green-500">
              <CardTitle>Servers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-[20px]">{totalServers}</p>
                <FaServer size={30} />
              </div>
            </CardContent>
          </Card>
          <Card className="w-[280px] bg-primary-white dark:bg-primary-black">
            <CardHeader>
              <CardTitle className="text-red-500">Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-[20px]">{totalChats}</p>
                <PiChatsCircleFill size={30} />
              </div>
            </CardContent>
          </Card>
        </div>
      </header>
      <AdminUsersTable users={users} />
      <AdminServersTable servers={servers} />
      <AdminServerAnalysis servers={serversAnalysis} />
    </div>
  );
};

export default AdminPage;
