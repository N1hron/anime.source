import clsx from "clsx";
import { useMemo } from "react";

import { getDifferenceInHours } from "@/utils/getDifferenceInHours";
import { TOKYO_TIMEZONE_NAME } from "@/constants";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

type StatusProps = Pick<Anime, "status" | "type" | "aired" | "broadcast" | "season">;

export function Status({ status, type, aired, broadcast, season }: StatusProps) {
  const { text, hasDate } = useMemo(() => {
    if (status) {
      return getAnimeStatus(status, type, aired, broadcast, season);
    } else {
      return { text: "", hasDate: false };
    }
  }, []);

  if (!text) return null;

  const cl = clsx(
    styles.status,
    status === "Currently Airing" && styles.airing,
    status === "Not yet aired" && styles.notAired
  );

  return (
    <p className={cl}>
      {text}{" "}
      {hasDate && (
        <>
          <span className={styles.timezone}>{TOKYO_TIMEZONE_NAME}</span>
          <span className={styles.timezoneMini}>JST</span>
        </>
      )}
    </p>
  );
}

function getAnimeStatus(
  status: NonNullable<Anime["status"]>,
  type: Anime["type"],
  aired: Anime["aired"],
  broadcast: Anime["broadcast"],
  season: Anime["season"]
): {
  text: string;
  hasDate: boolean;
} {
  const isTV =
    type === "TV" || (aired.from && aired.to && aired.from !== aired.to) || broadcast.string;

  const time = broadcast.time;
  const dateFrom = aired.from;
  const dateTo = aired.to;

  let text: string = status;
  let hasDate: boolean = false;

  switch (status) {
    case "Currently Airing": {
      const formattedBroadcast = formatBroadcast(broadcast);

      if (formattedBroadcast) {
        text = `Each ${formattedBroadcast}`;
        hasDate = true;
      }

      break;
    }
    case "Finished Airing": {
      const prefix = isTV ? "Finished" : "Released";
      const dateString = dateTo || dateFrom;

      if (dateString) {
        const date = createTokyoDateFromUTC(dateString, time);
        const formattedDate = formatTokyoDate(date);

        text = `${prefix} on ${formattedDate}`;
        hasDate = true;
      } else {
        text = prefix;
      }

      break;
    }
    case "Not yet aired": {
      const prefix = isTV ? "Starts on " : "Releases on ";

      const year = aired.prop.from.year;
      const month = aired.prop.from.month;
      const day = aired.prop.from.day;
      const isOnlyYear = year && month && day && month === 1 && day === 1 && !season;

      if (dateFrom && !isOnlyYear) {
        const date = createTokyoDateFromUTC(dateFrom, time);
        const formattedDate = formatTokyoDate(date, !!time);

        text = prefix + formattedDate;
        hasDate = true;
      } else {
        text = "Announced";
      }
    }
  }

  return { text, hasDate };
}

function formatBroadcast(broadcast: Anime["broadcast"]) {
  if (!(broadcast.day && broadcast.time)) {
    return null;
  }

  const day = broadcast.day.replace(/s$/, "");
  const time = broadcast.time;

  return `${day}, at ${time}`;
}

function formatTokyoDate(date: Date, includeTime?: boolean) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TOKYO_TIMEZONE_NAME,
    month: "short",
    day: "numeric",
    hour: includeTime ? "2-digit" : undefined,
    hour12: false,
    minute: includeTime ? "2-digit" : undefined,
  });

  return formatter.format(date);
}

function createTokyoDateFromUTC(utcDateString: string, time?: string | null) {
  const offset = getDifferenceInHours(TOKYO_TIMEZONE_NAME, "UTC");
  const sign = offset < 0 ? "-" : "+";
  const offsetString = sign + String(Math.abs(offset)).padStart(2, "0");

  let tokyoDateString = utcDateString.replace(/\+\d\d/, offsetString);

  if (time) {
    tokyoDateString = tokyoDateString.replace(/\d\d:\d\d/, time);
  }

  return new Date(tokyoDateString);
}
