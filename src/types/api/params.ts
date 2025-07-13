import type { Anime } from "./anime";

export type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

export type AnimeSearchParams = Partial<{
  page: number;
  limit: number;
  q: string;
  type: AnimeTypeParam;
  min_score: number;
  max_score: number;
  status: AnimeStatusParam;
  rating: AnimeRatingParam;
  sfw: boolean;
  genres: string;
  genres_exclude: string;
  order_by: AnimeOrderByParam;
  sort: AnimeSortParam;
  letter: string;
  producers: string;
  start_date: string;
  end_date: string;
}>;

export type AnimeData<T> = {
  data: T;
};

export type AnimeDataWithPagination<T> = AnimeData<T[]> & {
  pagination: Pagination;
};

export type AnimeTypeParam =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | "cm"
  | "pv"
  | "tv_special";

export type AnimeStatusParam = "airing" | "complete" | "upcoming";

export type AnimeRatingParam = "g" | "pg" | "pg13" | "r17" | "r" | "rx";

export type AnimeOrderByParam =
  | "mal_id"
  | "title"
  | "start_date"
  | "end_date"
  | "episodes"
  | "score"
  | "scored_by"
  | "rank"
  | "popularity"
  | "members"
  | "favorites";

export type AnimeSortParam = "desc" | "asc";

export type AnimeSearchResult = AnimeDataWithPagination<Anime>;
