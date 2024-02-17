"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

import { ThemeToggle } from "../ThemeToggle";

import { handleSignOut } from "@/lib/action";

const AdminSlidebar = () => {
  const { data: session }: any = useSession();

  const pathName = usePathname();

  const links = [
    { name: "Dashboard", url: "/admin", icon: <MdDashboard size={30} /> },
    { name: "Storage", url: "/admin/storage", icon: <FaDatabase size={25} /> },
  ];

  return (
    <div className="relative w-[260px] h-screen max-h-screen py-4 bg-secondary-gray dark:bg-primary-gray">
      <div className="flex items-center justify-center px-6">
        <p className="text-[25px] font-bold text-primary-purple">
          Discord Admin
        </p>
      </div>
      <div className="my-5 px-6 flex gap-3">
        <ThemeToggle />
      </div>
      <div className="my-10 px-2 max-h-[calc(100vh-200px)] h-[calc(100vh-200px)] overflow-y-auto">
        <div className="flex flex-col gap-2">
          {links?.map((link) => {
            return (
              <Link key={link.name} href={link.url}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                    pathName === link?.url
                      ? "bg-primary-white dark:bg-zinc-700 font-bold"
                      : "text-zinc-400"
                  }`}
                >
                  <div className="w-[30px] h-[30px] flex items-center justify-center">
                    {link.icon}
                  </div>
                  <p className="max-w-[150px] truncate">{link.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 w-[100%] p-4 flex items-center justify-between text-zinc-400 bg-primary-black dark:bg-primary-black">
        <p className="text-[15px] font-semibold max-w-[200px] truncate">
          Welcome {session?.user?.name}
        </p>
        <form action={handleSignOut}>
          <button className="bg-red-500 hover:bg-red-400 text-white p-2 rounded-md flex items-center justify-center">
            <IoIosLogOut size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSlidebar;
