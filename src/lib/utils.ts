import { ServerType, DirectMessageChatType } from "@/types";
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

export const DirectMessageChatData: DirectMessageChatType[] = [
  {
    user: {
      id: "5c16c27e-227d-44f7-bd3c-b06f1cfbb4ea",
      provider: "email",
      email: "cauthuminhtri10@gmail.com",
      name: "Trí Đẹp Trai",
      password: "$2b$10$1bo8Ytn61Ox5Idg3HBCUUeydIUwAF3l2BOWa/h.xLdIpFGu8lCL3S",
      avatar:
        "https://piwwbijgpwvzynpsplfn.supabase.co/storage/v1/object/public/uploads/user_avatars/file_1707149013190.png",
      created: "2024-02-05T10:23:06.477Z",
    },
    text: "Hello",
    sended: "2024-02-05T06:08:22.692Z",
  },
  {
    user: {
      id: "9f9f3417-5021-492b-ae2f-e77d608e10a4",
      provider: "github",
      email: "minhtri.fit@gmail.com",
      name: "Lê Minh Trí",
      password: null,
      avatar: "https://avatars.githubusercontent.com/u/86849422?v=4",
      created: "2024-02-03T15:51:34.999Z",
    },
    text: "Nice to meet you",
    sended: "2024-02-05T10:23:06.477Z",
  },
  {
    user: {
      id: "9f9f3417-5021-492b-ae2f-e77d608e10a4",
      provider: "github",
      email: "minhtri.fit@gmail.com",
      name: "Lê Minh Trí",
      password: null,
      avatar: "https://avatars.githubusercontent.com/u/86849422?v=4",
      created: "2024-02-03T15:51:34.999Z",
    },
    text: "How about your project",
    sended: "2024-02-05T10:23:06.477Z",
  },
  {
    user: {
      id: "5c16c27e-227d-44f7-bd3c-b06f1cfbb4ea",
      provider: "email",
      email: "cauthuminhtri10@gmail.com",
      name: "Trí Đẹp Trai",
      password: "$2b$10$1bo8Ytn61Ox5Idg3HBCUUeydIUwAF3l2BOWa/h.xLdIpFGu8lCL3S",
      avatar:
        "https://piwwbijgpwvzynpsplfn.supabase.co/storage/v1/object/public/uploads/user_avatars/file_1707149013190.png",
      created: "2024-02-05T10:23:06.477Z",
    },
    text: "It's still in progress, thank you",
    sended: "2024-02-05T06:08:22.692Z",
  },
];
