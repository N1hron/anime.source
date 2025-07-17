import { memo } from "react";

import { Titles } from "./Titles";
import { Episodes } from "./Episodes";
import { Years } from "./Years";
import { Status } from "./Status";
import { Pin } from "./Pin";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function AnimeCardInner({
  mal_id,
  titles,
  images,
  status,
  aired,
  episodes,
  type,
  broadcast,
  season,
}: Anime) {
  const imageSrc = images.webp.image_url || undefined;

  return (
    <article className={styles.animeCard}>
      <img className={styles.image} src={imageSrc} alt="" />
      <div className={styles.info}>
        <Titles titles={titles} />
        <div className={styles.rows}>
          <div className={styles.row}>
            <Episodes episodes={episodes} />
            <Years aired={aired} />
          </div>
          <div className={styles.row}>
            <Status
              status={status}
              type={type}
              aired={aired}
              broadcast={broadcast}
              season={season}
            />
            {type && <p className={styles.type}>{type}</p>}
          </div>
        </div>
      </div>
      <Pin mal_id={mal_id} />
    </article>
  );
}

export const AnimeCard = memo(AnimeCardInner);
