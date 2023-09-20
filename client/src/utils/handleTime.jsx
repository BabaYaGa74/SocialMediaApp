export function handleTime(createdAt) {
  const createdTime = new Date(createdAt);
  const now = new Date();
  const diffInMilliseconds = now - createdTime;

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;

  if (diffInMilliseconds < minutesInMs) {
    return Math.floor(diffInMilliseconds / secondsInMs) + " seconds ago";
  } else if (diffInMilliseconds < hoursInMs) {
    return Math.floor(diffInMilliseconds / minutesInMs) + " min ago";
  } else if (diffInMilliseconds < daysInMs) {
    const time = Math.floor(diffInMilliseconds / hoursInMs);
    return time > 1 ? time + " hours ago" : time + " hour ago";
  } else {
    const time = Math.floor(diffInMilliseconds / daysInMs);
    return time > 1 ? time + " days ago" : time + " day ago";
  }
}
