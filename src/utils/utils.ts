import moment from "moment";

export function shortDateFormat(date: Date) {
  return moment(date).format("Do-MMM");
}

export function longDateFormat(date: Date) {
  return moment(date).format("h:mm a Do-MMM-YYYY");
}

export function createToast(
  title: string,
  status: "success" | "error",
  description = ""
) {
  return {
    title,
    position: "bottom",
    description,
    status,
    duration: 2000,
    isClosable: true,
  };
}
