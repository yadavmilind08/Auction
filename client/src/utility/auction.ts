import { AUCTION_ENDED } from "../constants";

export const calculateTimeDifference = (endDate: string): string => {
  const now = new Date();
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const differenceInMs = end.getTime() - now.getTime();

  // Check if the end date is in the past
  if (differenceInMs < 0) {
    return AUCTION_ENDED;
  }

  // Calculate the difference in each unit
  const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(
    (differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return parts.join(" ");
};
