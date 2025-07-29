import clsx from "clsx";
import { useEffect, useRef, type ChangeEvent } from "react";

import { TextInput } from "../text-input/TextInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetItemsUnderInputCount,
  selectHasItemsUnderInput,
  selectInputBottom,
  selectSearchValue,
  setInputBottom,
  setSearchValue,
} from "@/store/slices/animeSearch";

import styles from "./style.module.css";

export function AnimeSearchInput() {
  const dispatch = useAppDispatch();
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputBottom = useAppSelector(selectInputBottom);
  const searchValue = useAppSelector(selectSearchValue);
  const isEnlarged = useAppSelector(selectHasItemsUnderInput);
  const cl = clsx(styles.input, isEnlarged && styles.enlarged);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchValue(event.target.value));

    if (isEnlarged) {
      dispatch(resetItemsUnderInputCount());
    }
  }

  useEffect(() => {
    handleInputBottomChange();
    window.addEventListener("resize", handleInputBottomChange);

    return () => {
      window.removeEventListener("resize", handleInputBottomChange);
    };
  }, [inputBottom]);

  function handleInputBottomChange() {
    const inputWrapper = inputWrapperRef.current;

    if (inputWrapper) {
      const inputWrapperBottom = inputWrapper.getBoundingClientRect().bottom;

      if (inputBottom !== inputWrapperBottom) {
        dispatch(setInputBottom(inputWrapperBottom));
      }
    }
  }

  return (
    <div className={cl} ref={inputWrapperRef}>
      <TextInput
        placeholder="enter anime title"
        aria-label="Search anime by title"
        title="Search anime by title"
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
}
