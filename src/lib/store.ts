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
  friends: UserType[];
  onlines: UserType[];
  setPendings: (user: UserType) => void;
  updatePendings: (newPendings: UserType[]) => void;
  updateFriends: (newFriends: UserType[]) => void;
  setOnlines: (user: UserType) => void;
  filterOnlines: (user: UserType) => void;
  updateOnlines: (newOnlines: UserType[]) => void;
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
    friends: [],
    onlines: [],
    setPendings: (user: UserType) =>
      set((state) => ({ pendings: [...state.pendings, user] })),
    updatePendings: (newPendings: UserType[]) =>
      set(() => ({ pendings: newPendings })),
    updateFriends: (newFriends: UserType[]) =>
      set(() => ({ friends: newFriends })),
    setOnlines: (user: UserType) =>
      set((state) => ({ onlines: [...state.onlines, user] })),
    filterOnlines: (user: UserType) =>
      set((state) => ({
        onlines: state.onlines.filter((u) => {
          return u.email !== user.email;
        }),
      })),
    updateOnlines: (newOnlines: UserType[]) =>
      set(() => ({ onlines: newOnlines })),
  }))
);
