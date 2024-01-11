import { formatDistanceToNow } from "date-fns"

export const getTimeFromNow = (data: number) => `${formatDistanceToNow(data)} ago`;
