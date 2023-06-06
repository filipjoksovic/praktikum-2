import {error} from 'console';
import {LocalStorageService} from './LocalStorageService';
import {Environment} from '../environment';
import {IFamily} from '../models/IFamily';
import {makeRequest} from '../modules/shared/helpers';
import {name} from 'axios';

export class FamilyService {
  static async getFamilyMembers() {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('No user present');
      }
      if (!user.familyId) {
        throw new Error('User has no family');
      }
      return await makeRequest(`families/${user.familyId}/members`, 'get');
    } catch (e) {
      console.error('getFamilyMembers FamilyService fail', e);
    }
  }
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

  static async updateFamily(
    id: string,
    familyData: {inviteCode: string; name: string},
  ) {
    try {
      await makeRequest(`families/${id}`, 'put', {name: familyData.name});
      await makeRequest(`families/${id}/code`, 'post', {
        code: familyData.inviteCode,
      });
    } catch (err) {
      console.error('updateFamily error', err);
    }
  }
  public static async getFamilyJoinRequests() {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      return await makeRequest(`joinRequests/${user.familyId}`, 'get');
    } catch (err: any) {
      console.error('getFamilyJoinRequests error', err.message);
    }
  }
  public static async denyFamilyJoinRequest(requestJoinId: string) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      return await makeRequest(
        `joinRequests/${requestJoinId}/reject`,
        'post',
      );
    } catch (err: any) {
      console.error('approveFamilyJoinRequest error', err.message);
    }
  }
  public static async approveFamilyJoinRequest(requestJoinId: string) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      return await makeRequest(
        `joinRequests/${requestJoinId}/accept`,
        'post',
      );
    } catch (err: any) {
      console.error('approveFamilyJoinRequest error', err.message);
    }
  }
  public static async sendJoinRequest(inviteCode: string) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not logged in');
      }
      console.log(inviteCode);
      console.log(user.id);
      return await makeRequest(
        `joinRequests/${user.id}/${inviteCode}`,
        'post',
      );
    } catch (err: any) {
      console.error('sendJoinRequest error', err.message);
    }
  }
}
