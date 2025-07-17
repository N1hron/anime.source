import { useRef } from "react";

import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

import styles from "./style.module.css";

export function AnimeSearch() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <search className={styles.animeSearch}>
      <SearchInput ref={searchInputRef} />
      <SearchResults searchInputRef={searchInputRef} />
    </search>
  );
}
