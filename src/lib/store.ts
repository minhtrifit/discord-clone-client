import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Socket } from "socket.io-client";

import { UserType } from "@/types";

interface SocketState {
  socket: Socket | null;
  clientId: string;
  updateSocket: (socketClient: Socket) => void;
  updateClientId: (clientId: string) => void;
  removeSocket: () => void;
}

interface FriendState {
  pendings: UserType[];
  setPendings: (user: UserType) => void;
  updatePendings: (newPendings: UserType[]) => void;
}

export const useSocketStore = create<SocketState>()(
  devtools((set) => ({
    socket: null,
    clientId: "",
    updateSocket: (socketClient) => set({ socket: socketClient }),
    updateClientId: (clientId) => set({ clientId: clientId }),
    removeSocket: () => set({ socket: null }),
  }))
);

export const useFriendStore = create<FriendState>()(
  devtools((set) => ({
    pendings: [],
    setPendings: (user: UserType) =>
      set((state) => ({ pendings: [...state.pendings, user] })),
    updatePendings: (newPendings: UserType[]) =>
      set(() => ({ pendings: newPendings })),
  }))
);
