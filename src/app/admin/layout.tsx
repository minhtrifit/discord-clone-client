import type { Metadata } from "next";
import Slidebar from "@/components/Slidebar";
import ScreenProvider from "@/components/providers/ScreenProvider";
import AdminSlidebar from "@/components/admin/AdminSlidebar";

export const metadata: Metadata = {
  title: "Discord Clone | Admin",
  description: "Developed by minhtrifit",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScreenProvider>
      <div className="w-[100%] flex dark:bg-secondary-gray flex h-screen max-h-screen">
        <AdminSlidebar />
        {children}
      </div>
    </ScreenProvider>
  );
}
