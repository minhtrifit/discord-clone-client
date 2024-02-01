import type { Metadata } from "next";
import Slidebar from "@/components/Slidebar";

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
    <div className="dark:bg-secondary-gray flex h-screen max-h-screen">
      <Slidebar />
      {children}
    </div>
  );
}
