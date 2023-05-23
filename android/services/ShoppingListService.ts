import {Environment} from '../environment';
import {LocalStorageService} from './LocalStorageService';
import {IShoppingListsResponseDTO} from '../models/IShoppingListsResponseDTO';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export interface IPromptRequest {
  text: string;
}

export class ShoppingListService {
  public static async createRequest(promptRequest: IPromptRequest) {
    //TESTING ONLY! REPLACE WITH LOCAL STORAGE LATER!
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZW5pQHRlc3QuY29tIiwiaWF0IjoxNjg0ODY3NTMzLCJleHAiOjE2ODQ5Njc1MzN9.Lh5CudKARX-yP8ukaFIUu6trVEl1RP1kdkDAdt1okFo";
    console.log(promptRequest);
    return await fetch(`${Environment.BACKEND_URL}/uploads/text`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(promptRequest),
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
    })
    .catch((error) => {
      console.log('Error in createTranscript: ', error);
    });
  }

  public static async createTranscriptRequest(path: string){

    //TESTING ONLY! REPLACE WITH LOCAL STORAGE LATER!
    const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZW5pQHRlc3QuY29tIiwiaWF0IjoxNjg0ODY3NTMzLCJleHAiOjE2ODQ5Njc1MzN9.Lh5CudKARX-yP8ukaFIUu6trVEl1RP1kdkDAdt1okFo";
    console.log(path);
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
        Authorization: token,
      },
      body: data,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.transcript;
    })
    .catch((error) => {
      console.log('Error in createTranscriptRequest: ', error);
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
