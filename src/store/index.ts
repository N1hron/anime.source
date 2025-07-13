import { configureStore } from "@reduxjs/toolkit";

import { uiSliceReducer } from "./slices/ui";
import { animeApiSlice } from "./slices/animeApi";

export const store = configureStore({
  reducer: {
    ui: uiSliceReducer,
    [animeApiSlice.reducerPath]: animeApiSlice.reducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
