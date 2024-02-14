import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Socket } from "socket.io-client";

import {
  CategoryType,
  ChannelType,
  DirectMessageChatType,
  ServerType,
  UserType,
  ChannelMessageChatType,
} from "@/types";

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
  loading: boolean;
  directMessages: UserType[];
  chats: DirectMessageChatType[];
  userProfileToggle: boolean;
  setPendings: (user: UserType) => void;
  updatePendings: (newPendings: UserType[]) => void;
  updateFriends: (newFriends: UserType[]) => void;
  setOnlines: (user: UserType) => void;
  filterOnlines: (user: UserType) => void;
  updateOnlines: (newOnlines: UserType[]) => void;
  setLoading: (value: boolean) => void;
  setDirectMessages: (newFriend: UserType) => void;
  updateDirectMessages: (newDirectMessages: UserType[]) => void;
  filterDirectMessages: (newFriend: UserType) => void;
  setChats: (chat: DirectMessageChatType) => void;
  updateChats: (newChats: DirectMessageChatType[]) => void;
  setUserProfileToggle: () => void;
}

interface ServerState {
  server: ServerType | null;
  loading: boolean;
  categories: CategoryType[];
  channel: ChannelType | null;
  channelChats: ChannelMessageChatType[];
  setServer: (server: ServerType) => void;
  setLoading: (value: boolean) => void;
  updateCategories: (categories: CategoryType[]) => void;
  setChannel: (newChannel: ChannelType) => void;
  updateChannelChats: (channelChats: ChannelMessageChatType[]) => void;
  setChannelChats: (chat: ChannelMessageChatType) => void;
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
    loading: false,
    directMessages: [],
    chats: [],
    userProfileToggle: true,
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
    setLoading: (value: boolean) => set(() => ({ loading: value })),
    setDirectMessages: (user: UserType) =>
      set((state) => ({ directMessages: [...state.directMessages, user] })),
    updateDirectMessages: (newDirectMessages: UserType[]) =>
      set(() => ({ directMessages: newDirectMessages })),
    filterDirectMessages: (user: UserType) =>
      set((state) => ({
        directMessages: state.directMessages.filter((u) => {
          return u.email !== user.email;
        }),
      })),
    setChats: (chat: DirectMessageChatType) =>
      set((state) => ({ chats: [...state.chats, chat] })),
    updateChats: (newChats: DirectMessageChatType[]) =>
      set(() => ({ chats: newChats })),
    setUserProfileToggle: () =>
      set((state) => ({ userProfileToggle: !state.userProfileToggle })),
  }))
);

export const useServerStore = create<ServerState>()(
  devtools((set) => ({
    server: null,
    loading: false,
    categories: [],
    channel: null,
    channelChats: [],
    setServer: (server: ServerType) => set((state) => ({ server: server })),
    setLoading: (value: boolean) => set((state) => ({ loading: value })),
    updateCategories: (newCategories: CategoryType[]) =>
      set(() => ({ categories: newCategories })),
    setChannel: (newChannel: ChannelType) =>
      set((state) => ({ channel: newChannel })),
    updateChannelChats: (channelChats: ChannelMessageChatType[]) =>
      set(() => ({ channelChats: channelChats })),
    setChannelChats: (chat: ChannelMessageChatType) =>
      set((state) => ({ channelChats: [...state.channelChats, chat] })),
  }))
);
