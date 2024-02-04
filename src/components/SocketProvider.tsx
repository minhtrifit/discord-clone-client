"use client";

import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import { useSocketStore } from "@/lib/store";

import { GetSocketConntect, StartListeners } from "@/lib/socket";

type Props = {
  children?: React.ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  const { data: session }: any = useSession();

  const socket = useSocket(process.env.NEXT_PUBLIC_API_URL!, {
    autoConnect: false,
  });

  const updateSocket = useSocketStore((state) => state.updateSocket);

  // Socket event
  useEffect(() => {
    socket.connect();
    updateSocket(socket);

    if (session?.user) {
      // Listen event to socket
      StartListeners(socket);

      // Send event to socket
      GetSocketConntect(socket, session?.user?.email);
      //   GetAllUsers(socket);
    }

    // eslint-disable-next-line
  }, [session?.user]);

  return <>{children}</>;
};

export default SocketProvider;
