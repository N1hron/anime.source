import clsx from "clsx";

import { getDifferenceInHours } from "@/utils/getDifferenceInHours";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

type AnimeCardStatusProps = Pick<Anime, "status" | "type" | "aired" | "broadcast">;

export function AnimeCardStatus({ status, type, aired, broadcast }: AnimeCardStatusProps) {
  if (!status) return null;

  const cl = clsx(
    styles.status,
    status === "Currently Airing" && styles.airing,
    status === "Not yet aired" && styles.notAired
  );
  const { text, timezone } = getAnimeStatus(status, type, aired, broadcast);

  return (
    <p className={cl}>
      {text} {timezone && <span className={styles.timezone}>({timezone})</span>}
    </p>
  );
}

function getAnimeStatus(
  status: NonNullable<Anime["status"]>,
  type: Anime["type"],
  aired: Anime["aired"],
  broadcast: Anime["broadcast"]
) {
  const isTV =
    type === "TV" || (aired.from && aired.to && aired.from !== aired.to) || broadcast.string;
  const time = broadcast.time;
  const timezone = broadcast.timezone;
  const dateFrom = aired.from;
  const dateTo = aired.to;

  let statusText: string = status;
  let statusTimezone: string | null = timezone || "Asia/Tokyo";

  switch (status) {
    case "Currently Airing":
      if (dateFrom && time && timezone) {
        statusText = "Each " + formatBroadcastDate(dateFrom, time, timezone);
        statusTimezone = "Your time";
      } else {
        statusText = status;
        statusTimezone = null;
      }

      break;
    case "Finished Airing": {
      const dateString = dateTo || dateFrom;
      const prefix = isTV ? "Finished" : "Released";

      if (dateString) {
        statusText = prefix + " on " + formatDate(dateString, time, timezone, false);

        if (time && timezone) {
          statusTimezone = "Your time";
        }
      } else {
        statusText = prefix;
        statusTimezone = null;
      }

      break;
    }
    case "Not yet aired": {
      const prefix = isTV ? "Starts on " : "Releases on ";
      const month = aired.prop.from.month;
      const day = aired.prop.from.day;
      const isOnlyYear = month && day && month === 1 && day === 1;

      if (dateFrom && !isOnlyYear) {
        statusText = prefix + formatDate(dateFrom, time, timezone);

        if (time && timezone) {
          statusTimezone = "Your time";
        }
      } else {
        statusText = "Announced";
        statusTimezone = null;
      }
    }
  }

  return { text: statusText, timezone: statusTimezone };
}

function formatBroadcastDate(dateString: string, time: string, timezone: string) {
  const localDateString = replaceDateTime(replaceDateTimezoneOffset(dateString, timezone), time);

  const formatter = Intl.DateTimeFormat("en-US", {
    hour12: false,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(new Date(localDateString)).split(" ").join(", at ");
}

function formatDate(
  dateString: string,
  time: string | null,
  timezone: string | null,
  includeTime: boolean = true
) {
  const isLocal = time && timezone;
  let date: Date;

  if (isLocal) {
    const localDateString = replaceDateTime(replaceDateTimezoneOffset(dateString, timezone), time);
    date = new Date(localDateString);
  } else {
    date = new Date(dateString);
  }

  const formatter = Intl.DateTimeFormat("en-US", {
    hour12: false,
    month: "short",
    day: "numeric",
    hour: isLocal && includeTime ? "2-digit" : undefined,
    minute: isLocal && includeTime ? "2-digit" : undefined,
  });

  return formatter.format(date);
}

function replaceDateTime(dateString: string, time: string) {
  return dateString.replace(/\d\d:\d\d/, time);
}

const timezoneOffsetCache: Record<string, number> = {};

function replaceDateTimezoneOffset(dateString: string, timezone: string) {
  if (timezoneOffsetCache[timezone] === undefined) {
    timezoneOffsetCache[timezone] = getDifferenceInHours(timezone, "UTC");
  }

  const offset = timezoneOffsetCache[timezone];
  const sign = offset < 0 ? "-" : "+";
  const offsetString = sign + String(Math.abs(offset)).padStart(2, "0");

  return dateString.replace(/\+\d\d/, offsetString);
}
