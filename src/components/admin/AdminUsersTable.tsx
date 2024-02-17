"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { UserType } from "@/types";

import { FaInbox } from "react-icons/fa6";

import { formatDateStr, getSummaryName } from "@/lib/helper";

interface PropType {
  users: UserType[];
}

const AdminUsersTable = (props: PropType) => {
  const { users } = props;

  const ITEMS_PER_PAGE = 5;

  const [usersPerPage, setUsersPerPage] = useState<UserType[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  // Count items per page
  useEffect(() => {
    if (users?.length !== 0) {
      const begin = (activePage - 1) * ITEMS_PER_PAGE;
      const end = (activePage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
      const items = users?.slice(begin, end);

      setUsersPerPage(items);
    }
  }, [users, activePage]);

  // Count page pagination
  useEffect(() => {
    if (users?.length !== 0) {
      const totalPages = Math.ceil(users?.length / ITEMS_PER_PAGE);

      const pageArray = Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );

      setPages(pageArray);
    }
  }, [users]);

  return (
    <div className="my-10 mx-10 p-6 rounded-md bg-secondary-white dark:bg-primary-gray">
      <h1 className="text-[20px] font-bold mb-5">Total Users</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-primary-purple hover:bg-primary-purple">
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-white">Provider</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Avatar</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Member Since</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersPerPage?.map((user: UserType, index: number) => (
            <TableRow
              key={user?.id}
              className="group hover:bg-primary-white dark:hover:bg-secondary-gray"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{user?.provider}</TableCell>
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
        <TableCaption>
          {users?.length !== 0 && (
            <Pagination className="mt-5">
              <PaginationContent>
                {pages?.map((page) => {
                  return (
                    <PaginationItem
                      key={uuidv4()}
                      className="hover:cursor-pointer"
                    >
                      <PaginationLink
                        isActive={page === activePage ? true : false}
                        onClick={() => {
                          setActivePage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              </PaginationContent>
            </Pagination>
          )}
        </TableCaption>
        <TableCaption>
          {users?.length === 0 && (
            <div className="h-[150px] mt-10 flex items-center flex-col gap-5">
              <p className="text-[20px] font-bold">This data is empty now</p>
              <FaInbox size={40} />
            </div>
          )}
        </TableCaption>
      </Table>
    </div>
  );
};

export default AdminUsersTable;
