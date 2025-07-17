import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function Episodes({ episodes }: Pick<Anime, "episodes">) {
  if (episodes) {
    return (
      <p className={styles.episodes}>
        {episodes} {episodes === 1 ? "episode" : "episodes"}
      </p>
    );
  }
}
