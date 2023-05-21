import {Environment} from '../environment';
import {LocalStorageService} from './LocalStorageService';
import {IShoppingListsResponseDTO} from '../models/IShoppingListsResponseDTO';

export interface IPromptRequest {
  prompt: string;
}

export class ShoppingListService {
  public static async createRequest(promptRequest: IPromptRequest) {
    promptRequest.prompt = Environment.MODEL_PROMPT + promptRequest.prompt;
    return await fetch(`${Environment.OPENAI_URL}/text-summary`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promptRequest),
    })
      .then(response => response.json())
      .then(response => {
        response.summary = response.summary.split(',');
        console.log(response);
        return response;
      });
  }

  public static async createList(data: {name: string; items: string[]}) {
    const user = await LocalStorageService.getUserFromLocalStorage();
    console.log();
    console.log('User:', user);
    if (user) {
      return await fetch(
        `${Environment.BACKEND_URL}/shoppingLists/${user.id}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Bearer: user.accessToken,
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

  public static async getShoppingLists(): Promise<IShoppingListsResponseDTO[]> {
    const user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      console.error('No user logged in');
      return [];
    }
    return await fetch(`${Environment.BACKEND_URL}/shoppingLists/${user.id}`, {
      method: 'get',
      headers: {'Content-Type': 'application/json', Bearer: user.accessToken},
    })
      .then(response => response.json())
      .then(response => response as IShoppingListsResponseDTO[]);
  }
}
