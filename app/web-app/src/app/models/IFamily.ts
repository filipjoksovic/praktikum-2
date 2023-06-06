import {User} from './User';

export interface IFamily {
  id?: string;
  name: string;
  owner: User;
  users?: User[];
  inviteCode: string;
}
