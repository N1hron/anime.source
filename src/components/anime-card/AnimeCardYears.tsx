import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function AnimeCardYears({ aired }: Pick<Anime, "aired">) {
  const yearFrom = aired.prop.from.year;

  if (!yearFrom) return null;

  const yearTo = aired.prop.to.year;
  const years = yearFrom + (yearTo && yearFrom !== yearTo ? "-" + yearTo : "");

  return <p className={styles.years}>{years}</p>;
}
