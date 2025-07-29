import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AnimeShort } from "@/types/api/anime";

type AnimePinsState = {
  items: AnimeShort[];
};

const initialState: AnimePinsState = {
  items: [],
};

const animePinsSlice = createSlice({
  name: "animePins",
  initialState,
  reducers: {
    addAnimeToPins: (state, action: PayloadAction<AnimeShort>) => {
      state.items.push(action.payload);
    },
    removeAnimeFromPins: (state, action: PayloadAction<AnimeShort["mal_id"]>) => {
      const newItems = state.items.filter((item) => item.mal_id !== action.payload);

      if (newItems.length !== state.items.length) {
        state.items = newItems;
      }
    },
  },
});

export const animePinsReducer = animePinsSlice.reducer;
