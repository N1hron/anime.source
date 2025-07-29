import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AnimeSearchState = {
  value: string;
  itemsUnderInputCount: number;
  inputBottom: number;
};

const initialState: AnimeSearchState = {
  value: "",
  itemsUnderInputCount: 0,
  inputBottom: 0,
};

const animeSearchSlice = createSlice({
  name: "animeSearch",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<AnimeSearchState["value"]>) => {
      state.value = action.payload;
    },
    incrementItemsUnderInputCount: (state) => {
      state.itemsUnderInputCount++;
    },
    decrementItemsUnderInputCount: (state) => {
      state.itemsUnderInputCount--;
    },
    resetItemsUnderInputCount: (state) => {
      state.itemsUnderInputCount = 0;
    },
    setInputBottom: (state, action: PayloadAction<AnimeSearchState["inputBottom"]>) => {
      state.inputBottom = action.payload;
    },
  },
  selectors: {
    selectSearchValue: (state) => state.value,
    selectItemsUnderInputCount: (state) => state.itemsUnderInputCount,
    selectInputBottom: (state) => state.inputBottom,
  },
});

export const animeSearchReducer = animeSearchSlice.reducer;
export const {
  setSearchValue,
  incrementItemsUnderInputCount,
  decrementItemsUnderInputCount,
  resetItemsUnderInputCount,
  setInputBottom,
} = animeSearchSlice.actions;
export const { selectSearchValue, selectItemsUnderInputCount, selectInputBottom } =
  animeSearchSlice.selectors;

export const selectHasItemsUnderInput = createSelector(selectItemsUnderInputCount, (n) => n > 0);
export const selectIsLastItemUnderInput = (index: number) =>
  createSelector(selectItemsUnderInputCount, (n) => n === index + 1);
export const selectIsItemUnderInput = (index: number) =>
  createSelector(selectItemsUnderInputCount, (n) => n >= index + 1);
