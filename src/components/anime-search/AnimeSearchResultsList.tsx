import { RevealList } from "../reveal-list/RevealList";
import { AnimeCard } from "../anime-card/AnimeCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decrementItemsUnderInputCount,
  incrementItemsUnderInputCount,
  selectInputBottom,
  selectIsItemUnderInput,
  selectIsLastItemUnderInput,
} from "@/store/slices/animeSearch";
import type { AnimeShort } from "@/types/api/anime";

import styles from "./style.module.css";

type AnimeSearchResultsListProps = {
  data: AnimeShort[];
};

export function AnimeSearchResultsList({ data }: AnimeSearchResultsListProps) {
  const inputBottom = useAppSelector(selectInputBottom);

  return (
    <RevealList
      className={styles.resultsList}
      options={{
        rootMargin: `-${inputBottom}px 0px 0px 0px`,
      }}
    >
      {data.map((item, i) => (
        <AnimeSearchResultsItem key={item.mal_id} index={i} data={item} />
      ))}
    </RevealList>
  );
}

type AnimeSearchResultsItemProps = {
  index: number;
  data: AnimeShort;
};

function AnimeSearchResultsItem({ index, data }: AnimeSearchResultsItemProps) {
  const dispatch = useAppDispatch();

  const inputBottom = useAppSelector(selectInputBottom);
  const isLastUnderInput = useAppSelector(selectIsLastItemUnderInput(index));
  const isUnderInput = useAppSelector(selectIsItemUnderInput(index));

  function onRevealChange(isRevealed: boolean, item: IntersectionObserverEntry) {
    const itemRect = item.boundingClientRect;

    if (isRevealed && inputBottom <= itemRect.top && isLastUnderInput) {
      dispatch(decrementItemsUnderInputCount());
    } else if (!isRevealed && inputBottom >= itemRect.top && !isUnderInput) {
      dispatch(incrementItemsUnderInputCount());
    }
  }

  return (
    <RevealList.Item key={data.mal_id} index={index} onRevealChange={onRevealChange}>
      <AnimeCard {...data} />
    </RevealList.Item>
  );
}
