export function concatFriendsNames(friends): string {
  return friends.map((f) => f.name).join(", ");
}
