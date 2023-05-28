import {Environment} from '../../environment';
import {LocalStorageService} from '../../services/LocalStorageService';

export function formatDuration(milliseconds: number) {
  // Convert milliseconds to seconds
  var totalSeconds = Math.floor(milliseconds / 1000);

  // Calculate minutes and remaining seconds
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  // Add leading zeros if necessary
  var formattedMinutes = String(minutes).padStart(2, '0');
  var formattedSeconds = String(seconds).padStart(2, '0');

  // Return the formatted duration
  return formattedMinutes + ':' + formattedSeconds;
}

export async function makeRequest(
  url: string,
  method: 'get' | 'delete' | 'put' | 'post',
  body: any = {},
  preAuth: boolean = true,
): Promise<any> {
  console.log(`${method} request at ${url}`);
  console.log('body:', body);
  let user = undefined;
  if (preAuth) {
    user = await LocalStorageService.getUserFromLocalStorage();
    if (!user) {
      console.log(`${method} request at ${url} FAIL`);
      throw new Error('User not logged in');
    }
  }

  return await fetch(`${Environment.BACKEND_URL}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user ? user.accessToken : ''}`,
    },
    body: JSON.stringify(body),
  }).then(async response => {
    if (response.ok) {
      const json = response.json();
      console.log(`${method} request at ${url} OK. json data: `, json);

      return json;
    }
    const fail = await response.text();
    console.log('Fail content:', fail);
    throw new Error(fail);
  });
}
