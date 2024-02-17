import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord Clone | Admin",
  description: "Developed by minhtrifit",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex">{children}</div>;
}
