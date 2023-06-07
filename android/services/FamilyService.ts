import {error} from 'console';
import {LocalStorageService} from './LocalStorageService';
import {Environment} from '../environment';
import {IFamily} from '../models/IFamily';
import {makeRequest} from '../modules/shared/helpers';
import {name} from 'axios';
import {IFamilyMember} from '../models/IFamilyMember';

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

  static async removeFamilyMember(member: IFamilyMember) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }
    try {
      await makeRequest(
        `families/${user.familyId}/${member.id}/remove`,
        'delete',
      );
    } catch (err) {
      console.error('removeFamilyMember error', err);
    }
  }
}
