"use client";

import Link from "next/link";

import { GrUser } from "react-icons/gr";
import { BsSpeedometer } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { usePathname } from "next/navigation";

const Subslidebar = () => {
  const category = usePathname().split("/dashboard/")[1];

  const Links = [
    {
      name: "Friends",
      url: "/dashboard/friends",
      icon: <GrUser size={25} />,
    },
    {
      name: "Nitro",
      url: "/dashboard/nitro",
      icon: <BsSpeedometer size={25} />,
    },
    {
      name: "Shop",
      url: "/dashboard/shop",
      icon: <CiShop size={25} />,
    },
  ];

  return (
    <div className="relative bg-secondary-white dark:bg-primary-gray dark:text-gray-400">
      <div className="p-3 flex border border-b-primary-black">
        <input
          className="h-[30px] dark:bg-primary-black pl-4 pr-8 py-2 text-[12px] rounded-md outline-none"
          type="text"
          placeholder="Find or start a conversation"
        />
      </div>
      <div className="flex flex-col gap-1 p-3">
        {Links?.map((item) => {
          return (
            <Link key={item.name} href={item.url}>
              <div
                className={`px-2 py-3 rounded-md text-[14px] flex items-center gap-5
                            text-gray-500 hover:bg-primary-white hover:text-primary-black
                            dark:text-gray-400 dark:hover:bg-secondary-gray dark:hover:text-white ${
                              category !== undefined &&
                              category?.includes(item.name.toLowerCase()) &&
                              "bg-primary-white text-primary-black dark:bg-secondary-gray dark:text-white"
                            }`}
              >
                {item.icon}
                <p>{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-0 w-[100%] p-2 bg-primary-white dark:bg-primary-black">
        User
      </div>
    </div>
  );
};

export default Subslidebar;