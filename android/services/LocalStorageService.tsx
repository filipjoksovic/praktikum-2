import {User} from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService {
  static async setUserFamilyId(id: string) {
    try {
      const user = await this.getUserFromLocalStorage();
      if (user) {
        await this.saveUserToLocalStorage({...user, familyId: id});
      }
    } catch (err) {
      console.log('oopsie whoopsie we made a fucky wucky');
    }
  }
  public static async saveUserToLocalStorage(user: User) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error occurred:', err);
      }
    }
  }

  static async getUserFromLocalStorage() {
    try {
      const userJSON = await AsyncStorage.getItem('user');
      if (userJSON) {
        return JSON.parse(userJSON) as User;
      }
    } catch (exception) {
      console.log(exception);
    }
  }

  static async removeUserFromLocalStorage() {
    try {
      await AsyncStorage.removeItem('user');
    } catch (err) {
      if (err instanceof Error) {
        console.log('[removeUserFromLocalStorage]: Error occurred:', err);
      }
    }
  }
}
