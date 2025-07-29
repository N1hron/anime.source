import { AnimeSearchResultsList } from "./AnimeSearchResultsList";
import { useAppSelector } from "@/store/hooks";
import { selectSearchValue } from "@/store/slices/animeSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAnimeSearchQuery } from "@/store/slices/animeApi";
import { AnimeSearchStatus } from "./AnimeSearchStatus";

import styles from "./style.module.css";

export function AnimeSearchResults() {
  const searchValue = useAppSelector(selectSearchValue);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const q = debouncedSearchValue.trim();

  const searchResults = useGetAnimeSearchQuery(
    {
      q,
      limit: 20,
    },
    {
      skip: !q,
    }
  );

  const data = searchResults.data?.data;
  const isError = searchResults.isError;
  const isLoading =
    searchResults.isLoading || searchResults.isFetching || debouncedSearchValue !== searchValue;
  const isNotFound = !data?.length && !isLoading && !isError;

  const showResults = searchValue !== "";
  const showStatus = isLoading || isError || isNotFound;
  const showResultsList = data && !showStatus;

  if (!showResults) return null;

  const getStatusType = () => {
    switch (true) {
      case isError:
        return "error";
      case isLoading:
        return "loading";
      default:
        return "not-found";
    }
  };

  const statusType = getStatusType();

  return (
    <div className={styles.results}>
      {showStatus && <AnimeSearchStatus key={statusType} type={statusType} />}
      {showResultsList && <AnimeSearchResultsList data={data} />}
    </div>
  );
}
