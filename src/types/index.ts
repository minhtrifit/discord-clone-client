export interface ServerType {
  id?: number | string | null; // null is for direct messages server
  name?: string;
  owner?: UserType; // userId
  avatar?: string | null;
  created?: string;
  members?: UserType[];
  categories?: CategoryType[];
  channels?: ChannelType[];
  totalMembers?: number;
  totalCategories?: number;
  totalChannels?: number;
}

export interface UserType {
  id?: string;
  name?: string;
  email?: string;
  password?: string | null;
  avatar?: string | null;
  provider?: string;
  created?: Date | string;
  isAdmin?: boolean;
}

export interface DirectMessageChatType {
  id?: string;
  user: UserType | any;
  userId?: string;
  friendId?: string;
  text: string;
  type?: string;
  provider?: string;
  url?: string;
  fileName?: string;
  sended?: string;
}

export interface CategoryType {
  id?: string;
  serverId?: string;
  name?: string;
  channels?: ChannelType[];
  created?: string;
}

export interface ChannelType {
  id?: string;
  categoryId?: string;
  name?: string;
  type?: "text" | "voice";
  created?: string;
}

export interface ChannelMessageChatType {
  id?: string;
  user: UserType | any;
  serverId?: string;
  channelId?: string;
  text: string;
  type?: string;
  provider?: string;
  url?: string;
  fileName?: string;
  sended?: string;
}
