export interface ServerType {
  id?: number | null; // null is for direct messages server
  name?: string;
  owner?: number; // userId
  avatar?: string;
}
