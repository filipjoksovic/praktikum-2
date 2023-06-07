export function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i <= 8; i++) {
    if (i === 4) {
      randomString += '-';
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
  }

  return randomString;
}

export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRem = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(secondsRem).padStart(2, '0');

  return formattedMinutes + ':' + formattedSeconds;
}
