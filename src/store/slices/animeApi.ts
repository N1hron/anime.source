import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { constructQueryString } from "@/utils/constructQueryString";
import { removeAnimeDuplicates } from "@/utils/removeAnimeDuplicates";
import type { AnimeSearchParams, AnimeSearchResult } from "@/types/api/params";

export const animeApiSlice = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
  endpoints: (builder) => ({
    getAnimeSearch: builder.query<AnimeSearchResult, AnimeSearchParams>({
      query: (params) => "/anime" + constructQueryString(params),
      transformResponse: (result: AnimeSearchResult) => ({
        ...result,
        data: removeAnimeDuplicates(result.data).filter((anime) => anime.rating !== "Rx - Hentai"),
      }),
    }),
  }),
});

export const { useGetAnimeSearchQuery } = animeApiSlice;
