import Subslidebar from "@/components/Subslidebar";
import SocketProvider from "@/components/SocketProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord Clone | Dashboard",
  description: "Developed by minhtrifit",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <div className="flex">
        <Subslidebar />
        {children}
      </div>
    </SocketProvider>
  );
}
