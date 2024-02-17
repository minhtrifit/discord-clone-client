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

import { ServerType } from "@/types";

import { FaInbox } from "react-icons/fa6";

import { formatDateStr, getSummaryName } from "@/lib/helper";

interface PropType {
  servers: ServerType[];
}

const AdminServersTable = (props: PropType) => {
  const { servers } = props;

  const ITEMS_PER_PAGE = 5;

  const [serversPerPage, setServersPerPage] = useState<ServerType[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);

  // Count items per page
  useEffect(() => {
    if (servers?.length !== 0) {
      const begin = (activePage - 1) * ITEMS_PER_PAGE;
      const end = (activePage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE;
      const items = servers?.slice(begin, end);

      setServersPerPage(items);
    }
  }, [servers, activePage]);

  // Count page pagination
  useEffect(() => {
    if (servers?.length !== 0) {
      const totalPages = Math.ceil(servers?.length / ITEMS_PER_PAGE);

      const pageArray = Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );

      setPages(pageArray);
    }
  }, [servers]);

  return (
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
          {serversPerPage?.map((server: ServerType, index: number) => (
            <TableRow
              key={server?.id}
              className="group hover:bg-primary-white dark:hover:bg-secondary-gray"
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
        <TableCaption>
          {serversPerPage?.length !== 0 && (
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
          {servers?.length === 0 && (
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

export default AdminServersTable;
