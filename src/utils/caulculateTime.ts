import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function timeAgo(timestamp: number): string {
  return dayjs.unix(timestamp).fromNow();
}
