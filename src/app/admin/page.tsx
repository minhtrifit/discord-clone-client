import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaUser, FaServer } from "react-icons/fa";
import { PiChatsCircleFill } from "react-icons/pi";
import { MdAdminPanelSettings } from "react-icons/md";

import { ServerType, UserType } from "@/types";

import { adminGetAllServers, adminGetAllUsers } from "@/lib/action.api";
import { formatDateStr, getSummaryName } from "@/lib/helper";

const AdminPage = async () => {
  const adminUsersRes = await adminGetAllUsers();
  const adminServerRes = await adminGetAllServers();

  const users = adminUsersRes?.users;
  const totalUsers = adminUsersRes?.total;
  const server = adminServerRes?.servers;
  const totalServers = adminServerRes?.total;

  return (
    <div className="w-[calc(100vw-260px)] overflow-y-auto">
      <header className="w-[100%] px-10 py-4 bg-primary-purple">
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3 overflow-x-auto">
          <Card className="w-[250px]">
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
          <Card className="w-[250px]">
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
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle className="text-sky-500">Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-[20px]">50</p>
                <PiChatsCircleFill size={30} />
              </div>
            </CardContent>
          </Card>
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle className="text-red-500">Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-[20px]">3</p>
                <MdAdminPanelSettings size={30} />
              </div>
            </CardContent>
          </Card>
        </div>
      </header>
      <div className="my-10 mx-10 p-6 rounded-md bg-secondary-white dark:bg-primary-gray">
        <h1 className="text-[20px] font-bold mb-5">Total Users</h1>
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-purple hover:bg-primary-purple">
              <TableHead className="text-white">Provider</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Avatar</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Member Since</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: UserType) => (
              <TableRow
                key={user?.id}
                className="group hover:text-white hover:bg-secondary-purple"
              >
                <TableCell className="font-medium">{user?.provider}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src={`${user?.avatar}`} alt="avatar" />
                    <AvatarFallback className="group-hover:text-primary-purple">
                      {user?.name && getSummaryName(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell className="font-medium">
                  {user?.created &&
                    typeof user?.created === "string" &&
                    formatDateStr(user?.created)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="my-10 mx-10 p-6 rounded-md bg-secondary-white dark:bg-primary-gray">
        <h1 className="text-[20px] font-bold mb-5">Total Servers</h1>
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-purple hover:bg-primary-purple">
              <TableHead className="text-white">#</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Avatar</TableHead>
              <TableHead className="text-white">Owner</TableHead>
              <TableHead className="text-white">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {server?.map((server: ServerType, index: number) => (
              <TableRow
                key={server?.id}
                className="group hover:text-white hover:bg-secondary-purple"
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{server?.name}</TableCell>
                <TableCell>
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src={`${server?.avatar}`} alt="avatar" />
                    <AvatarFallback className="group-hover:text-primary-purple">
                      {server?.name && getSummaryName(server?.name)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-[40px] h-[40px]">
                      <AvatarImage
                        src={`${server?.owner?.avatar}`}
                        alt="avatar"
                      />
                      <AvatarFallback className="group-hover:text-primary-purple">
                        {server?.owner?.name &&
                          getSummaryName(server?.owner?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <p>{server?.owner?.email}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {server?.created && formatDateStr(server?.created)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminPage;
