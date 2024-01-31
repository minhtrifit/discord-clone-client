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
    <>
      <div>Slidebar</div>
      {children}
    </>
  );
}
