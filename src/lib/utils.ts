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
