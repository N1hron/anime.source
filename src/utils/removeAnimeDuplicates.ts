import type { Anime } from "@/types/api/anime";

function removeAnimeDuplicates(animeList: Anime[]) {
  const idCache: Record<Anime["mal_id"], true> = {};
  const res = [];

  for (const anime of animeList) {
    if (idCache[anime.mal_id] !== true) {
      res.push(anime);
      idCache[anime.mal_id] = true;
    }
  }

  return res;
}

export { removeAnimeDuplicates };
