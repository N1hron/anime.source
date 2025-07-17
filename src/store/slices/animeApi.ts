import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { constructQueryString } from "@/utils/constructQueryString";
import { removeAnimeDuplicates } from "@/utils/removeAnimeDuplicates";
import type { AnimeData, AnimeDataWithPagination, AnimeSearchParams } from "@/types/api/queries";
import type { Anime, AnimeEpisode, AnimeFull } from "@/types/api/anime";

export const animeApiSlice = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
  endpoints: (builder) => ({
    getAnimeSearch: builder.query<AnimeDataWithPagination<Anime>, AnimeSearchParams>({
      query: (params) => "/anime" + constructQueryString(params),
      transformResponse: (result: AnimeDataWithPagination<Anime>) => ({
        ...result,
        data: removeAnimeDuplicates(result.data).filter((anime) => anime.rating !== "Rx - Hentai"),
      }),
    }),
    getAnimeFull: builder.query<AnimeData<AnimeFull>, Anime["mal_id"]>({
      query: (id) => `/anime/${id}/full`,
    }),
    getAnimeEpisodes: builder.query<AnimeDataWithPagination<AnimeEpisode>, Anime["mal_id"]>({
      query: (id) => `/anime/${id}/episodes`,
    }),
  }),
});

export const { useGetAnimeSearchQuery, useGetAnimeFullQuery } = animeApiSlice;
