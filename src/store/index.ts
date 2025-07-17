import { configureStore } from "@reduxjs/toolkit";

import { animeSearchReducer } from "./slices/animeSearch";
import { animeApiSlice } from "./slices/animeApi";

export const store = configureStore({
  reducer: {
    animeSearch: animeSearchReducer,
    [animeApiSlice.reducerPath]: animeApiSlice.reducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
