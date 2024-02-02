export interface ServerType {
  id?: number | null; // null is for direct messages server
  name?: string;
  owner?: number; // userId
  avatar?: string;
}

export interface UserType {
  name?: string;
  email?: string;
  password?: string | null;
  avatar?: string | null;
  provider?: string;
  created?: Date;
}
