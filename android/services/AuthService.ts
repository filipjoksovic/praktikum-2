import {UserAuthDTO} from '../models/UserAuthDTO';
import {ApiError} from '../models/ApiError';
import {User} from '../models/User';
import {Environment} from '../environment';
import {LocalStorageService} from './LocalStorageService';

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
      .then(async (user: User) => {
        if (!isUser(user)) {
          console.log('Problem', user);
          throw new Error((user as ApiError).message);
        }
        await LocalStorageService.saveUserToLocalStorage(user).then();
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

  static async checkIfExists() {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      return;
    }
    return await fetch(`${Environment.BACKEND_URL}/auth/doesExist/${user.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('User does not exist');
    });
  }

  static async setupAccount(param: {
    firstName: string;
    lastName: string;
    dob: Date;
  }) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }

    return await fetch(`${Environment.BACKEND_URL}/users/account`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...param, id: user.id}),
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Account setup failed');
    });
  }
}
