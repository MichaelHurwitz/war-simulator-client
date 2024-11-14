import { Status } from "./status";

export interface Missile {
    id: string;
    name: string;
    price: number;
  }
  
  export interface UserMissile extends Missile {}
  
  export interface MissileState {
    items: Missile[];
    userMissiles: UserMissile[];
    status: Status;
    error: string | null;
  }
  