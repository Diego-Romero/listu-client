import moment from "moment";

export function formatDate(date: Date) {
  return moment(date).format("Do MMM YYYY")
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
    duration: 1500,
    isClosable: true,
  };
}
