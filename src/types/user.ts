import { Status } from "./status";

export interface Missile {
  name: string;
  amount: number;
}

export interface User {
  id: string;
  username: string;
  organization: string;
  region?: string;
  missiles: Missile[];
}

export interface UserState {
  user: User | null;
  token: string | null;
  status: Status;
  error: string | null;
}
