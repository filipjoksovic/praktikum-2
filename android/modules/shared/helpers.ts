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
