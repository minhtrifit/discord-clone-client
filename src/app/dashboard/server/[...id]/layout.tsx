import ServerSubSlidebar from "@/components/server/ServerSubSlidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord Clone | Server",
  description: "Developed by minhtrifit",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-secondary-gray flex h-screen max-h-screen">
      <ServerSubSlidebar />
      {children}
    </div>
  );
}
