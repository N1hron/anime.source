import { useMemo } from "react";

import { extractAnimeTitle } from "@/utils/extractAnimeTitle";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function Titles({ titles }: Pick<Anime, "titles">) {
  const { defaultTitle, englishTitle } = useMemo(
    () => ({
      defaultTitle: extractAnimeTitle(titles, "Default"),
      englishTitle: extractAnimeTitle(titles, "English"),
    }),
    [titles]
  );

  return (
    <div className={styles.titles}>
      {defaultTitle && (
        <h3 className={styles.defaultTitle} title={defaultTitle}>
          {defaultTitle}
        </h3>
      )}
      {englishTitle && (
        <p className={styles.englishTitle} title={englishTitle}>
          {englishTitle}
        </p>
      )}
    </div>
  );
}
