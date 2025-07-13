import { getCurrentTime } from "./getCurrentTime";

export function getDifferenceInHours(timezone1: string, timezone2?: string) {
  const { day: ld, hours: lh } = getCurrentTime(timezone1);
  const { day: td, hours: th } = getCurrentTime(timezone2);

  return lh - (24 * (td - ld) + th);
}
