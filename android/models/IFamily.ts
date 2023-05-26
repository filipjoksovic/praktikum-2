import {User} from './User';

export interface IFamily {
  id?: string;
  name: string;
  users?: User[];
  inviteCode: string;
}
