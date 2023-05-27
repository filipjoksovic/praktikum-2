import {error} from 'console';
import {LocalStorageService} from './LocalStorageService';
import {Environment} from '../environment';
import {IFamily} from '../models/IFamily';

export class FamilyService {
  public static async createFamily(familyCreationRequest: IFamily) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not loggedIn');
    }
    console.log('[createFamily] sending request', familyCreationRequest);
    return await fetch(`${Environment.BACKEND_URL}/families/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(familyCreationRequest),
    })
      .then(response => {
        if (response.ok) {
          const res = response.json();
          return res;
        }
        throw new Error('Error occured when creating family');
      })
      .then(response => response as IFamily);
  }
  public static async getFamilyForUser() {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }
    // if (!user.familyId) {
    //   console.log('user has no family');
    //   return null;
    // }
    console.log(user.familyId);
    return await fetch(`${Environment.BACKEND_URL}/families/user/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('getFamilyForUser failed');
        }
      })
      .then(response => {
        return response as IFamily;
      });
  }
}
