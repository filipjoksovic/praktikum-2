import {Environment} from '../environment';
import {LocalStorageService} from './LocalStorageService';
import {
  IShoppingListResponse,
  IShoppingListsResponse,
  IShoppingListsResponseshoppingList,
} from '../models/IShoppingListsResponseDTO';
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

export interface IPromptRequest {
  text: string;
}

export class ShoppingListService {
  static async deleteList(listId: string) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }
    return await fetch(`${Environment.BACKEND_URL}/shoppingLists/${listId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while checking off list');
      }
    });
  }
  static async deleteListItem(listId: string, itemId: string) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }
    console.log('here');
    console.log(`${Environment.BACKEND_URL}/shoppingLists/${listId}/${itemId}`);
    return await fetch(
      `${Environment.BACKEND_URL}/shoppingLists/${user.id}/${listId}/${itemId}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    ).then(response => {
      if (response.ok) {
        return '{}';
      } else {
        throw new Error('Error while deleting listitem');
      }
    });
  }
  public static async createRequest(promptRequest: IPromptRequest) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('No user logged in');
    }
    return await fetch(`${Environment.BACKEND_URL}/uploads/text`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(promptRequest),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log('Error in createTranscript: ', error);
      });
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
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (user) {
      return await fetch(
        `${Environment.BACKEND_URL}/shoppingLists/user/${user.id}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(data),
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
        });
    }
  }

  public static async getShoppingLists(): Promise<IShoppingListsResponse> {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      console.error('No user logged in');
      return [];
    }
    console.log(
      `Sending a request at: ${Environment.BACKEND_URL}/shoppingLists/user/${user.id}`,
    );
    return await fetch(
      `${Environment.BACKEND_URL}/shoppingLists/user/${user.id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then(response => response.json())
      .then(response => response as IShoppingListsResponse);
  }
  public static async checkOffList(
    listId: string,
  ): Promise<IShoppingListResponse> {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }
    return await fetch(
      `${Environment.BACKEND_URL}/shoppingLists/${listId}/completeList`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    ).then(response => {
      if (response.ok) {
        return response.json() as Promise<IShoppingListResponse>;
      } else {
        throw new Error('Error while checking off list');
      }
    });
  }
  public static async checkOffListItem(
    listId: string,
    itemId: string,
  ): Promise<IShoppingListResponse> {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      throw new Error('User not logged in');
    }
    console.log('here');
    console.log(
      `${Environment.BACKEND_URL}/shoppingLists/${listId}/${itemId}/completeItem`,
    );
    return await fetch(
      `${Environment.BACKEND_URL}/shoppingLists/${listId}/${itemId}/completeItem`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      },
    ).then(response => {
      if (response.ok) {
        return response.json() as Promise<IShoppingListResponse>;
      } else {
        throw new Error('Error while checking off list');
      }
    });
  }
}
