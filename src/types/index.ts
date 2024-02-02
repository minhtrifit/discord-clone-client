export interface ServerType {
  id?: number | string | null; // null is for direct messages server
  name?: string;
  owner?: number; // userId
  avatar?: string | null;
  created?: string;
}

export interface UserType {
  id?: string;
  name?: string;
  email?: string;
  password?: string | null;
  avatar?: string | null;
  provider?: string;
  created?: Date;
}
