import type { Anime } from "@/types/api/anime";

export function extractAnimeTitle(titles: Anime["titles"], type: Anime["titles"][number]["type"]) {
  const title = titles.find((title) => title.type === type);
  return title ? title.title : null;
}
