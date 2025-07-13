export type Anime = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: AnimeTitle[];
  type: AnimeType | null;
  source: string | null;
  episodes: number | null;
  status: AnimeStatus | null;
  airing: boolean;
  aired: AnimeAired;
  duration: string | null;
  rating: AnimeRating | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: AnimeSeasonName | null;
  year: number | null;
  broadcast: AnimeBroadcast;
  producers: MalUrl[];
  licensors: MalUrl[];
  studios: MalUrl[];
  genres: MalUrl[];
  explicit_genres: MalUrl[];
  themes: MalUrl[];
  demographics: MalUrl[];
};

export type AnimeEpisode = {
  mal_id: number;
  url: string | null;
  title: string;
  title_japanese: string | null;
  title_romanji: string | null;
  aired: string | null;
  score: number | null;
  filler: boolean;
  recap: boolean;
  forum_url: string | null;
};

export type AnimeImage = {
  image_url: string | null;
  small_image_url: string | null;
  large_image_url: string | null;
};

export type AnimeImages = {
  webp: AnimeImage;
  jpeg: AnimeImage;
};

export type AnimeTrailer = {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
};

export type AnimeTitle = {
  type: "Default" | "Synonym" | "Japanese" | "English";
  title: string;
};

export type AnimeType = "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music";

export type AnimeStatus = "Finished Airing" | "Currently Airing" | "Not yet aired";

export type AnimeAired = {
  from: string | null;
  to: string | null;
  prop: {
    from: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
    string: string | null;
  };
};

export type AnimeRating =
  | "G - All Ages"
  | "PG - Children"
  | "PG-13 - Teens 13 or older"
  | "R - 17+ (violence & profanity)"
  | "R+ - Mild Nudity"
  | "Rx - Hentai";

export type AnimeSeasonName = "summer" | "winter" | "spring" | "fall";

export type AnimeBroadcast = {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
};

export type MalUrl = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};
