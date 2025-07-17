import clsx from "clsx";
import { useEffect, useRef, type RefObject } from "react";

import { AnimeCard } from "../anime-card/AnimeCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAnimeSearchQuery } from "@/store/slices/animeApi";
import {
  selectAnimeSearchValue,
  selectIsSearchResultsBehindInput,
  selectSearchResultsBehindInput,
  setSearchResultsBehindInput,
} from "@/store/slices/animeSearch";

import styles from "./style.module.css";

type SearchResultsProps = {
  searchInputRef: RefObject<HTMLInputElement | null>;
};

export function SearchResults({ searchInputRef }: SearchResultsProps) {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const resultsBehindInput = useAppSelector(selectSearchResultsBehindInput);
  const isResultsBehindInput = useAppSelector(selectIsSearchResultsBehindInput);
  const searchValue = useAppSelector(selectAnimeSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 450);

  const { currentData } = useGetAnimeSearchQuery(
    {
      q: debouncedSearchValue.trim(),
      limit: 20,
    },
    { skip: !debouncedSearchValue }
  );

  const animeData = currentData ? currentData.data : null;

  useEffect(() => {
    const container = ref.current;

    if (animeData && animeData.length && container && container.scrollTop > 0) {
      container.scrollTo(0, 0);
    }
  }, [animeData]);

  function handleScroll() {
    const searchInput = searchInputRef.current;

    if (!searchInput) return;

    const list = listRef.current;

    if (list) {
      const searchInputRect = searchInput.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();

      const intersectHorizontally =
        (listRect.left >= searchInputRect.left && listRect.left <= searchInputRect.right) ||
        (listRect.right <= searchInputRect.right && listRect.right >= searchInputRect.left) ||
        (listRect.left <= searchInputRect.left && listRect.right >= searchInputRect.right);

      if (intersectHorizontally) {
        const listItems = listItemsRef.current;
        const newResultsBehindInput: Record<number, true> = {};
        let count = 0;

        for (let i = 0; i < listItems.length; i++) {
          const listItem = listItems[i];
          if (!listItem) continue;

          const listItemRect = listItem.getBoundingClientRect();

          if (searchInputRect.bottom <= listItemRect.top) {
            break;
          }

          count++;
          newResultsBehindInput[i] = true;
        }

        if (count !== Object.keys(resultsBehindInput).length) {
          dispatch(setSearchResultsBehindInput(newResultsBehindInput));
        }
      }
    } else if (isResultsBehindInput) {
      dispatch(setSearchResultsBehindInput({}));
    }
  }

  return (
    <div
      className={clsx(styles.searchResults, searchValue && styles.visible)}
      ref={ref}
      onScroll={handleScroll}
    >
      {searchValue && animeData && animeData.length > 0 && (
        <ul ref={listRef}>
          {animeData.map((anime, i) => (
            <li
              className={resultsBehindInput[i] && styles.behindInput}
              key={anime.mal_id}
              ref={(ref) => {
                listItemsRef.current[i] = ref;
              }}
            >
              <AnimeCard {...anime} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
