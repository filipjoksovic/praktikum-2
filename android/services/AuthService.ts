import {UserAuthDTO} from '../models/UserAuthDTO';
import {ApiError} from '../models/ApiError';
import {User} from '../models/User';
import {Environment} from '../environment';
import {LocalStorageService} from './LocalStorageService';
import {makeRequest} from '../modules/shared/helpers';

export const isUser = (obj: User): obj is User => {
  return (obj as User).id !== undefined;
};

export class AuthService {
  public static async login(authRequest: UserAuthDTO): Promise<any> {
    try {
      const user = await makeRequest('auth/login', 'post', authRequest, false);
      if (!isUser(user)) {
        throw new Error((user as ApiError).message);
      }
      await LocalStorageService.saveUserToLocalStorage(user);
      return user;
    } catch (err) {
      console.log('Error at login', err);
    }
  }

  public static async register(authRequest: UserAuthDTO) {
    try {
      return await makeRequest('auth/register', 'post', authRequest, false);
    } catch (err) {
      console.log('Error at register, ', err);
    }
  }

  static async checkIfExists() {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('No user logged in');
      return;
    }
    return await fetch(`${Environment.BACKEND_URL}/auth/doesExist/${user.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        const json = response.json();
        console.log(json);
        return json;
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

  static async logout() {
    await LocalStorageService.removeUserFromLocalStorage();
  }

  static async getUser() {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      return makeRequest(`users/${user.id}`, 'get');
    } catch (err) {
      console.log('Error at getUser, ', err);
    }
  }

  static async updateUser(updatedUser: User | null) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      return makeRequest('users/account', 'put', {
        firstName: updatedUser?.name,
        lastName: updatedUser?.surname,
        id: user.id,
      });
    } catch (err) {
      console.log('Error at updateUser, ', err);
    }
  }
}
