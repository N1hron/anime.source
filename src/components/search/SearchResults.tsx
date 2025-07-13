import { useEffect, useRef } from "react";

import { AnimeCard } from "../anime-card/AnimeCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectEnlargeSearchInput, setEnlargeSearchInput } from "@/store/slices/ui";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";

import styles from "./style.module.css";

export function SearchResults() {
  const dispatch = useAppDispatch();

  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSearchInputEnlarged = useAppSelector(selectEnlargeSearchInput);
  const { search, currentData } = useAnimeSearch();
  const animeList = currentData ? currentData.data : [];

  useEffect(() => {
    searchInputRef.current = document.querySelector("#search-input");
  }, []);

  function checkIfIntersectsWithInput() {
    const list = listRef.current;
    const searchInput = searchInputRef.current;

    if (list && searchInput) {
      const listRect = list.getBoundingClientRect();
      const searchRect = searchInput.getBoundingClientRect();

      const intersectVertically = searchRect.bottom >= listRect.top;
      const intersectHorizontally =
        (listRect.left >= searchRect.left && listRect.left <= searchRect.right) ||
        (listRect.right <= searchRect.right && listRect.right >= searchRect.left) ||
        (listRect.left <= searchRect.left && listRect.right >= searchRect.right);

      return intersectHorizontally && intersectVertically;
    }

    return false;
  }

  function handleScroll() {
    const intersectsWithInput = checkIfIntersectsWithInput();

    if (intersectsWithInput && !isSearchInputEnlarged) {
      dispatch(setEnlargeSearchInput(true));
    } else if (!intersectsWithInput && isSearchInputEnlarged) {
      dispatch(setEnlargeSearchInput(false));
    }
  }

  if (search !== "" && animeList.length) {
    return (
      <div className={styles.searchResults} onScroll={handleScroll}>
        <ul className={styles.animeList} ref={listRef}>
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} {...anime} />
          ))}
        </ul>
      </div>
    );
  }
}
