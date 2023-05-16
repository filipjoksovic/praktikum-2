import {UserAuthDTO} from '../models/UserAuthDTO';
import {ApiError} from '../models/ApiError';
import {User} from '../models/User';
import Config from 'react-native-config';
import {Environment} from '../Environment';

export const isUser = (obj: User): obj is User => {
  return (obj as User).id !== undefined;
};

export class AuthService {
  public static async login(authRequest: UserAuthDTO): Promise<any> {
    return await fetch(`${Environment.BACKEND_URL}/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authRequest),
    })
      .then(response => response.json())
      .then((user: User) => {
        if (!isUser(user)) {
          console.log('Problem', user);
          throw new Error((user as ApiError).message);
        }
        return user;
      });
  }

  public static async register(authRequest: UserAuthDTO) {
    return await fetch(`${Environment.BACKEND_URL}/auth/register`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authRequest),
    })
      .then(response => response.json())
      .then((user: User) => {
        if (!isUser(user)) {
          console.log('Problem', user);
          throw new Error((user as ApiError).message);
        }
        return user;
      });
  }
}
