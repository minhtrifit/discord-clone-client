"use client";

import { useScreenWidth } from "@/hooks/useScreenWidth";
import { useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const ScreenProvider = ({ children }: Props) => {
  const screen = useScreenWidth();
  const { data: session }: any = useSession();

  if (screen < 700 && session?.user) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-primary-purple">
        <p className="text-xl font-bold">App is not available on mobile</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ScreenProvider;
