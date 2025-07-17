import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "..";

type AnimeSearchState = {
  value: string;
  resultsBehindInput: Record<number, true>;
};

const initialState: AnimeSearchState = {
  value: "",
  resultsBehindInput: [],
};

const animeSearchSlice = createSlice({
  name: "animeSearch",
  initialState,
  reducers: {
    setAnimeSearchValue: (state, action: PayloadAction<AnimeSearchState["value"]>) => {
      state.value = action.payload;
    },
    setSearchResultsBehindInput: (
      state,
      action: PayloadAction<AnimeSearchState["resultsBehindInput"]>
    ) => {
      state.resultsBehindInput = action.payload;
    },
  },
  selectors: {
    selectAnimeSearchValue: (state) => state.value,
    selectSearchResultsBehindInput: (state) => state.resultsBehindInput,
  },
});

export const animeSearchReducer = animeSearchSlice.reducer;
export const { setAnimeSearchValue, setSearchResultsBehindInput } = animeSearchSlice.actions;
export const { selectAnimeSearchValue, selectSearchResultsBehindInput } =
  animeSearchSlice.selectors;

export const selectIsSearchResultsBehindInput = (state: AppState) => {
  return !!state.animeSearch.resultsBehindInput[0];
};
