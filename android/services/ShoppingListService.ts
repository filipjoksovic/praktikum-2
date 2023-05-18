import {Environment} from '../environment';
import {User} from '../models/User';
import {ApiError} from '../models/ApiError';
import {isUser} from './AuthService';

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
}
