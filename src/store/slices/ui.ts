import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Anime } from "@/types/api/anime";
import type { AppState } from "@/store";

type uiSliceState = {
  animeSearch: string;
  pins: Anime["mal_id"][];
  selectedAnime: Anime["mal_id"] | null;
  enlargeSearchInput: boolean;
};

const initialState: uiSliceState = {
  animeSearch: "",
  pins: [],
  selectedAnime: null,
  enlargeSearchInput: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAnimeSearch: (state, action: PayloadAction<string>) => {
      state.animeSearch = action.payload;
    },
    addToPins: (state, action: PayloadAction<Anime["mal_id"]>) => {
      state.pins.push(action.payload);
    },
    removeFromPins: (state, action: PayloadAction<Anime["mal_id"]>) => {
      state.pins = state.pins.filter((pin) => pin !== action.payload);
    },
    setSelectedAnime: (state, action: PayloadAction<Anime["mal_id"]>) => {
      state.selectedAnime = action.payload;
    },
    setEnlargeSearchInput: (state, action: PayloadAction<boolean>) => {
      state.enlargeSearchInput = action.payload;
    },
  },
  selectors: {
    selectAnimeSearch: (state) => state.animeSearch,
    selectPins: (state) => state.pins,
    selectEnlargeSearchInput: (state) => state.enlargeSearchInput,
  },
});

export const uiSliceReducer = uiSlice.reducer;
export const {
  setAnimeSearch,
  addToPins,
  removeFromPins,
  setSelectedAnime,
  setEnlargeSearchInput,
} = uiSlice.actions;
export const { selectAnimeSearch, selectPins, selectEnlargeSearchInput } = uiSlice.selectors;

export const selectIsPinned = (state: AppState, id: Anime["mal_id"]) => {
  return state.ui.pins.includes(id);
};

export const selectIsSelected = (state: AppState, id: Anime["mal_id"]) => {
  return state.ui.selectedAnime === id;
};
