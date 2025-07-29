import { configureStore } from "@reduxjs/toolkit";

import { animeApiSlice } from "./slices/animeApi";
import { animeSearchReducer } from "./slices/animeSearch";
import { animePinsReducer } from "./slices/animePins";

export const store = configureStore({
  reducer: {
    [animeApiSlice.reducerPath]: animeApiSlice.reducer,
    animeSearch: animeSearchReducer,
    animePins: animePinsReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(animeApiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
