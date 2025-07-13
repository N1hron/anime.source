import clsx from "clsx";
import { useMemo } from "react";

import { AnimeCardEpisodes } from "./AnimeCardEpisodes";
import { AnimeCardStatus } from "./AnimeCardStatus";
import { AnimeCardPin } from "./AnimeCardPin";
import { AnimeCardYears } from "./AnimeCardYears";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsSelected, setSelectedAnime } from "@/store/slices/ui";
import { extractAnimeTitle } from "@/utils/extractAnimeTitle";
import type { Anime } from "@/types/api/anime";

import styles from "./style.module.css";

export function AnimeCard({
  mal_id,
  titles,
  images,
  status,
  aired,
  episodes,
  type,
  broadcast,
}: Anime) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) => selectIsSelected(state, mal_id));
  const cl = clsx(styles.animeCard, isSelected && styles.selected);

  const { defaultTitle, englishTitle } = useMemo(
    () => ({
      defaultTitle: extractAnimeTitle(titles, "Default")!,
      englishTitle: extractAnimeTitle(titles, "English"),
    }),
    [titles]
  );

  function handleClick() {
    if (!isSelected) {
      dispatch(setSelectedAnime(mal_id));
    }
  }

  return (
    <article className={cl} onClick={handleClick}>
      <img className={styles.poster} src={images.webp.image_url || undefined} alt="" />
      <div className={styles.content}>
        <h3 className={styles.defaultTitle}>{defaultTitle}</h3>
        {englishTitle && <p className={styles.englishTitle}>{englishTitle}</p>}
        <AnimeCardEpisodes episodes={episodes} />
        <AnimeCardYears aired={aired} />
        <div className={styles.lastRow}>
          <AnimeCardStatus status={status} type={type} aired={aired} broadcast={broadcast} />
          {type && <p className={styles.type}>{type}</p>}
        </div>
      </div>
      <AnimeCardPin mal_id={mal_id} />
    </article>
  );
}
