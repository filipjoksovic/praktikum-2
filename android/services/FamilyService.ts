import {error} from 'console';
import {LocalStorageService} from './LocalStorageService';
import {Environment} from '../environment';
import {IFamily} from '../models/IFamily';
import {makeRequest} from '../modules/shared/helpers';

export class FamilyService {
  public static async createFamily(familyCreationRequest: IFamily) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User does not exist');
      }
      return await makeRequest(
        `families/${user.id}`,
        'post',
        familyCreationRequest,
      );
    } catch (err) {
      console.error('createFamily error,', err);
    }
  }
  public static async getFamilyForUser() {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      return await makeRequest(`families/user/${user.id}`, 'get');
    } catch (err) {
      console.error('getFamilyForUser error', err);
    }
  }
}
