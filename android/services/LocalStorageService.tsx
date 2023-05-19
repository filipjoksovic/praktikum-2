import {User} from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService {
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
}
