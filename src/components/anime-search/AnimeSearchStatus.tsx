import clsx from "clsx";

import LoadingIcon from "@icons/loading.svg?react";
import ErrorIcon from "@icons/error.svg?react";
import InfoIcon from "@icons/info.svg?react";

import styles from "./style.module.css";

type AnimeSearchStatusType = "loading" | "error" | "not-found";

type AnimeSearchStatusProps = {
  type: AnimeSearchStatusType;
};

export function AnimeSearchStatus({ type }: AnimeSearchStatusProps) {
  const cl = clsx(styles.status, styles[type]);

  const Icon = getStatusIcon(type);
  const text = getStatusText(type);
  const showVisibleText = type !== "loading";

  return (
    <div className={cl}>
      <Icon className={styles.statusIcon} title={!showVisibleText ? text : ""} />
      {showVisibleText && <p className={styles.statusText}>{text}</p>}
    </div>
  );
}

function getStatusIcon(type: AnimeSearchStatusType) {
  switch (type) {
    case "error":
      return ErrorIcon;
    case "loading":
      return LoadingIcon;
    default:
      return InfoIcon;
  }
}

function getStatusText(type: AnimeSearchStatusType) {
  switch (type) {
    case "error":
      return "An error occured";
    case "loading":
      return "Loading...";
    default:
      return "No results found";
  }
}
