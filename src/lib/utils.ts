import { ServerType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HomeNavLinks = [
  {
    name: "Download",
    url: "/download",
  },
  {
    name: "Nitro",
    url: "/nitro",
  },
  {
    name: "Discover",
    url: "/discover",
  },
  {
    name: "Safety",
    url: "/safety",
  },
  {
    name: "Support",
    url: "/support",
  },
  {
    name: "Blog",
    url: "/blog",
  },
  {
    name: "Careers",
    url: "/careers",
  },
];

export const HomeFooterLinks = [
  {
    name: "Product",
    links: [
      {
        name: "Download",
        url: "/Download",
      },
      {
        name: "Nitro",
        url: "/nitro",
      },
      {
        name: "Status",
        url: "/status",
      },
      {
        name: "App Directory",
        url: "/application-directory",
      },
      {
        name: "New Mobile Experience",
        url: "/mobile",
      },
    ],
  },
  {
    name: "Company",
    links: [
      {
        name: "About",
        url: "/about",
      },
      {
        name: "Jobs",
        url: "/jobs",
      },
      {
        name: "Brand",
        url: "/brands",
      },
      {
        name: "Newsroom",
        url: "/newsroom",
      },
      {
        name: "Fall Release",
        url: "/fallrelease",
      },
    ],
  },
  {
    name: "Resources",
    links: [
      {
        name: "College",
        url: "/colleges",
      },
      {
        name: "Support",
        url: "/support",
      },
      {
        name: "Safety",
        url: "/safety",
      },
      {
        name: "Blog",
        url: "/blog",
      },
      {
        name: "Feedback",
        url: "/feedback",
      },
      {
        name: "StreamKit",
        url: "/streamKit",
      },
      {
        name: "Creators",
        url: "/creators",
      },
      {
        name: "Community",
        url: "/community",
      },
      {
        name: "Developers",
        url: "/developers",
      },
      {
        name: "Gaming",
        url: "/gaming",
      },
      {
        name: "Official 3rd Party Merch",
        url: "https://discordmerch.com/?utm_source=shortlink&utm_lkey=z5bm6",
      },
    ],
  },
  {
    name: "Policies",
    links: [
      {
        name: "Terms",
        url: "/terms",
      },
      {
        name: "Privacy",
        url: "/privacy",
      },
      {
        name: "Cookie Settings",
        url: "/cookie-settings",
      },
      {
        name: "Guidelines",
        url: "/guidelines",
      },
      {
        name: "Acknowledgements",
        url: "/acknowledgements",
      },
      {
        name: "Licenses",
        url: "/licenses",
      },
      {
        name: "Company Information",
        url: "/company-information",
      },
    ],
  },
];

export const ServerData: ServerType[] = [
  {
    id: 1,
    name: "Những con mèo hoang",
    owner: 4416,
    avatar: "/images/avatar.png",
  },
  {
    id: 2,
    name: "HCMUS Public",
    owner: 1599,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    name: "Coder Group",
    owner: 2538,
    avatar: "https://github.com/shadcn.png",
  },
];
