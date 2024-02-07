import type { Metadata } from "next";
import DMAuthProvider from "@/components/providers/DMAuthProvider";

export const metadata: Metadata = {
  title: "Discord Clone | Direct Messages",
  description: "Developed by minhtrifit",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DMAuthProvider>{children}</DMAuthProvider>;
}
