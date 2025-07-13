import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function AnimeCardEpisodes({ episodes }: Pick<Anime, "episodes">) {
  if (!episodes) return null;
  return (
    <p className={styles.episodes}>
      {episodes} {episodes === 1 ? "episode" : "episodes"}
    </p>
  );
}
