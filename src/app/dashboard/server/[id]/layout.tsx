import SocketProvider from "@/components/SocketProvider";
import ServerMemberSlidebar from "@/components/server/ServerMemberSlidebar";
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
    <SocketProvider>
      <div className="dark:bg-secondary-gray flex h-screen max-h-screen">
        <ServerSubSlidebar />
        <div className="w-[calc(100vw-320px)] flex overflow-y-auto">
          {children}
          <div
            className={`hidden h-screen border-2 border-l-primary-white dark:border-l-primary-gray min-[900px]:flex w-[300px]`}
          >
            <ServerMemberSlidebar />
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}
