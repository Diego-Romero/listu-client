export function concatFriendsNames(friends): string {
  return friends.map((f) => f.name).join(", ");
}

export function createToast(
  title: string,
  status: "success" | "error",
  description = ""
) {
  return {
    title,
    description,
    status,
    duration: 6000,
    isClosable: true,
  };
}
