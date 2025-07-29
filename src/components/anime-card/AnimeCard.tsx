import { memo, useMemo } from "react";

import { Image } from "../image/Image";
import { AnimeCardTitles } from "./AnimeCardTitles";
import { AnimeCardEpisodes } from "./AnimeCardEpisodes";
import { AnimeCardYears } from "./AnimeCardYears";
import { AnimeCardStatus } from "./AnimeCardStatus";
import { AnimeCardPin } from "./AnimeCardPin";
import type { AnimeShort } from "@/types/api/anime";

import styles from "./style.module.css";
import { extractAnimeTitle } from "@/utils/extractAnimeTitle";

function AnimeCardInner({
  mal_id,
  images,
  titles,
  episodes,
  aired,
  status,
  type,
  broadcast,
  season,
}: AnimeShort) {
  const imageSrc = images.webp.image_url || undefined;

  const { mainTitle, englishTitle } = useMemo(
    () => ({
      mainTitle: extractAnimeTitle(titles, "Default"),
      englishTitle: extractAnimeTitle(titles, "English"),
    }),
    [titles]
  );

  const yearFrom = aired.prop.from.year;
  const yearTo = aired.prop.to.year;

  return (
    <article className={styles.animeCard}>
      <Image className={styles.poster} src={imageSrc} alt="Poster" />
      <div className={styles.info}>
        <AnimeCardTitles main={mainTitle} english={englishTitle} />
        <div className={styles.infoRow}>
          <AnimeCardEpisodes amount={episodes} />
          <AnimeCardYears from={yearFrom} to={yearTo} />
        </div>
        <div className={styles.infoRow}>
          <AnimeCardStatus
            status={status}
            type={type}
            aired={aired}
            broadcast={broadcast}
            season={season}
          />
          {type && <p className={styles.type}>{type}</p>}
        </div>
      </div>
      <AnimeCardPin mal_id={mal_id} />
    </article>
  );
}

export const AnimeCard = memo(AnimeCardInner);
