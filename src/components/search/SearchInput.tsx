import clsx from "clsx";
import { type ChangeEvent } from "react";

import { TextInput } from "../text-input/TextInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectEnlargeSearchInput, setEnlargeSearchInput } from "@/store/slices/ui";
import { useAnimeSearch } from "@/hooks/useAnimeSearch";

import styles from "./style.module.css";

export function SearchInput() {
  const dispatch = useAppDispatch();
  const enlarge = useAppSelector(selectEnlargeSearchInput);
  const cl = clsx(styles.searchInput, enlarge && styles.enlarged);
  const { search, setSearch } = useAnimeSearch();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearch(value);

    if (!value) {
      dispatch(setEnlargeSearchInput(false));
    }
  }

  return (
    <div className={cl}>
      <TextInput
        id="search-input"
        type="search"
        placeholder="enter anime title"
        aria-label="Search anime by title"
        title="Search anime by title"
        value={search}
        onChange={onChange}
      />
    </div>
  );
}
