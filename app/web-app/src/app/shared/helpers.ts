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
