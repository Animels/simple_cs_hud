export default function secondsToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${Math.floor(remainingSeconds)}`
      : `${Math.floor(remainingSeconds)}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}
