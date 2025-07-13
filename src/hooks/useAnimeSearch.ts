import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetAnimeSearchQuery } from "@/store/slices/animeApi";
import { selectAnimeSearch, setAnimeSearch } from "@/store/slices/ui";
import { useDebounce } from "./useDebounce";

export function useAnimeSearch() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectAnimeSearch);
  const debouncedSearch = useDebounce(search, 450);

  const setSearch = useCallback(
    (value: string) => {
      dispatch(setAnimeSearch(value));
    },
    [dispatch]
  );

  const results = useGetAnimeSearchQuery(
    {
      q: debouncedSearch.trim(),
      limit: 20,
    },
    { skip: !debouncedSearch }
  );

  return {
    ...results,
    search,
    setSearch,
  };
}
