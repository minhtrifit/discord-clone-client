"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useFriendStore } from "@/lib/store";
import { getAllDirectMessagesByEmail } from "@/lib/action.api";

type Props = {
  children?: React.ReactNode;
};

const DMAuthProvider = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const directMessages = useFriendStore((state) => state.directMessages);

  const updateDirectMessages = useFriendStore((state) => {
    return state.updateDirectMessages;
  });

  const handleGetDirectMessagesFromDB = async (userEmail: string) => {
    const res = await getAllDirectMessagesByEmail(userEmail);
    if (res?.message === "Get direct messages successfully") {
      if (res?.friends) updateDirectMessages(res?.friends);
    }
  };

  useEffect(() => {
    if (!session?.user || directMessages?.length === 0) {
      router.push("/dashboard/friends");
    }

    if (session?.user || directMessages?.length !== 0) {
      const friendId = pathName.split("/dashboard/friends/messages/")[1];

      if (friendId !== undefined) {
        const checkExist = directMessages?.filter((user) => {
          return user.id === friendId;
        });

        if (checkExist?.length === 0) {
          router.push("/dashboard/friends");
          if (session?.user?.email)
            handleGetDirectMessagesFromDB(session?.user?.email);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, directMessages, router]);

  if (!session?.user || directMessages?.length === 0) {
    return null; // Render nothing or a loading state until the redirect happens
  }

  return <>{children}</>;
};

export default DMAuthProvider;
