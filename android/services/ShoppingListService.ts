import {Environment} from '../environment';
import {LocalStorageService} from './LocalStorageService';
import {
  IShoppingListResponse,
  IShoppingListsResponse,
  IShoppingListsResponseshoppingList,
} from '../models/IShoppingListsResponseDTO';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {makeRequest} from '../modules/shared/helpers';

export interface IPromptRequest {
  text: string;
}

export class ShoppingListService {
  static async addListItems(id: string, summary: string) {
    try {
      return await makeRequest(`shoppingLists/${id}/items`, 'post', {
        items: summary,
      });
    } catch (e) {
      console.error(e);
    }
  }
  static async deleteList(listId: string) {
    try {
      return await makeRequest(`shoppingLists/${listId}`, 'delete');
    } catch (err) {
      console.log('Error at deleteList, ', err);
    }
  }
  static async deleteListItem(listId: string, itemId: string) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        return;
      }
      return await makeRequest(
        `shoppingLists/${user.id}/${listId}/${itemId}`,
        'delete',
      );
    } catch (err) {
      console.log('Error at deleteListItem', err);
    }
  }
  public static async createRequest(promptRequest: IPromptRequest) {
    try {
      return await makeRequest('uploads/text', 'post', promptRequest);
    } catch (err) {
      console.log('Error at createRequest', err);
    }
  }

  public static async createTranscriptRequest(path: string) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('No user logged in');
    }
    const data = new FormData();
    const file = {
      uri: path,
      type: 'audio/wav',
      name: 'my-file.wav',
    };
    console.log(file);
    data.append('file', file);
    return await fetch(`${Environment.BACKEND_URL}/uploads/wav`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data.transcript;
      })
      .catch(error => {
        console.log('Error in createTranscriptRequest: ', error);
      });
  }

  public static async createList(data: {name: string; items: string[]}) {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not defined');
      }
      return await makeRequest(`shoppingLists/user/${user.id}`, 'post', data);
    } catch (err) {
      console.log('Error at createList', err);
    }
  }

  public static async getShoppingLists(): Promise<IShoppingListsResponse> {
    try {
      const user = await LocalStorageService.getUserFromLocalStorage();
      if (!user) {
        throw new Error('User not defined');
      }
      return await makeRequest(`shoppingLists/user/${user.id}`, 'get');
    } catch (err) {
      console.log('Error at getShoppingLists', err);
    }
  }
  public static async completeList(listId: string) {
    try {
      return await makeRequest(`shoppingLists/${listId}/completeList`, 'put');
    } catch (err) {
      console.log('Error at completeList', this.completeList);
    }
  }
  public static async checkOffListItem(listId: string, itemId: string) {
    try {
      return await makeRequest(
        `shoppingLists/${listId}/${itemId}/completeItem`,
        'put',
      );
    } catch (err) {
      console.error('Error at checkoffListItem', err);
    }
  }
}
