import clsx from "clsx";
import type { ChangeEvent, RefObject } from "react";

import { TextInput } from "../text-input/TextInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAnimeSearchValue,
  selectIsSearchResultsBehindInput,
  setAnimeSearchValue,
  setSearchResultsBehindInput,
} from "@/store/slices/animeSearch";

import styles from "./style.module.css";

type SearchInputProps = {
  ref: RefObject<HTMLInputElement | null>;
};

export function SearchInput({ ref }: SearchInputProps) {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector(selectAnimeSearchValue);
  const isEnlarged = useAppSelector(selectIsSearchResultsBehindInput);
  const cl = clsx(styles.searchInput, isEnlarged && styles.enlarged);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    dispatch(setAnimeSearchValue(value));
    if (!value && isEnlarged) {
      dispatch(setSearchResultsBehindInput({}));
    }
  }

  return (
    <div className={cl}>
      <TextInput
        id="search-input"
        placeholder="enter anime title"
        aria-label="Search anime by title"
        title="Search anime by title"
        value={searchValue}
        ref={ref}
        onChange={onChange}
      />
    </div>
  );
}
