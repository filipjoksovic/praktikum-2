import {Environment} from '../environment';
import {User} from '../models/User';
import {ApiError} from '../models/ApiError';
import {isUser} from './AuthService';
import {LocalStorageService} from './LocalStorageService';

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

  public static async createList(shoppingItems: any[]) {
    const user = await LocalStorageService.getUserFromLocalStorage();
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
          body: JSON.stringify({items: shoppingItems}),
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
        });
    }
  }
}
