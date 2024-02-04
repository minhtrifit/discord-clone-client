import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  clientId: string;
  updateSocket: (socketClient: Socket) => void;
  updateClientId: (clientId: string) => void;
  removeSocket: () => void;
}

export const useSocketStore = create<SocketState>()(
  devtools((set) => ({
    socket: null,
    clientId: "",
    updateSocket: (socketClient) => set((state) => ({ socket: socketClient })),
    updateClientId: (clientId) => set((state) => ({ clientId: clientId })),
    removeSocket: () => set((state) => ({ socket: null })),
  }))
);
